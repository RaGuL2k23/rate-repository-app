import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    reviewCount
    stargazersCount
    ownerAvatarUrl
    description
    forksCount
    language
    name
  }
`;
