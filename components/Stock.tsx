import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import productModel from "../models/products.ts";
import { Base, Typography} from "../styles/index.js";

function AllProducts({products, setProducts}) {
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);
  return products;
}

function StockList({products, setProducts}) {
  useEffect(async () => {
    console.log("calling productmodel")
    setProducts(await productModel.getProducts());
  }, []);
  console.log("Im at Stocklist");
  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.normal }}
            >
              { product.name } - { product.stock }
            </Text>
  });
  return list
}

export default function Stock({products, setProducts}) {
    return (
      <View>
        <Text style={{...Typography.header3}}>In stock right now:</Text>
        <StockList products={products} setProducts={setProducts}/>
        <Text style={{...Typography.header3 }}>Products under developement: </Text>
      </View>
    );
}


// function Location(location, {products, setProducts}) {
//     let list = Array();
//     let myProducts = AllProducts({products, setProducts});
//     for (let product of myProducts) {
//         if (product.location === location) {
//             list.push(product)
//         }
//     }
//     return list;
// }

// function InStock() {
//   // let products = AllProducts();
//   // const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock } - {product.id} - {product.article_number}</Text>);
//   const list = Location("Present").map((product, index) => <Text key={index}>{ product.name } - { product.stock }</Text>);;
//
//   return (
//     <View>
//       {list}
//     </View>
//   );
// }
// function Upcomming({products, setProducts}) {
//   const list = Location("Future", {products, setProducts}).map((product, index) => <Text key={index}>{ product.name }</Text>);;
//   list.forEach(element => {
//
//   });
//   return (
//     <View>
//       {list}
//     </View>
//   );
// }
