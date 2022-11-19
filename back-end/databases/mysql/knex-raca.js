const knex = require('knex');
const dbConfig = require('../../configs/database.cfg');

const knexClient = knex({
	client: 'mysql',
	connection: {
		host: dbConfig.mysql.host,
		user: dbConfig.mysql.user,
		password: dbConfig.mysql.password,
		database: dbConfig.mysql.database,
		// multipleStatements: !!dbConfig.mysql.multipleStatements,
	},
	pool: { min: 2, max: 200 },
});

knexClient.on('query', function (queryData) {
	if (dbConfig.enableQueryLogger)
		console.log(
			`knex-mysql: ${queryData.sql}${queryData.bindings && queryData.bindings.length ? `\nparams: ${JSON.stringify(queryData.bindings)}` : ``}`
		);
});

module.exports = knexClient;
