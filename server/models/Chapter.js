var bookshelf = require('../bookshelf');
var Manga = require('./Manga');

var Chapter = bookshelf.Model.extend({
	hasTimestamps: true,
	tableName: 'chapters',
	soft: ['deleted_at'],
	mangas: function () {
		return this.belongsToMany(Manga);
	}
});