import { Text,View,StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor:'red',
       tintColor:4
      },
    text: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'blue',
        padding: 10,
        marginVertical: 1.8,
        borderRadius: 5,
      },
})

const RepositoryItem = ({ item }) => {
  const keyValues = Object.entries(item);//get all attributes for one item
  const keyValuesInText =  keyValues.map((e) => {
    if (e[0] == "id") return null;
    return <Text style={style.text} key={e.id + e}>{e[0]+"   "}
            <Text style={{color:'#dff'}}> {e[1]}</Text>
        </Text>;
})
  return (
    <View style={style.container} >
        { keyValuesInText}
  </View> 
  )

};

export default RepositoryItem;
