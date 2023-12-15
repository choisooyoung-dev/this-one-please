import redis from 'redis';

const redisClient = redis.createClient(process.env.REDIS_PORT);

redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export default redisClient;
