import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
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
      <Pressable>
        <Text style={styles.text} fontWeight="normal" fontSize="heading">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
