const redis = require("redis");

const redisClient = redis.createClient({
  password: "dreamleaguesoccerdls",
  socket: {
    host: "redis-18751.c265.us-east-1-2.ec2.cloud.redislabs.com",
    port: 18751,
  },
});
redisClient
  .connect(
    "redis://default:dreamleaguesoccerdls@redis-18751.c265.us-east-1-2.ec2.cloud.redislabs.com:18751"
  )
  .then(() => {
    console.log(`Redis connection established`);
  });
const CACHE_EXPIRATION = 1800;

exports.getOrCacheData = async (key, cb) => {
  const data = await redisClient.get(key);

  if (data != null) {
    console.log("cache hit");
    return JSON.parse(data);
  } else {
    console.log("cache miss");
    const newlyFetchedData = await cb();
    redisClient.SETEX(key, CACHE_EXPIRATION, JSON.stringify(newlyFetchedData));
    return newlyFetchedData;
  }
};
