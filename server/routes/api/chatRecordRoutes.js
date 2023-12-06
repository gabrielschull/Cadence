import express from 'express';
import { supabase } from '../../supabase.js';
import { chatMemory } from '../../openai.js';

const router = express.Router();

router.post('/chat-records', async (req, res) => {
  try {
    chatMemory.clear();

    const { checksum } = req.body;

    const { data, error } = await supabase
      .from(process.env.REACT_APP_SUPABASE_CHAT_RECORDS_TABLE)
      .select('id, message, actor, created_at')
      .eq('checksum', checksum)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;