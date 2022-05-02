import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';
import { Base, Typography} from "../styles/index.js";

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    const [productsList, setProductsList] = useState([]);
    return (
        <Stack.Navigator initialRouteName="Order List" style={Base.base}>
            <Stack.Screen name="Order List">
            {(screenProps) => <OrderList {...screenProps}
                                setProducts={props.setProducts}
                                />}
            </Stack.Screen>
            <Stack.Screen name="Order Details">
                {(screenProps) => <PickList {...screenProps}
                                    setProducts={props.setProducts}
                                    setProductsList={setProductsList}
                                    productsList={productsList}
                                    />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}




//     {() => <PickList setProducts={setProducts}/>}
// </Stack.Screen>



// import { Text, View } from 'react-native';
//
// export default function Pick() {
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Plocklista</Text>
//         </View>
//     );
// }
