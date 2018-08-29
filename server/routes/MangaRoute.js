const express = require('express');
const app = express();
const MangaRoute = express.Router();

// Require Post model in our routes module
let Manga = require('../models/Manga');

// Defined store route
MangaRoute.route('/add').post(function (req, res) {
  let manga = new Manga(req.body);
  manga.save()
    .then(manga => {
        res.status(200).json(manga);
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
MangaRoute.route('/').get(function (req, res) {
    Manga.find(function (err, mangas){
    if(err){
      console.log(err);
    }
    else {
      res.json(mangas);
    }
  });
});

// Defined delete | remove | destroy route
MangaRoute.route('/delete/:id').get(function (req, res) {
    Manga.findByIdAndRemove({_id: req.params.id}, function(err, manga){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = MangaRoute;