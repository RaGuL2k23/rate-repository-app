import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

 
const RepositoryList = () => {

  const { repositories } = useRepositories();

   
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;
 
  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    </>
  );
};

export default RepositoryList;
