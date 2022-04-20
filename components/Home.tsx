import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock.tsx';
import theWorld from '../assets/The-World.jpg';
import { Base, Typography} from "../styles/index.js";

export default function Home({products, setProducts}) {
    return (
        <ScrollView style={Base.base}>
            <Text style={{color: Base.earthBlue, ...Typography.header1 }} >The World Shop</Text>
            <Image source={theWorld} style={{ width: 320, height: 240, marginBottom: 28}} />
            <Text style={{color: Base.earthBlue, ...Typography.header3}}>The shop for everything that can't be bought by money!</Text>
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//   },
//   base: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingLeft: 12,
//     paddingRight: 12,
//   }
// });
