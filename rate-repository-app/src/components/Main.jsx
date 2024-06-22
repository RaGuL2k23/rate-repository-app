import { StyleSheet, View } from "react-native";

import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import { SingleRepoView } from "./SingleRepoView";

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
        <Route path="/repositoryView/:id" element={<SingleRepoView />} />
        <Route path="*" element={<RepositoryList />} />

    </Routes>
    </View>
  );
};

export default Main;
