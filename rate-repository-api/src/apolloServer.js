import {  toApolloError, ApolloError } from 'apollo-server';
const { ApolloServer } = require('@apollo/server')

import { ValidationError } from 'yup';

import AuthService from './utils/authService';
import createDataLoaders from './utils/createDataLoaders';
import logger from './utils/logger';
import { resolvers, typeDefs } from './graphql/schema';

const apolloErrorFormatter = (error) => {
  logger.error(error);

  const { originalError } = error;
  const isGraphQLError = !(originalError instanceof Error);

  let normalizedError = new ApolloError(
    'Something went wrong',
    'INTERNAL_SERVER_ERROR',
  );

  if (originalError instanceof ValidationError) {
    normalizedError = toApolloError(error, 'BAD_USER_INPUT');
  } else if (error.originalError instanceof ApolloError || isGraphQLError) {
    normalizedError = error;
  }

  return normalizedError;
};

const createApolloServer = () => {
  return new ApolloServer({
    resolvers,
    typeDefs,
    connectToDevTools: true,
    formatError: apolloErrorFormatter,
    context: ({ req }) => {
      const authorization = req.headers.authorization;
      const accessToken = authorization ? authorization.split(' ')[1] : undefined;
      const dataLoaders = createDataLoaders();

      return {
        authService: new AuthService({
          accessToken,
          dataLoaders,
          'Apollo-Require-Preflight': 'true'
        }),
        dataLoaders,
      };
    },
    // Add the header configuration here
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: ['Apollo-Require-Preflight', 'Content-Type', 'Authorization'],
    },
  });
};

export default createApolloServer;