
exports.up = function(knex, Promise) {
  	return knex.schema.createTable('images', function (t) {
  		t.increments('id').primary();
        t.integer('chapter_id').notNullable();
        t.string('link').notNullable();
        t.timestamps();
        t.timestamp('deleted_at').nullable();
  	})
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTableIfExists('images')
};
