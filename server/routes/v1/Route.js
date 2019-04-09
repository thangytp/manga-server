const express = require('express');
const Route = express.Router();
const MangaRoute = require('./MangaRoute');
const UserRoute = require('./UserRoute');
import ChapterRoute from './ChapterRoute';

Route.use('/manga', MangaRoute);
Route.use('/user', UserRoute);
Route.use('/chapter', ChapterRoute);

module.exports = Route;