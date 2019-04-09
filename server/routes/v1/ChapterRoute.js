const express = require('express');
const ChapterRoute = express.Router();
import chapterController from '../../controller/v1/chapter/chapter';

// Defined get data(index or listing) route
ChapterRoute.get('/', chapterController.list);

// Defined store route
ChapterRoute.post('/create', chapterController.create);

//update chapter
ChapterRoute.put('/:id', chapterController.update);

//get detail chapter
ChapterRoute.get('/:id', chapterController.retrieve);

// Defined delete | remove | destroy route
ChapterRoute.delete('/delete/:id', chapterController.delete);

module.exports = ChapterRoute;