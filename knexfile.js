// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'users',
  user: 'user',
  password: 'password'
}

const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/rsdata.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: productionDbConnection,    
    migrations: {
      directory: './data/migrations',
    },
    seeds:      {
      directory: "./data/seeds",
    },
    useNullAsDefault: true
  }
};
