const fs = require('fs');
const path = require('path');

module.exports = {
  client: 'pg',
  connection: {
    user: 'avnadmin',
    password: 'AVNS_3PP0VNVPmzOtr6Aq9Wg',
    host: 'repo-api-repo-api.c.aivencloud.com',
    port: 10231,
    database: 'defaultdb',
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, 'ca.pem')).toString(),
    },
  },
  pool: {
    min: 2,
    max: 10,
  },
  // migrations: {
  //   tableName: 'knex_migrations',
  //   directory: `${__dirname}/db/migrations`,
  // },
  // seeds: {
  //   directory: `${__dirname}/db/seeds`,
  // },
};
