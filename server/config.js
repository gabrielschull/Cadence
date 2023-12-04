import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvedPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: resolvedPath });