import http from 'http';
import cors from 'cors'
import logger from '../src/utils/logger';
import { API_PORT, APOLLO_PORT } from '../src/config';
import createApolloServer from '../src/apolloServer';
import app from '../src/app';
import express from 'express';

import { expressMiddleware } from '@apollo/server/express4';


const startServer = async () => {
  const httpServer = http.createServer(app);
  const apolloServer = createApolloServer();
  
  await apolloServer.start()

  app.use(
    '/',
    cors({
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
      maxAge: 600,
      origin: [
        'http://example.com',
        'https://studio.apollographql.com'
      ],
    }),
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

  logger.info(`Apollo Server ready at http://localhost:${API_PORT}`);
};

startServer();
