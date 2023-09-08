const express = require('express');
const userRoutes = require('./users.routes');
const tagsRoutes = require('./tags.routes');
const moviesRoutes = require('./movies.routes');
const sessionsRoutes = require('./sessions.routes');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/sessions', sessionsRoutes);

module.exports = routes;
