const express = require('express');
const app = express();
const Route = express.Router();
const MangaRoute = require('./MangaRoute');
const UserRoute = require('./UserRoute');

Route.use('/manga', MangaRoute);
Route.use('/user', UserRoute);

module.exports = Route;