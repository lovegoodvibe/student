const conn = require('../redis-connector');
const client = new conn();

function get(keys) {
   return new Promise((resolve, reject) => {
       client.get(keys, function (error, resp) {
           if(error) reject(error);
           else resolve(resp);
       })
   });
}

async function set(name, value) {
    return new Promise((resolve, reject) => {
        client.set(name, value, function (error, resp) {
            if(error) reject(error);
            else resolve(resp);
        })
    });
}

module.exports = {
    get,
    set,
};
