
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('chapters', function (t) {
  		t.increments('id').primary()
        t.integer('mangas_id').notNullable()
        t.float('chap', 8, 2).notNullable()
        t.string('name').nullable()
        t.string('slug').notNullable()
        t.string('status').nullable()
        t.text('content').notNullable()
        t.integer('views').nullable().defaultTo(0)
        t.timestamps()
        t.timestamp('deleted_at').nullable()
  	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTableIfExists('chapters')
};
