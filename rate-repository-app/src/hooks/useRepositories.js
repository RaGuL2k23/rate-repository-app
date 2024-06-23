import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables:{    
        "orderDirection": "ASC",
        "orderBy":  "RATING_AVERAGE",//RATING_AVERAGE CREATED_AT
        "searchKeyword": "",    
    }
  });
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching repositories:", error);
    }
  }, [error]);

  return { repositories, loading, refetch };
};

export default useRepositories;
