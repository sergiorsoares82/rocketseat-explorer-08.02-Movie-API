require('express-async-errors');
const express = require('express');
const cors = require('cors');
const sqliteConnection = require('./database/sqlite');
const uploadConfig = require('./configs/uploads');

const PORT = process.env.PORT || 5000;

// ROTAS
const routes = require('./routes');
const AppError = require('./utils/AppError');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

sqliteConnection();

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
  console.error(error);
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
