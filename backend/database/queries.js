const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '167.71.13.201',
  database: 'postgres',
  password: 'docker',
  port: '5432'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

function query(...args) {
  const queryStr = args[0],
    values = args[1];

  return new Promise((resolve, reject) => {
    pool.connect()
      .then(client => {
        return client.query(queryStr, values)
          .then(res => {
            client.release()
            resolve(res.rows)
          })
          .catch(err => {
            client.release()
            reject(err)
          })
      })
  })
}

module.exports = {
  query: query,
  pool: pool
}