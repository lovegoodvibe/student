module.exports = {
    enableQueryLogger: true,
    mysql: {
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        host: 'localhost',
        user: 'root',
        password: '123456789',
        database: 'db_school',
    }
};
