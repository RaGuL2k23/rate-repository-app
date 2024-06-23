import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ItemSeparator, ReviewStyle, formatDateToDMY } from "./SingleRepoView";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_MY_REVIEWS } from "../graphql/queries";

const styles = StyleSheet.create({
    btn: {
        color: "white",
        backgroundColor:'green',
        padding: 6,
        alignSelf: "flex-start",
        borderRadius: 5,
      },
})

const DisplayMyReviewItem = ({ review,username }) => {
    const timestamp = review.createdAt;
    const date = new Date(timestamp);
    return (
      <>
        <View style={ReviewStyle.reviewContainer}>
        <View style={ReviewStyle.count}>
          <Text   fontSize={"heading"}>{review.rating}</Text>
        </View>
        <View>
          <Text fontSize={"subheading"}>{formatDateToDMY(date)}</Text>
           <Text fontSize={"subheading"} style={ReviewStyle.reviewUser}>{username}</Text>
               <Text style={ReviewStyle.reviewText}>{review.text}</Text>
             </View>

            
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
            <Pressable onPress={()=>alert()}><Text style={styles.btn}>VIEW REPOSITORY</Text></Pressable>
            <Pressable onPress={()=>alert('sure about it')}><Text style={{...styles.btn,backgroundColor:'red'}}>DELETE</Text></Pressable>
            </View>
      </>
         );
  };

  const MyReviews = () => {
    // const { id } = useParams("/myReviews/:id");
    const { data, loading, error } = useQuery(GET_MY_REVIEWS, {
    //   variables: { repositoryId: id },
    });
  
    if (error) {
      return (
        <Text color={"primary"} fontSize={"heading"}>
          Something went wrong
        </Text>
      );
    }
  
    if (loading) {
      return (
        <Text color={"primary"} fontSize={"heading"}>
          Loading...
        </Text>
      );
    }
  
    // const repository = data.repository;
    // const reviews = repository.reviews.edges.map((edge) => edge.node);
     const username = data.me.username
    const myReviews = data.me.reviews.edges.map(e=>e.node)
    return (
      <FlatList
        data={myReviews}
        renderItem={({item}) => <DisplayMyReviewItem username={username} review={item} />}
        keyExtractor={({ createdAt,text }) => {createdAt+text+myReviews.text+username}}
        // ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  };

export default MyReviews