const express = require('express');
const SessionsControllers = require('../controllers/SessionsController');

const sessionsRoutes = express.Router();
const sessionsController = new SessionsControllers();

sessionsRoutes.post('/', sessionsController.create);

module.exports = sessionsRoutes;
