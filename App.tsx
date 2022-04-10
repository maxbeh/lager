import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import theWorld from './assets/The-World.jpg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={{color: '#73a4a9', fontSize: 42}}>The World Shop</Text>
        <Image source={theWorld} style={{ width: 320, height: 240 }} />
        <Text style={{color: '#73a4a9', fontSize: 24}}>The shop for everything that can't be bought by money!</Text>
        <Stock/>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
  }
});
