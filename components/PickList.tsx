import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";
import { useState, useEffect } from 'react';
import { Base, Typography} from "../styles/index.js";


export default function PickList({ route, navigation, setProducts, productsList, setProductsList }) {
    const { order } = route.params;
    // console.log(order)
    // const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order); /* should remove order*/
        /*HERE PROBLEM THAT SETPRODUCTS IT NOT PASSED ON FROM PARENT*/
        setProducts(await productModel.getProducts()); /* updates stock after above call*/
        navigation.navigate("Order List", { reload: true });
        // , { reload: true }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                style={{...Typography.normal}}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });
    function checkAvailability() {
        // let orderList = order.order_items.map((item, index) => {
        //     return item
        // });
        // console.log("STARTING OVER")
        // console.log(order.order_items);
        let returnValue = <Button title="Plocka order" onPress={pick} />;
        for (let order_item of order.order_items) {
            let productExists = productsList.filter(product => product.name === order_item.name)[0];
            if (productExists) {
                if (order_item.amount >= productExists.stock) {
                    console.log("in checking availability")
                    returnValue = <Text style={{color: "red"}}> Sorry we don't have all of your items in stock </Text>;
                }
            }
        }
        return returnValue
    };
    // let pickOrNotPick =
    return (
        <View style={Base.container}>
            <Text style={{...Typography.normal}}>{order.name}</Text>
            <Text style={{...Typography.normal}}>{order.address}</Text>
            <Text style={{...Typography.normal}}>{order.zip} {order.city}</Text>
            <Text style={{...Typography.delimiter}}>----------</Text>
            <Text style={{...Typography.normal}}>Produkter:</Text>

            {orderItemsList}
            {checkAvailability()}
        </View>
    )
};
