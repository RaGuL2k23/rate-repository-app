import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
import bodyParser from 'body-parser';
import through from 'through2';

import { ApplicationError } from './errors';
import createDataLoaders from './utils/createDataLoaders';
import logger from './utils/logger';
import api from './api';

const logStream = through((chunk) => {
  logger.info(chunk.toString());
});

const errorHandler = (err, req, res, next) => {
  const normalizedError =
    err instanceof ApplicationError
      ? err
      : new ApplicationError('Something went wrong');

  res.status(normalizedError.status || 500).json(normalizedError);

  logger.error(err, { path: req.path });
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// app.use(morgan('combined', { stream: logStream }));

app.use((req, res, next) => {
  req.dataLoaders = createDataLoaders();
  next();
});

app.use(cors());

app.use('/api', api);

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

export default app;
