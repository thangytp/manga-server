
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
  		t.increments('id').primary();
        t.string('name').notNullable();
        t.string('email', 100).unique();
        t.string('salt').notNullable();
        t.string('encrypted_password').notNullable();
        t.timestamps();
        t.timestamp('deleted_at').nullable();
  	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTableIfExists('users')
};
