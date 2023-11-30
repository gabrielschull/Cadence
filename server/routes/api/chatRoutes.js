const express = require('express');
const router = express.Router();
const { deleteMessageById, deleteDoc } = require('../../services/chat/chatService');

// Delete chat record by id
router.delete('/chat/message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await deleteMessageById(id);

    if (error) {
      console.error({ error });
      return res.status(500).json({ error: 'Failed to delete message'});
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error({ error });
    res.status(500).send('Internal Server Error');
  }
});

// // Delete message by checksum
// router.delete('/message/:checksum', async (req, res) => {
//   try {
//     const { checksum } = req.params;
//     const { error } = await deleteDoc(checksum);

//     if (error) {
//       console.error({ error });
//       return res.status(500).json({ error });
//     }

//     res.json({ message: 'Doc deleted successfully' });
//   } catch (error) {
//     console.error({ error });
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;