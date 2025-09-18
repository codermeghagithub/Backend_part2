# Redis - Complete Overview

## What is Redis?

**Redis** (Remote Dictionary Server) is an **in-memory data structure store** that can be used as a:
- **Database**
- **Cache** 
- **Message broker**
- **Session store**

### Key Characteristics:
- **In-memory**: Data is stored in RAM (not disk) for ultra-fast access
- **NoSQL**: Non-relational database
- **Key-value store**: Data is stored as key-value pairs
- **Open source**: Free and community-driven
- **Single-threaded**: Uses one main thread for operations

## Why Use Redis?

### Primary Reasons:

1. **Speed**: Sub-millisecond response times
2. **Flexibility**: Multiple data types and use cases
3. **Scalability**: Can handle millions of operations per second
4. **Simplicity**: Easy to set up and use
5. **Reliability**: Battle-tested in production environments

## Major Advantages

### 1. **Exceptional Performance**
```javascript
// Typical response times:
// GET/SET operations: 0.1-0.2 milliseconds
// Complex operations: 1-5 milliseconds

const start = Date.now();
await redis.get("user:123");
const end = Date.now();
console.log(`Response time: ${end - start}ms`); // Usually < 1ms
```

### 2. **Rich Data Types**
- **Strings**: Simple key-value pairs
- **Lists**: Ordered collections
- **Sets**: Unique collections  
- **Sorted Sets**: Ordered unique collections with scores
- **Hashes**: Object-like structures
- **Bitmaps**: Binary data
- **HyperLogLog**: Probabilistic data structures
- **Streams**: Log-like data structures

### 3. **Multiple Use Cases**
```javascript
// Caching
await redis.setex("user:123:profile", 3600, JSON.stringify(userProfile));

// Session storage
await redis.hset("session:abc123", "userId", "123", "loginTime", Date.now());

// Real-time analytics
await redis.incr("page:views:today");

// Message queues
await redis.rpush("email:queue", JSON.stringify(emailData));

// Leaderboards
await redis.zadd("game:leaderboard", 1500, "player1");
```

### 4. **High Availability**
- Master-slave replication
- Automatic failover
- Cluster mode for horizontal scaling
- Sentinel for monitoring

### 5. **Developer-Friendly**
- Simple commands and syntax
- Excellent documentation
- Libraries for all major programming languages
- Active community support

## Major Disadvantages

### 1. **Memory Limitations**
```javascript
// Problem: Everything must fit in RAM
// Example: 1GB RAM = ~1GB data maximum
// Solution: Use Redis as cache, not primary database

// Good practice - expire keys to save memory
await redis.setex("temp:data", 300, largeDataSet); // Expires in 5 minutes
```

### 2. **Data Persistence Challenges**
- **RDB snapshots**: Point-in-time backups (risk of data loss)
- **AOF logging**: Append-only file (slower, larger files)
- **No ACID transactions**: Limited transaction support

### 3. **Single-Threaded Limitations**
```javascript
// Problem: One slow operation blocks everything
// Bad: This will block other operations
await redis.eval(`
    for i=1,1000000 do
        redis.call('incr', 'counter')
    end
    return redis.call('get', 'counter')
`, 0);

// Good: Break into smaller operations
for (let i = 0; i < 1000; i++) {
    await redis.incr('counter');
}
```

### 4. **Limited Query Capabilities**
- No complex joins like SQL databases
- No advanced search without additional modules
- Simple key-based access patterns only

### 5. **Cost Considerations**
- RAM is more expensive than disk storage
- Need more RAM for larger datasets
- Scaling can become costly

## Common Use Cases

### 1. **Caching Layer**
```javascript
// Check cache first, then database
async function getUserProfile(userId) {
    const cached = await redis.get(`user:${userId}:profile`);
    if (cached) {
        return JSON.parse(cached);
    }
    
    const profile = await database.getUser(userId);
    await redis.setex(`user:${userId}:profile`, 3600, JSON.stringify(profile));
    return profile;
}
```

### 2. **Session Management**
```javascript
// Store user sessions
await redis.hset(`session:${sessionId}`, {
    userId: user.id,
    email: user.email,
    loginTime: Date.now(),
    isActive: true
});

await redis.expire(`session:${sessionId}`, 24 * 3600); // 24 hours
```

### 3. **Real-time Analytics**
```javascript
// Track metrics in real-time
await redis.incr('api:calls:today');
await redis.incr(`user:${userId}:page:views`);
await redis.zadd('top:users:today', 1, userId);
```

### 4. **Message Queues**
```javascript
// Producer
await redis.rpush('job:queue', JSON.stringify({
    type: 'send_email',
    userId: 123,
    data: emailData
}));

// Consumer
const job = await redis.blpop('job:queue', 10); // Wait up to 10 seconds
if (job) {
    const jobData = JSON.parse(job[1]);
    await processJob(jobData);
}
```

### 5. **Leaderboards/Rankings**
```javascript
// Gaming leaderboard
await redis.zadd('game:scores', 1500, 'player1');
await redis.zadd('game:scores', 1200, 'player2');

// Get top 10 players
const top10 = await redis.zrevrange('game:scores', 0, 9, 'WITHSCORES');
```

## When NOT to Use Redis

❌ **Don't use Redis as primary database for:**
- Complex relational data
- Large datasets that don't fit in memory
- Applications requiring complex queries
- Data that must never be lost
- Budget-constrained projects (RAM costs)

✅ **Use Redis for:**
- Caching frequently accessed data
- Session storage
- Real-time analytics
- Message queues
- Temporary data storage
- High-performance applications

## Redis vs Other Technologies

| Feature | Redis | MySQL | MongoDB | Memcached |
|---------|-------|--------|---------|-----------|
| Speed | Extremely Fast | Fast | Moderate | Extremely Fast |
| Persistence | Optional | Yes | Yes | No |
| Data Types | Rich | Limited | Rich | Simple |
| Memory Usage | High | Low | Moderate | High |
| Scalability | Horizontal | Vertical | Horizontal | Horizontal |
| Complexity | Low | High | Moderate | Very Low |

## Installation and Basic Setup

### Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# macOS
brew install redis

# Windows (using WSL or Docker)
docker run -d -p 6379:6379 redis:latest
```

### Basic Configuration
```bash
# Start Redis server
redis-server

# Connect with Redis CLI
redis-cli

# Basic commands
127.0.0.1:6379> SET mykey "Hello Redis"
OK
127.0.0.1:6379> GET mykey
"Hello Redis"
```

## Best Practices

### 1. **Memory Management**
```javascript
// Set expiration on keys to prevent memory bloat
await redis.setex("temp:data", 3600, data); // Expires in 1 hour

// Monitor memory usage
const info = await redis.info('memory');
console.log('Memory used:', info);
```

### 2. **Key Naming Conventions**
```javascript
// Use consistent, hierarchical naming
await redis.set("user:123:profile", userData);
await redis.set("user:123:settings", settingsData);
await redis.set("product:456:details", productData);
```

### 3. **Connection Pooling**
```javascript
// Use connection pooling in production
const redis = new Redis({
    host: 'localhost',
    port: 6379,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3
});
```

## Conclusion

Redis is an excellent choice for applications that need:
- **Ultra-fast data access**
- **Simple data structures**
- **Real-time features**
- **Scalable caching**

However, it's not suitable as a primary database for complex, mission-critical data. The best approach is often using Redis alongside traditional databases - Redis for speed and caching, traditional databases for complex data and persistence.

The key is understanding your use case and choosing the right tool for the job!