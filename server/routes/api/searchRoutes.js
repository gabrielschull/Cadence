
const express = require('express');
const { search } = require('../../services/search/searchService');

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

module.exports = router;