const express = require('express');
const app = express();
const MangaRoute = express.Router();
const mangaController = require('../../controller/v1/manga/manga');

// Defined get data(index or listing) route
MangaRoute.get('/', mangaController.list);

// Defined store route
MangaRoute.post('/create', mangaController.create);

//update manga
MangaRoute.put('/:id', mangaController.update);

//get detail manga
MangaRoute.get('/:id', mangaController.retrieve);

// Defined delete | remove | destroy route
MangaRoute.delete('/delete/:id', mangaController.delete);

module.exports = MangaRoute;