const knex = require('../database/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfigs = require('../configs/auth');
const AppError = require('../utils/AppError');

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();
    if (!user) {
      throw new AppError('Email ou senha inválido.');
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new AppError('Email ou senha inválido.');
    }

    const token = jwt.sign({}, authConfigs.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfigs.jwt.expiresIn,
    });
    console.log(user, token);
    res.json({ user, token });
  }
}

module.exports = SessionController;
