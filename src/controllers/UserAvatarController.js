const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage');

class UserAvatarController {
  async update(req, res) {
    const id = req.user.id;
    const file = req.file.filename;

    const user = await knex('users').where({ id }).first();

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }
    const diskStorage = new DiskStorage();
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    console.log(file);
    const fileName = await diskStorage.saveFile(file);
    user.avatar = fileName;

    await knex('users').update(user).where({ id });

    return res.json({ user });
  }
}

module.exports = UserAvatarController;
