import express from 'express';
import { createConnection } from 'typeorm';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

createConnection()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const STATIC_PATH = path.join(__dirname, "../build");
app.use(express.static(STATIC_PATH));

routes(app);

const dirPath = path.resolve(`${__dirname}/..`);
app.get('*', (req, res) => {
  if (req.url.indexOf('avatars') >= 0) {
    const fileName = path.join(dirPath, req.url);
    res.sendFile(fileName);
  } else {
    res.send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}!`);
});
