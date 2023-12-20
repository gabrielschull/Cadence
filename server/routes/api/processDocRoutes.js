import express from 'express';
import { supabase } from '../../supabase.js';
import { fetchDocument, saveDocument } from '../../services/process-document/processDocService.js';
import { generateEmbeddings } from '../../services/process-document/embeddingGenerator.js';
import { generateDocumentTitle } from '../../services/process-document/titleGenerator.js';

const router = express.Router();

router.post('/process-document', async (req, res) => {
  try {
    const { checksum, fileName, content, userId, fileExtension } = req.body;
  
    const { data, error: fetchError } = await fetchDocument({ checksum });
    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: fetchError });
    }
  
    if (data) {
      return res.status(200).json(data);
    }
  
    const channel = supabase.channel(`upload:${checksum}`);
    channel.subscribe((status) => {
      console.log({ status });
      if (['TIMED_OUT', 'CLOSED', 'CHANNEL_ERROR'].includes(status)) {
        sendError(channel, status);
      }
    });
    sendProgress(channel, 'Processing document...');
  
    processDocumentInBackground({ channel, content, fileName, checksum, userId, fileExtension })
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
  checksum,
  userId,
  fileExtension,
}) => {
  sendProgress(channel, 'Saving document details...');
  const chunks = await generateEmbeddings(content);
  
  messageForLongDocs(chunks, channel);
  const { data, error } = await saveDocument({
    fileName,
    checksum,
    chunks,
    userId,
    fileExtension,
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
      'Uploading a big document, aren\'t we?\nThis might take a while...'
    );
  }
};
  
export default router;