// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
      host     : 'docker.local',
      user     : 'root',
      password : 'root',
      database : 'manga',
      charset  : 'utf8',
        // host     : 'localhost',
        // user     : 'root',
        // password : '',
        // database : 'manga',
        // charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
