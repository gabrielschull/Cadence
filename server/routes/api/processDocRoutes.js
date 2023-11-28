const express = require('express');
const router = express.Router();
const { supabase } = require('../../supabaseClient');
const { fetchDocument, saveDocument } = require('../../services/process-document/processDocService');
const { generateEmbeddings } = require('../../services/process-document/embeddingGenerator');
const { generateDocumentTitle } = require('../../services/process-document/titleGenerator');

router.post('/process-document', async (req, res) => {
    try {
      const { checksum, fileName, content } = req.body;
  
      const { data, error: fetchError } = await fetchDocument({ checksum });
      if (fetchError) {
        console.error(fetchError);
        return res.status(500).json({ error: fetchError });
      }
  
      if (data) {
        return res.status(200).json(data);
      }
  
      const channel = supabase().channel(`upload:${checksum}`);
      channel.subscribe((status) => {
        console.log({ status });
        if (['TIMED_OUT', 'CLOSED', 'CHANNEL_ERROR'].includes(status)) {
          sendError(channel, status);
        }
      });
      sendProgress(channel, 'Processing document...');
  
      // Process the document in the background
      processDocumentInBackground({ channel, content, fileName, checksum })
        .then(() => {
          console.log('Document processing completed');
        })
        .catch(error => {
          console.error('Document processing failed', error);
          sendError(channel, error);
        });
  
      res.status(201).json({});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  const processDocumentInBackground = async ({
    channel,
    content,
    fileName,
    checksum
  }) => {
    sendProgress(channel, 'Saving document details...');
    const chunks = await generateEmbeddings(content);
  
    messageForLongDocs(chunks, channel);
    const { data, error } = await saveDocument({
      fileName,
      checksum,
      chunks
    });
  
    if (error) {
      sendError(channel, error);
      return;
    }
  
    sendProgress(channel, 'Generating document title...');
    const { title } = await generateDocumentTitle(checksum, fileName);
    channel.send({
      type: 'broadcast',
      event: 'upload:complete',
      payload: {
        ...data,
        title
      }
    });
  };
  
  const sendProgress = (channel, message) => {
    channel.send({
      type: 'broadcast',
      event: 'upload:progress',
      payload: {
        message
      }
    });
  };
  
  const sendError = (channel, error) => {
    channel.send({
      type: 'broadcast',
      event: 'upload:error',
      payload: {
        error
      }
    });
  };
  
  const messageForLongDocs = (chunks, channel) => {
    if (chunks.content.length > 10) {
      sendProgress(
        channel,
        "Uploading a big document, aren't we?\nThis might take a while..."
      );
    }
  };
  
  module.exports = router;