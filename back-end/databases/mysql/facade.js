const dbConfig = require('../../configs/database.cfg');
const Base = require('./mysql-base');
const db = new Base(dbConfig.mysql);

module.exports = db;
