import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open  sdf sdf App.js to start working on your app!</Text>
            <Text>vanakam da maple </Text>

       <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fdfdf',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:"1.4rem"
  },
});
