import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [searchQuery,setSearchQuery] = useState('');

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderDirection,
      orderBy,
      searchKeyword:searchQuery
    },
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

  const changeOrderDirection = (direction) => {
    setOrderDirection(direction);
    refetch({
      orderDirection: direction,
      orderBy,
    });
  };

  const changeOrderBy = (newOrderBy) => {
    setOrderBy(newOrderBy);
    refetch({
      orderDirection,
      orderBy: newOrderBy,
    });
  };

  const changeSearchQuery = (query) =>{
    setSearchQuery(query);
  }

  return { repositories, loading, refetch, changeOrderDirection, changeOrderBy, changeSearchQuery };
};

export default useRepositories;
