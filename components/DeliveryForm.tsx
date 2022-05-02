import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Form, AppButtonStyle} from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/deliveries";
import Delivery from '../interfaces/delivery';
import AppButton from './AppButton';

export default function DeliveryForm({navigation, products, setProducts }) {
    console.log(showMissingInfo);
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [showMissingInfo, setShowMissingInfo] = useState(false);

    return (
        <ScrollView style={{ ...Base.container}}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>
            <Text style={{ ...Typography.small, color:"red"}}>* = Obligatorisk uppgift </Text>
            <Text style={{ ...Typography.label }}>Produkt*</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal*</Text>
            <TextInput
                style={{ ...Form.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Form.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Text style={{ ...Typography.label }}>Datum *</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            <Button
                title="Gör inleverans"
                onPress={() => {
                    console.log(delivery);
                    addDelivery();
                }}
            />
            <View style={{display:showMissingInfo ? 'flex' : 'none'}}>
                <Text style={{...Typography.small, color:"red"}}>
                    Obligatorisk uppgift saknas!
                </Text>
            </View>
        </ScrollView>
    );

    async function addDelivery() {
        if (!delivery?.product_id || !delivery?.amount || !delivery?.delivery_date) {
            console.log("stuff are undefined");
            setShowMissingInfo(true);
            console.log(showMissingInfo);
            return;
        }
        await deliveryModel.postDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };
        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    }
};

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            style={{ ...Form.input }}
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>();
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <AppButton
                    style={Form.input}
                    onPress={()=> showDatePicker()}>
                    {dropDownDate?.toLocaleDateString('en-GB') || "Choose a delivery date"}
                </AppButton>
                // <Button
                //     onPress={showDatePicker}
                //     title={dropDownDate?.toLocaleDateString('en-GB') || "Choose a delivery date"}
                // />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setShow(false);
                        console.log("date");
                        console.log(date.toLocaleDateString('sv-SE'));
                        console.log(typeof(date));

                        setDropDownDate(date);
                        // if (dropDownDate) {
                        //     console.log("DropdownDate")
                        //     props.setDelivery({
                        //         ...props.delivery,
                        //         delivery_date: dropDownDate.toLocaleDateString('en-GB'),
                        //     });
                        // }
                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('en-GB')
                        });
                        console.log(props.delivery);
                    }}
                    value={dropDownDate || new Date()}
                />
            )}
        </View>
    );
}
//
// function TimeDropDown(props) {
//     const [dropDownTime, setDropDownTime] = useState<Date>(new Date());
//     const [show, setShow] = useState<Boolean>(false);
//
//     const showTimePicker = () => {
//         setShow(true);
//     };
//
//     return (
//         <View>
//             {Platform.OS === "android" && (
//                 <Button
//                     onPress={showTimePicker}
//                     title={dropDownDate?.toLocaleTimeString('se-SV')}
//                 />
//             )}
//             {(show || Platform.OS === "ios") && (
//                 <DateTimePicker
//                     display="spinner"
//                     mode="time"
//                     value={dropDownDate}
//                     onChange={(event, date) => {
//                         setShow(false);
//                         setDropDownDate(date || dropDownDate);
//                         props.setDelivery({
//                             ...props.delivery,
//                             delivery_date: dropDownDate.toLocaleDateString('se-SV'),
//                         });
//                     }}
//                 />
//             )}
//         </View>
//     );
// }


// async function addDelivery() {
//     await deliveryModel.addDelivery(delivery);
//
//     const updatedProduct = {
//         ...currentProduct,
//         stock: (currentProduct.stock || 0) + (delivery.amount || 0)
//     };
//
//     await productModel.updateProduct(updatedProduct);
//
//     navigation.navigate("List", { reload: true });
// }
