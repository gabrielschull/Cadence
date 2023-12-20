import express from 'express';
import { search } from '../../services/search/searchService.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    const { data, error } = await search(query);

    if (error) {
      console.error(error);
      res.status(500).json({ error });
    } else {
      res.json({ result: data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
