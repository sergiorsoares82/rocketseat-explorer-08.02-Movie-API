module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || 'quesegredohein',
    expiresIn: '1d',
  },
};
