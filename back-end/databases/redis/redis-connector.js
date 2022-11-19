const redis = require("redis");
const {redisAuth} = require('../../configs/database.cfg');
const elk = require("../elasticsearch/facade");

function connector() {
    const client = redis.createClient({
        host: redisAuth.host,
        port: redisAuth.port,
        // password: config.password,
    });

    client.on('connect', function() {
        console.log('Redis client connected');
    });

    client.on('error', async function (err) {
        await elk.insertError({
            function: 'connector',
            controller: 'redis-connector',
            error: err,
        });
        console.log('Something went wrong ' + err);
        client.end();
    });

    return client;
}

module.exports = connector;
