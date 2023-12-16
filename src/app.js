import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import viewRouter from './routes/views.router.js';
import { ErrorHandler } from './middlewares/error.middleware.js';
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api', apiRouter);

// Error Handler
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
    console.log('서버가 열렸어요!');
});
