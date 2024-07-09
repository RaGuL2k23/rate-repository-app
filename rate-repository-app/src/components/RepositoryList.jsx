import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import OptionPicker from '../utils/optionPicker'
import Text from "./Text";

import { Searchbar } from 'react-native-paper';
import { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({onEndReach, repositories, changeOrderDirection, changeOrderBy,changeSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  useEffect(()=>{
    changeSearchQuery(debouncedQuery.toLocaleLowerCase());
  },[debouncedQuery])
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const ItemSeparator = () => <View style={styles.separator} />;
   return (
    <>
      <FlatList
      keyboardDismissMode={"none"}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={
          <>
            <OptionPicker changeOrderBy={changeOrderBy} changeOrderDirection={changeOrderDirection} />
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </>
        }
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};  


const RepositoryList = () => {
  const {fetchMore, repositories,loading ,changeOrderDirection, changeOrderBy,changeSearchQuery } = useRepositories();

  const onEndReach = () => {
    fetchMore();
  };
  if (loading) <Text fontSize={"heading"}>Loading...</Text>
  return <RepositoryListContainer onEndReach={onEndReach} changeSearchQuery={changeSearchQuery} repositories={repositories } changeOrderDirection={changeOrderDirection} changeOrderBy={changeOrderBy} />;
};

export default RepositoryList;
