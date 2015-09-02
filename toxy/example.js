var toxy = require('toxy')
var poisons = toxy.poisons
var rules = toxy.rules

// Create a new toxy proxy
var proxy = toxy()

// Default server to forward incoming traffic
proxy
  .forward('http://httpbin.org')

// Register global poisons and rules
proxy
  .poison(poisons.latency({ jitter: 500 }))
  .rule(rules.probability(25))

// Register multiple routes
proxy
  .get('/download/*')
  .forward('http://files.myserver.net')
  .poison(poisons.bandwidth({ bps: 1024 }))
  .withRule(rules.headers({'Authorization': /^Bearer (.*)$/i }))

proxy
  .get('/image/*')
  .poison(poisons.bandwidth({ bps: 512 }))

proxy
  .all('/api/*')
  .poison(poisons.rateLimit({ limit: 10, threshold: 1000 }))
  .withRule(rules.method(['POST', 'PUT', 'DELETE']))
  // And use a different more permissive poison for GET requests
  .poison(poisons.rateLimit({ limit: 50, threshold: 1000 }))
  .withRule(rules.method('GET'))

// Handle the rest of the traffic
proxy
  .all('/*')
  .poison(poisons.slowClose({ delay: 1000 }))
  .poison(poisons.slowRead({ bps: 128 }))
  .withRule(rules.probability(50))

proxy.listen(3000)
console.log('Server listening on port:', 3000)

// 重定向到了http://httpbin.org/image/jpeg
console.log('Test it:', 'http://localhost:3000/image/jpeg')