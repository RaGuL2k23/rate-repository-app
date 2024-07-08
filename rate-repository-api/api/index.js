import http from 'http';
import cors from 'cors';
import logger from './utils/logger';
import { API_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';
import AuthService from './utils/authService';
import createDataLoaders from './utils/createDataLoaders';

const startServer = async () => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();

  await apolloServer.start();

  app.use(
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
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${API_PORT}`);
};

startServer();
