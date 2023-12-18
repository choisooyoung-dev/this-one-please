import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST, // 여기에 원하는 호스트를 설정하세요
//   port:  process.env.REDIS_PORT,
//   password: process.env.REDIS_PW,
//   username: default
// });

// redisClient.on('connect', () => console.log('Connected to Redis!'));
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect();

// export default redisClient;

// // redisClient.js
// // import env from './env.config.js';
// import redis from 'redis';

// Redis 클라이언트 인스턴스 생성
const redisClient = redis.createClient({
  url: `redis://default:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
});

// Redis 에러 핸들링을 위한 이벤트 리스너 설정
redisClient.on('error', (error) => console.error(`Redis Error: ${error}`));

// Redis 클라이언트 연결 수행
redisClient.connect().catch(console.error);

export default redisClient;