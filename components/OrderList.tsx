import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { Base, Typography} from "../styles/index.js";

export default function OrderList({ route, navigation, setProducts }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);
    // console.log(reload);
    if (reload) {
        // console.log("in reload")
        reloadOrders();
    }

    async function reloadOrders() {
        // console.log("Reloading orders")
        setAllOrders(await orderModel.getOrders());
        setProducts( await productModel.getProducts());
        navigation.navigate('Order List', { reload: false});
    }
    // console.log("above useeffect")
    useEffect(() => {
        reloadOrders();
    }, []);

    // console.log("filtering orders on ny");
    // console.log(JSON.stringify(allOrders));
    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order Details', {
                        order: order
                    });
                }}
            />
        });
    function resetOrdersAndStock() {
        return <Button
            title={"Reinitiate Orders and Product stock"}
            onPress={() => {
                console.log("pressed reset button");
                orderModel.resetOrders();
                productModel.resetProducts();
                navigation.navigate('Order List', { reload: true});
            }}
        />
    }
    return (
        <View style={Base.container}>
            <Text style={{...Typography.normal}}>Ordrar redo att plockas</Text>
            {listOfOrders}
            <Text style={{...Typography.normal, paddingTop: 24}}>Press button below to reinitiate orders and products during testing:</Text>
            {resetOrdersAndStock()}
        </View>
    );
}



// useEffect(() => {
//     fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
//       .then(response => response.json())
//       .then(result => setAllOrders(result.data));
// }, []);
