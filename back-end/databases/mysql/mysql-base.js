const mysql = require('mysql');

module.exports = function (config) {
	const self = this;

	//console.log('config mysql ', config);

	self.pool = mysql.createPool(config);

	// self.pool.on('connection', function(connection) {
	//     connection.on('enqueue', function(sequence) {
	//         if ('Query' === sequence.constructor.name) {
	//             console.log('\x1b[36m%s\x1b[0m', sequence.sql );
	//         }
	//     });
	// });

	/**
	 * Transaction
	 * */

	this.getConnection = function getConnection() {
		return new Promise(function (resolve, reject) {
			self.pool.getConnection(function (err, connection) {
				if (err) {
					reject(err);
				} else {
					resolve(connection);
				}
			});
		});
	};

	this.beginTransaction = function beginTransaction(con) {
		return new Promise(function (resolve, reject) {
			con.beginTransaction(function (err) {
				if (err) reject(err);
				else resolve();
			});
		});
	};

	this.commitTransaction = function commitTransaction(con) {
		return new Promise(function (resolve, reject) {
			con.commit(function (err) {
				if (err) reject(err);
				else resolve();
			});
		});
	};

	this.rollbackTransaction = function rollbackTransaction(con) {
		return new Promise(function (resolve, reject) {
			con.rollback(function (err) {
				if (err) reject(err);
				else resolve();
			});
		});
	};

	this.conQuery = function (con, sql, params) {
		// console.log('sql: ', sql);
		// console.log('params: ', JSON.stringify(params));
		return new Promise(function (resolve, reject) {
			con.query(sql, params, function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		});
	};

	this.release = function release(con) {
		con.release();
	};

	/**
	 * End Transaction
	 * */

	/**
	 * Default
	 * */
	this.query = function query(sql, params) {
		return new Promise(function (resolve, reject) {
			self.pool.query(sql, params, function (err, data) {
				if (err) reject(err);
				else resolve(data);
			});
		});
	};

	/**
	 * End Default
	 * */
};
