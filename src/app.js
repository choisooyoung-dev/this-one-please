import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import viewRouter from './routes/views.router.js';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log('서버가 열렸어요!');
});
