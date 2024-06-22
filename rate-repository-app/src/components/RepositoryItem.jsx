import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import { useNavigate } from "react-router-native";
 
const style = StyleSheet.create({
  tinyLogo: {
    width: 70,
    height: 70,
  },
  container: {
    padding: 20,
    display: "flex",
    gap: 20,
    backgroundColor: "#fff",
  },
  Details: {
    maxWidth: "77%",
  },
  languageText: {
    color: "white",
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
const ItemDetails = ({ item }) => (
  <View style={style.Details}>
    <Text fontSize={"heading"}>{item.fullName}</Text>
    <Text fontSize={"subheading"} style={{ marginVertical: 10 }}>
      {item.description}
    </Text>
    <Text
      testID="language"
      style={style.languageText}
      backgroundColor="primary"
      fontSize={"subheading"}
    >
      {item.language}
    </Text>
  </View>
);
export const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={()=>navigate(`/repositoryView/${item.id}`)}>
      <View testID="repositoryItem" style={style.container}>
        <View style={{ display: "flex", flexDirection: "row", gap: 40 }}>
          <Image
            style={style.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <ItemDetails item={item} />
        </View>

        <ItemStats item={item} />
      </View>
    </Pressable>
  );
};

const ItemStats = ({ item }) => (
  <View style={style.stats}>
    <StatView>
      <StatText bold={"bold"}>{item.stargazersCount}</StatText>
      <StatText>stars</StatText>
    </StatView>
    <StatView>
      <StatText bold={"bold"}>{item.ratingAverage}</StatText>
      <StatText>rating</StatText>
    </StatView>
    <StatView>
      <StatText bold={"bold"}>{item.reviewCount}</StatText>
      <StatText>reviews</StatText>
    </StatView>
    <StatView>
      <StatText bold={"bold"}>{item.forksCount}</StatText>
      <StatText>forks</StatText>
    </StatView>
  </View>
);
const StatView = ({ children }) => {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>{children}</View>
  );
};
const StatText = ({ children, bold }) => {
  return (
    <Text fontWeight={bold} fontSize={"subheading"}>
      {children}
    </Text>
  );
};
export default RepositoryItem;
