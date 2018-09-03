const dbConfig = require('../knexfile');
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('bookshelf-soft-delete'));
module.exports = bookshelf;