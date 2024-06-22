import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutation";

export const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    
  });

  const Review = async ({ repoOwner, repoName, rating, review }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        review: {
            ownerName: repoOwner,
            repositoryName: repoName,
            rating: Number(rating),
            text: review,
        },
      },
    });
    console.log(data, "hook", result.error);

    return data;
  };
  return [Review, result];
};
