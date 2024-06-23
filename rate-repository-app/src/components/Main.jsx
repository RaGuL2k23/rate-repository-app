import { StyleSheet, View } from "react-native";

import { Route, Routes } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SingleRepoView from "./SingleRepoView";
import CreateReview from "./ReviewForm";
import CreateUser from "./UserForm";
import MyReviews from "./MyReview";


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/ReviewForm" element={<CreateReview />} />
        <Route path="/UserForm" element={<CreateUser />} />
        <Route path="/myReviews" element={<MyReviews />} />


        <Route path="/repositoryView/:id" element={<SingleRepoView />} />
        <Route path="*" element={<RepositoryList />} />
      </Routes>
    </View>
  );
};

export default Main;
