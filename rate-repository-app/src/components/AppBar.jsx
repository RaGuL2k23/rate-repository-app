import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { useEffect, useState } from "react";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e1e4e8",
  },
  text: {
    color: "white",
    padding: 10,
    backgroundColor: "#000800",
  },
  // ...
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [loggedIn, setLoggedIn] = useState();
  const navigate = useNavigate()
  const { data, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });
  const removeToken = async () => {
    try{await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/')
  }
    catch(e){
      alert('error on logout ',e.message);
    }
  };
  useEffect(() => {
    if (data) {
      setLoggedIn(data.me);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      console.error("Error fetching me:", error);
    }
  }, [error]);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <CreateLink to={"/"} text={"Repositories"} />
        {loggedIn != null ? (
         <>
         <CreateLink to={"/ReviewForm"} text={"Create Review"} />
         <CreateLink to={"/myReviews"} text={"MY Reviews"} />

          <LogOutBtn removeToken={removeToken} />
         </>

        ) : (
          <>
          <CreateLink to={"signIn"} text={"Sign-In"} />
          <CreateLink to={"UserForm"} text={"Sign-Up"} />
          </>    
        )}
      </ScrollView>
    </View>
  );
};
const LogOutBtn = ({ removeToken }) => (
  <Pressable onPress={removeToken}>
    <Text style={styles.text} fontWeight="normal" fontSize="subheading">
      Log Out
    </Text>
  </Pressable>
);
const CreateLink = ({ to, text }) => {
  return (
    <Link to={to}>
      <Text style={styles.text} fontWeight="normal" fontSize="subheading">
        {text}
      </Text>
    </Link>
  );
};
export default AppBar;
