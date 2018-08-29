var bookshelf = require('../bookshelf');
bookshelf.plugin('pagination');

var User = bookshelf.Model.extend({
	hasTimestamps: true,
	tableName: 'users'
});

module.exports = User;