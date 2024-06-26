import http from 'http';
import cors from 'cors'
import logger from './utils/logger';
import { API_PORT, APOLLO_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';


const startServer = async () => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();
  
  await apolloServer.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        
      },
    }),
  )
  // await apolloServer.listen({ port: APOLLO_PORT }); 

  await new Promise((resolve) =>
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer();
