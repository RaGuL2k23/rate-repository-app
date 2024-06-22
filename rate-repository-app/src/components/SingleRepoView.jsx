import { FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { GET_SNGLE_REPO } from "../graphql/queries";
import { useParams } from "react-router-native";


const styles = StyleSheet.create({
    githubUrl: {
        color: "white",
        padding: 6, 
        textAlign:'center',
        borderRadius: 5,
      },
})

export const SingleRepoView = () => {
  const { id } = useParams("/repositoryView/:id");
  console.log("id", id);
  const { data: item, loading ,error} = useQuery(GET_SNGLE_REPO, {
    variables: {
      repositoryId: `${id}`,
    },
  });
  if(error) <Text color={"primary"} fontSize={"heading"}>
  Someting went wrong
</Text>
  if (loading)
    return (
      <Text color={"primary"} fontSize={"heading"}>
        Loading
      </Text>
    );
//   console.log(item.repository.reviews.edges[0].node, "data");
console.log('df',item.repository.reviews.edges[0].node);

  return (
    <View>
      <RepositoryItem item={item.repository} />
      <Pressable onPress={()=>Linking.openURL(item.repository.url)}>
        <Text style={styles.githubUrl}   backgroundColor={"primary"} fontSize={"heading"}  >Open In Github</Text>
      </Pressable>

    </View>
  );
};
const ItemDetails = ({ item }) => (
    <View style={styles.Details}>
      <Text fontSize={"heading"}>{item.fullName}</Text>
      <Text fontSize={"subheading"} style={{ marginVertical: 10 }}>
        {item.description}
      </Text>
      
    </View>
  );
const ReviewItem = ({ review }) => {
    // Single review item
  };
  
  const SingleRepository = () => {
    // ...
    
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <ItemDetails repository={repository} />}
        // ...
      />
    );
  };