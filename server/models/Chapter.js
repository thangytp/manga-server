var bookshelf = require('../bookshelf');
var Manga = require('./Manga');

var Chapter = bookshelf.Model.extend({
	hasTimestamps: true,
	tableName: 'chapters',
	mangas: function () {
		return this.belongsToMany(Manga);
	}
});