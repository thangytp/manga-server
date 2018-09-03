var bookshelf = require('../bookshelf');
bookshelf.plugin('pagination');

var User = bookshelf.Model.extend({
	hasTimestamps: true,
	tableName: 'users',
	soft: ['deleted_at']
});

module.exports = User;