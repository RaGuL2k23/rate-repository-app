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

 // openIssuesCount
        // url
        // user
        // userHasReviewed
        // watchersCount