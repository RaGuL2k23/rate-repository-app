import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import OptionPicker from '../utils/optionPicker'
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, changeOrderDirection, changeOrderBy }) => {
  const Header = () =>(
    <OptionPicker changeOrderBy={changeOrderBy} changeOrderDirection={changeOrderDirection}/>

  )
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const ItemSeparator = () => <View style={styles.separator} />;
   return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={<Header/>}
      />
    </>
  );
};
const RepositoryList = () => {
  const { repositories,loading ,changeOrderDirection, changeOrderBy } = useRepositories();
  if (loading) <Text fontSize={"heading"}>Loading...</Text>
  return <RepositoryListContainer repositories={repositories } changeOrderDirection={changeOrderDirection} changeOrderBy={changeOrderBy} />;
};

export default RepositoryList;
