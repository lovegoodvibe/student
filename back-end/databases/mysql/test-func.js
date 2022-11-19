const knex = require('./knex-raca');

async function testDuplicateKey() {
    const test = await knex('test').insert([{
        id: 7,
        name: 3,
        index: 14,
        status: 4
    }, {
        id: 5,
        name: 3,
        index: 14,
        status: 4
    }])
        .onConflict('id')
        .merge(['name']);
}

async function main() {
    try {
        await testDuplicateKey();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();