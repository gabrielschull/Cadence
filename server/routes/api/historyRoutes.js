import express from 'express';
import { supabase } from '../../supabase.js';

const router = express.Router();

router.get('/history', async (req, res) => {
  const userId = req.query.userId;
  console.log('userId', userId);
  try {
    const { data: documents, error } = await supabase
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
      .select('checksum, document_name, title')
      .eq('created_by', userId)
      .order('created_time', { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;