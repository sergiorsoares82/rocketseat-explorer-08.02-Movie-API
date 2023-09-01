const express = require('express');
const TagsController = require('../controllers/TagsController');

const tagsController = new TagsController();
const tagsRoutes = express.Router();

tagsRoutes.get('/:user_id', tagsController.index);

module.exports = tagsRoutes;
