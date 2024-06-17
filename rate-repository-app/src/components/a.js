import Text from "./Text";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: "green",
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: "blue",
  },
});

const FlexboxExample = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Text>Flex item A</Text>
      </View>
      <View style={styles.flexItemB}>
        <Text>Flex item B</Text>
      </View>
    </View>
  );
};
const Main = () => {
  return (
    <>
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
      <Text fontWeight={"bold"} fontSize="heading">
        Bold subheading
      </Text>
      <Text fontSize="heading" fontWeight={"normal"} color="primary">
        Text with prim color
      </Text>
      <FlexboxExample />
    </>
  );
};

export default Main;
