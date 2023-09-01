const bcrypt = require('bcrypt');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const [emailAlreadyInUse] = await knex('users').where({ email });

    if (emailAlreadyInUse) {
      throw new AppError('Email já está sendo utilizado!');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const [user_id] = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    res.json(user_id);
  }

  async update(req, res) {
    const { name, email, password, oldPassword } = req.body;
    const { user_id } = req.params;

    const user = await knex('users').where({ id: user_id }).first();
    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    const emailAlreadyInUse = await knex('users').where({ email }).first();

    if (emailAlreadyInUse && emailAlreadyInUse.id != user.id) {
      throw new AppError('Email já está em uso!');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !oldPassword) {
      throw new AppError('Você precisa informar a senha atual!');
    }

    if (password && oldPassword) {
      const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!oldPasswordMatch) {
        throw new AppError('A senha atual está incorreta!');
      }

      user.password = await bcrypt.hash(password, 8);
    }

    const [updatedUser] = await knex('users')
      .where({ id: user_id })
      .update({ ...user }, ['id', 'name', 'email']);

    return res.status(200).json({ updatedUser });
  }
}

module.exports = UsersController;
