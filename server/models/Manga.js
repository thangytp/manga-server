var bookshelf = require('../bookshelf');
var Chapter = require('./Chapter');

var Manga = bookshelf.Model.extend({
	hasTimestamps: true,
	tableName: 'mangas',
	chapters: function () {
		return this.hasMany(Chapter);
	}
});

module.exports = Manga;