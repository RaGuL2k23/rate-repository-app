import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragment";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
          ownerName
          createdAt
          ratingAverage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_ME = gql`
  query {
    me {
      username
      id
    }
  }
`;
export const GET_SNGLE_REPO = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      ownerName
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
              createdAt
              reviewCount
             
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

// openIssuesCount
// url
// user
// userHasReviewed
// watchersCount
