const express = require('express');
const multer = require('multer');
const UsersController = require('../controllers/UsersController');
const UsersAvatarController = require('../controllers/UserAvatarController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const uploadConfig = require('../configs/uploads');

const userRoutes = express.Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

userRoutes.post('/create', usersController.create);
userRoutes.put('/update', isAuthenticated, usersController.update);
userRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
);

module.exports = userRoutes;
