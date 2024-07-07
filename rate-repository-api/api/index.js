import http from 'http';
import cors from 'cors'
import logger from '../src/utils/logger';
import { API_PORT, APOLLO_PORT } from '../src/config';
import createApolloServer from '../src/apolloServer';
import app from '../src/app';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';
import AuthService from '../src/utils/authService';
import createDataLoaders from '../src/utils/createDataLoaders';


const startServer = async () => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();
  
  await apolloServer.start()

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
  )
  // await apolloServer.listen({ port: APOLLO_PORT }); 

  await new Promise((resolve) =>
    httpServer.listen({ port: 4005 }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${4005}`);
};

startServer();
