
exports.up = function(knex, Promise) {
	return knex.schema.createTable('authors', function (t) {
		t.increments('id').primary()
		t.string('name').notNullable()
		t.timestamps()
		t.timestamp('deleted_at').nullable()
	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTableIfExists('authors')
};
