// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
      // host     : 'docker.local',
      host     : 'localhost',
      user     : 'root',
      password : '',
      // password : 'root',
      database : 'manga',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
