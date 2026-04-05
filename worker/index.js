const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // For v3, TLS is enabled by passing an empty object or options to 'tls'
  tls: {
    rejectUnauthorized: false
  },
  retry_strategy: () => 1000
});

// REMOVE THIS LINE:
// redisClient.connect().catch(console.error); 
redisClient.on('error', (err) => {
  console.error('Redis Error:', err);
});

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

