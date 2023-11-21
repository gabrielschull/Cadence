const cors = require('cors');
const express = require('express');
require('dotenv').config();
const puppeteer = require('puppeteer');
const { supabase } = require('../src/supabaseClient'); // Adjust the path as per your project structure


const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

// Example endpoint for web scraping and storing data to Supabase
app.get('/scrape', async (req, res) => {
    try {
        // Use Puppeteer to scrape data
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com'); // Replace with the URL you want to scrape
        const scrapedData = await page.evaluate(() => {
            // Scrape data and return the necessary information
            // Example: return document.title;
        });
        await browser.close();

        // Store the scraped data in Supabase
        const { data, error } = await supabase
            .from('your_table') // Replace with your table name
            .insert([{ scraped_field: scrapedData }]); // Replace with your field names and data

        if (error) throw error;
        
        // Send response back
        res.json({ message: 'Scraping and data insertion successful', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
