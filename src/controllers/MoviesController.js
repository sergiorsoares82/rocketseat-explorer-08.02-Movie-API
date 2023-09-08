const knex = require('../database/knex');

class MoviesController {
  async index(req, res) {
    const { title, tags } = req.query;
    const user_id = req.user.id;

    let movies;

    if (tags) {
      const filteredTags = tags.split(',').map((tag) => tag.trim());
      movies = await knex('movies')
        .select([
          'movies.id',
          'movies.title',
          'movies.description',
          'movies.rating',
        ])
        .where({ 'movies.user_id': user_id })
        .whereLike('movies.title', `%${title}%`)
        .whereIn('name', filteredTags)
        .innerJoin('tags', 'movies.id', 'tags.movie_id')
        .orderBy('movies.title');
    } else {
      movies = await knex('movies')
        .where('movies.user_id', user_id)
        .whereLike('movies.title', `%${title}%`)
        .orderBy('movies.title');
    }

    const userTags = await knex('tags').where({ user_id });
    console.log(userTags);
    const moviesWithTags = movies.map((movie) => {
      const movieTags = userTags.filter((tag) => tag.movie_id === movie.id);
      return {
        ...movie,
        movieTags,
      };
    });

    res.json(moviesWithTags);
  }

  async create(req, res) {
    const { title, description, rating, tags, user_id } = req.body;

    const [movie_id] = await knex('movies').insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsToInsert = tags.map((tag) => {
      return {
        movie_id,
        user_id,
        name: tag,
      };
    });

    await knex('tags').insert(tagsToInsert);

    res.status(201).json({ movie_id });
  }

  async show(req, res) {
    const { id } = req.params;

    const movie = await knex('movies').where({ id }).first();
    const tags = await knex('tags').where({ movie_id: id }).orderBy('name');

    return res.status(200).json({ ...movie, tags });
  }
  async delete(req, res) {
    const { id } = req.params;
    const deletedMovie = await knex('movies').where({ id }).delete();
    res.status(200).json(deletedMovie);
  }
}

module.exports = MoviesController;
