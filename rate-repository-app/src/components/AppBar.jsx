import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <CreateLink to={"/"} text={"Repositories"} />
        <CreateLink to={"signIn"} text={"Sign-In"} />
      </ScrollView>
    </View>
  );
};
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
