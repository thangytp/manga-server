
exports.up = function(knex, Promise) {
	return knex.schema.createTable('mangas', function (t) {
		t.increments('id').primary()
		t.string('name').notNullable()
		t.string('slug').notNullable()
		t.string('other_name').nullable()
		t.string('status').notNullable()
		t.text('description').nullable()
		t.integer('views').nullable().defaultTo(0)
		t.string('cover').notNullable()
		t.integer('last_chapter_id').nullable()
		t.timestamps()
		t.timestamp('deleted_at').nullable()
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('mangas')
};
