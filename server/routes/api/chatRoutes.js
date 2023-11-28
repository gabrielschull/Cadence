const express = require('express');
const router = express.Router();
const { deleteChatById, deleteMessage } = require('../../services/chat/chatService');

// Delete chat record by id
router.delete('/chat/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await deleteChatById(id);

    if (error) {
      console.error({ error });
      return res.status(500).json({ error });
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error({ error });
    res.status(500).send('Internal Server Error');
  }
});

// Delete message by checksum
router.delete('/message/:checksum', async (req, res) => {
  try {
    const { checksum } = req.params;
    const { error } = await deleteMessage(checksum);

    if (error) {
      console.error({ error });
      return res.status(500).json({ error });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error({ error });
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;