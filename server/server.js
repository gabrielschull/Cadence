import './config.js';
import cors from 'cors';
import express from 'express';
import inferenceRoutes from './routes/api/inferenceRoutes.js';
import searchRoutes from './routes/api/searchRoutes.js';
import processDocRoutes from './routes/api/processDocRoutes.js';
import historyRoutes from './routes/api/historyRoutes.js';
import editTitleRoutes from './routes/api/editTitleRoutes.js';
import chatRecordRoutes from './routes/api/chatRecordRoutes.js';
import chatRoutes from './routes/api/chatRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', inferenceRoutes);
app.use('/api', searchRoutes);
app.use('/api', processDocRoutes);

app.use('/api', historyRoutes);
app.use('/api', editTitleRoutes);
app.use('/api', chatRecordRoutes);
app.use('/api', chatRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});