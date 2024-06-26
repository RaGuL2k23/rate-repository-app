module.exports = {
  client: 'pg',
  connection: {
    host: '35.227.164.209', // or 'dpg-cptb186ehbks73f260bg-a.oregon-postgres.render.com'
    port: 5432,
    user: 'rocky',
    password: 'Z139GFJLSbDzm9AUtzGtSWXIwrV2S0Ck',
    database: 'rate_repo',
    ssl: { rejectUnauthorized: false }, // If your PostgreSQL server requires SSL
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
