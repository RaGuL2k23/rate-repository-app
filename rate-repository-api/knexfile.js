const fs = require('fs');
const path = require('path');
require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    connectionString:
      'postgres://avnadmin:AVNS_3PP0VNVPmzOtr6Aq9Wg@repo-api-repo-api.c.aivencloud.com:10231/defaultdb?sslmode=require',
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, 'ca (1).pem')).toString(),
      rejectUnauthorized: true,
    },
  },
  pool: {
    min: 2,
    max: 10,
  },
  // Uncomment and update the following lines if you have migrations or seeds
  // migrations: {
  //   tableName: 'knex_migrations',
  //   directory: `${__dirname}/db/migrations`,
  // },
  // seeds: {
  //   directory: `${__dirname}/db/seeds`,
  // },
};
