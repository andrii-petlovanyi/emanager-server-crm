import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { usersRouter } from './routes/users.route.js';
import { postsRouter } from './routes/posts.route.js';
import { offersRouter } from './routes/offers.route.js';
import { archiveRouter } from './routes/archive.route.js';
import { errorsHandler } from './helpers/index.js';

dotenv.config();

const app = express();
const typeLogger = app.get('env') === 'development' ? 'dev' : 'short';
const PORT = process.env.PORT || 5005;
const { MONGO_URL } = process.env;

app.use(logger(typeLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/offers', offersRouter);
app.use('/api/archive', archiveRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Sorry, this resource not found' });
});

app.use(errorsHandler);

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    //???
    await new Promise(resolve => {
      resolve(mongoose.connect(MONGO_URL));
    });

    console.log('Database connection successful');

    app.listen(PORT, error => {
      if (error) console.error('\x1B[31mError at server launch: ', error);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log('\x1B[31mDatabase connection failed');
    process.exit(1);
  }
};

start();
