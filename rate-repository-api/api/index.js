import http from 'http';
<<<<<<< HEAD:rate-repository-api/api/index.js
import cors from 'cors'
import logger from '../src/utils/logger';
import { API_PORT, APOLLO_PORT } from '../src/config';
import createApolloServer from '../src/apolloServer';
import app from '../src/app';
=======
import cors from 'cors';
import logger from './utils/logger';
import { API_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';
>>>>>>> 5a5c2568373a53e95c961453f1767fa29433b56d:rate-repository-api/src/index.js
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';
import AuthService from '../src/utils/authService';
import createDataLoaders from '../src/utils/createDataLoaders';

const startServer = async () => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();

  await apolloServer.start();

  app.use(
    '*',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: ({ req }) => {
        const authorization = req.headers.authorization;
  
        const accessToken = authorization
          ? authorization.split(' ')[1]
          : undefined;
        const dataLoaders = createDataLoaders();
  
        return {
          authService: new AuthService({
            accessToken,
            dataLoaders,
          }),
          dataLoaders,
        };
      },
    }),
  )
  app.get(
    '/',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: ({ req }) => {
        const authorization = req.headers.authorization;

        const accessToken = authorization
          ? authorization.split(' ')[1]
          : undefined;
        const dataLoaders = createDataLoaders();

        return {
          authService: new AuthService({
            accessToken,
            dataLoaders,
          }),
          dataLoaders,
        };
      },
    }),
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: 4005 }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${4005}`);
};

startServer();
