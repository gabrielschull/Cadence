const express = require('express');
const router = express.Router();
const { processInference, saveChatToBuffer } = require('../../services/inference/inferenceService');
const { v4: uuid } = require('uuid');
const { saveChat } = require('../../services/inference/saveChat');

router.post('/inference', async (req, res) => {
  const { documentId, conversationId, message } = req.body;

  saveChatToBuffer(documentId, message, 'human');
  saveChat({
      id: conversationId,
      message,
      checksum: documentId,
      actor: 'human'
  }).catch((error) => {
      console.error({ error });
  });

  const stream = new TransformStream();
  const aiMessageId = uuid().toString();
  await processInference({ documentId, question: message, aiMessageId, stream });

  const response = new Response(await stream.readable);
  response.headers.set('Content-Type', 'text/event-stream');
  response.headers.set('ConversationId', aiMessageId);

  res.status(200).send(response);
});

module.exports = router;