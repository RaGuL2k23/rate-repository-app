import { gql } from "@apollo/client";

export const GET_USER_ACCESS_TOKEN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;
export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
         
      repositoryId
     
    }
  }
`;
//user: { username: "rockyd", password: "password" }
export const CREATE_USER = gql`
  mutation($user: CreateUserInput){
  createUser(user: $user) {
    id
    username
    
  }
}
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`