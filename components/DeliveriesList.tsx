// del av components/DeliveriesList.tsx
import { useState, useEffect } from 'react';
import { Base, Typography} from "../styles/index.js";
import { ScrollView, Text, Button} from "react-native";
import Delivery from "../interfaces/delivery";
import deliveryModel from "../models/deliveries";


export default function DeliveriesList( {route, navigation} ) {
    const { reload } = route.params || false;
    const [deliveries, setDeliveries] = useState([]);
    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries());
        navigation.navigate("List", {reload: false});
    }

    useEffect(() => {
        console.log("at deliveriesList useEffect")
        reloadDeliveries();
    }, []);

    function listOfDeliveries() {
        console.log(deliveries);
        let returnValue = deliveries?.map((delivery, index) => {
            return <Text
                    key={index}
                    style={{ ...Typography.normal }}
                    >
                      { delivery.product_name } - { delivery.amount } - { delivery.delivery_date }
                    </Text>
            });
        if (deliveries.length === 0) {
            returnValue = <Text style={{...Typography.normal}}>Det finns inga tidigare Inleveranser</Text>
        }
        return returnValue
    }

    return (
        <ScrollView style={Base.container}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries()}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}
