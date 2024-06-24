import http from 'http'; 
import logger from './src/utils/logger';
import { API_PORT, APOLLO_PORT } from './src/config';
import createApolloServer from './src/apolloServer';
import app from './src/app'; 

 

const startServer = async () => {
  const httpServer = http.createServer(app);

   const apolloServer = createApolloServer(httpServer);

  await apolloServer.listen({ port: APOLLO_PORT });

  httpServer.on('request', app.callback());

  await new Promise((resolve) =>
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer();
