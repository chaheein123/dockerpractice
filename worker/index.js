const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  // Use the 'rediss' protocol for TLS
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
  socket: {
    tls: true,
    rejectUnauthorized: false,
    // SRE Tip: Add a timeout so your app doesn't hang forever if the network blips
    connectTimeout: 10000 
  }
});

// Redis v4+ requires you to explicitly call .connect()
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  console.log("This is redis message!!!")
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
