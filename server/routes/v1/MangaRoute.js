const express = require('express');
const app = express();
const MangaRoute = express.Router();
const mangaController = require('../../controller/v1/manga/manga');

// Defined store route
MangaRoute.post('/create', mangaController.create);

// Defined get data(index or listing) route
MangaRoute.get('/', mangaController.list);

// Defined delete | remove | destroy route
MangaRoute.delete('/delete/:id', mangaController.delete);

module.exports = MangaRoute;