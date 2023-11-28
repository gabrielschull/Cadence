const cors = require('cors');
const express = require('express');
require('dotenv').config();
const supabaseRoutes = require('./routes/api/supabaseRoutes');
const inferenceRoutes = require('./routes/api/inferenceRoutes');
const searchRoutes = require('./routes/api/searchRoutes');
const processDocRoutes = require('./routes/api/processDocRoutes');
const historyRoutes = require('./routes/api/historyRoutes');
const editTitleRoutes = require('./routes/api/editTitleRoutes');
const chatRecordRoutes = require('./routes/api/chatRecordRoutes');

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use('/api', supabaseRoutes);
app.use('/api', inferenceRoutes);
app.use('/api', searchRoutes);
app.use('/api', processDocRoutes);
app.use('/api', historyRoutes);
app.use('/api', editTitleRoutes);
app.use('/api', chatRecordRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
