import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
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

app.use(router);

app.listen(process.env.PORT, () => {
    console.log('서버가 열렸어요!');
});
