import redis from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_PORT, // 여기에 원하는 호스트를 설정하세요
  port: process.env.REDIS_PORT,
});
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export default redisClient;
