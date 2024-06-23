import { useQuery } from "@apollo/client";
import { GET_SNGLE_REPO } from "../graphql/queries";

const useRepoReviews = (repositoryId) => {

  const variables = {
    repositoryId
  }

  const { data, loading,fetchMore } = useQuery(GET_SNGLE_REPO, {
     variables
  });
  console.log(data?.repository?.reviews,'dad');
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    console.log('fetchmore',canFetchMore);
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  

   

  

  return {fetchMore:handleFetchMore, repository:data?.repository, loading  };
};

export default useRepoReviews;
