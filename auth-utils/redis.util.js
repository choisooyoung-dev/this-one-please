import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST; // 변경된 부분


const redisClient = redis.createClient({
  host: redisHost, // 여기에 원하는 호스트를 설정하세요
  port: redisPort,
});
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export default redisClient;
