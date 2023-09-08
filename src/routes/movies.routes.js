const express = require('express');
const MoviesController = require('../controllers/MoviesController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const moviesController = new MoviesController();
const moviesRoutes = express.Router();

moviesRoutes.get('/', isAuthenticated, moviesController.index);
moviesRoutes.post('/', isAuthenticated, moviesController.create);
moviesRoutes.get('/:id', isAuthenticated, moviesController.show);
moviesRoutes.delete('/:id', isAuthenticated, moviesController.delete);

module.exports = moviesRoutes;
