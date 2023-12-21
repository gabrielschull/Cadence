import express from 'express';
import { supabase } from '../../supabase.js';

const router = express.Router();

router.patch('/edit-title', async (req, res) => {
  try {
    const { id, title } = req.body;
    console.log('id', id)
    console.log('title', title)

    const { error, count } = await supabase
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE) 
      .update({ title: title })
      .eq('checksum', id);
      console.log('count', count)

    if (error) {
      console.error(error);
      return res.status(500).json({ error });
    }

    res.json({
      message: 'Document title updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;