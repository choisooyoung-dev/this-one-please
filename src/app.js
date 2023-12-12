import express from 'express';
import dotenv from 'dotenv'
import apiRouter from './routes/index'
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', apiRouter);

app.listen(process.env[PORT], () => {
  console.log( '서버가 열렸어요!');
});