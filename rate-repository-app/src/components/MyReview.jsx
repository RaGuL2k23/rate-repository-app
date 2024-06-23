import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { ItemSeparator, ReviewStyle, formatDateToDMY } from "./SingleRepoView";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import {  useMutation, useQuery } from "@apollo/client";
import { GET_MY_REVIEWS, GET_REPOSITORIES } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutation";

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
    const navigate = useNavigate();
    const [mutate] = useMutation(DELETE_REVIEW, {
      refetchQueries: [{ query: GET_MY_REVIEWS }, { query: GET_REPOSITORIES }],

    });
    const handleDeleteReview =async (id) =>{
        // const [mutate] = useMutation(DELETE_REVIEW, {});
        // await mutate();
        
        Alert.alert('Delete review', 'cannot be undone', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress:async () => {  
                 try{
                    await mutate({
                    variables:{
                        "deleteReviewId":  `${id}`
                      }
                 });
                
                }
                 catch(e){
                    alert('error on deleting');
                    console.log(e.message);
                 }
            } },
          ]);
    }
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
            <Pressable onPress={()=>navigate(`/repositoryView/${review.repositoryId}`)}><Text style={styles.btn}>VIEW REPOSITORY</Text></Pressable>
            <Pressable onPress={()=>handleDeleteReview(review.id)}><Text style={{...styles.btn,backgroundColor:'red'}}>DELETE</Text></Pressable>
            </View>
      </>
         );
  };

  const MyReviews = () => {
    // const { id } = useParams("/myReviews/:id");
    const { data, loading, error } = useQuery(GET_MY_REVIEWS, {

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
     let  username = null
     if(data.me.username)   username = data.me.username

    const myReviews = data.me.reviews.edges.map(e=>e.node)
    return (
      <FlatList
        data={myReviews}
        renderItem={({item}) => <DisplayMyReviewItem username={username} review={item} />}
        keyExtractor={({  id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  };

export default MyReviews