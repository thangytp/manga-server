const express = require('express');
const Route = express.Router();
const MangaRoute = require('./MangaRoute');
const UserRoute = require('./UserRoute');
import ChapterRoute from './ChapterRoute';
import * as conf from '../../config/config';

Route.use(function(req, res, next) {
    console.log(req.originalUrl);
    console.log(conf.config1.thang);
    next();
});

Route.use('/manga', MangaRoute);
Route.use('/user', UserRoute);
Route.use('/chapter', ChapterRoute);

module.exports = Route;