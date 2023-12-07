import express from 'express';
import { v4 as uuid } from 'uuid';
import { processInference, saveChatToBuffer } from '../../services/inference/inferenceService.js';
import { saveChat } from '../../services/inference/saveChat.js';

const router = express.Router();

router.post('/inference', async (req, res) => {
  const { documentId, conversationId, message } = req.body;
  console.log('inferenceRoutes req.body', req.body)

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

  console.log('processInference inputs in route', documentId, message, stream, aiMessageId)

  const response = new Response(await stream.readable);
  response.headers.set('Content-Type', 'text/event-stream');
  response.headers.set('ConversationId', aiMessageId);

  res.status(200).send(response);
});

export default router;