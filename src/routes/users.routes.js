const express = require('express');
const UsersController = require('../controllers/UsersController');

const userRoutes = express.Router();
const usersController = new UsersController();

userRoutes.post('/create', usersController.create);
userRoutes.put('/update/:user_id', usersController.update);

module.exports = userRoutes;
