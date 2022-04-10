import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);
  return products;
}
function Location(location) {
    let list = Array();
    let products = AllProducts();
    for (let product of products) {
        if (product.location === location) {
            list.push(product)
        }
    }
    return list;
}

function InStock() {
  // let products = AllProducts();
  // const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock } - {product.id} - {product.article_number}</Text>);
  const list = Location("Present").map((product, index) => <Text key={index}>{ product.name } - { product.stock }</Text>);;

  return (
    <View>
      {list}
    </View>
  );
}
function Upcomming() {
  const list = Location("Future").map((product, index) => <Text key={index}>{ product.name }</Text>);;
  list.forEach(element => {

  });
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
    return (
      <View>
        <Text style={{color: '#333', fontSize: 24, paddingTop: 12}}>In stock right now:</Text>
        <InStock/>
        <Text style={{color: '#333', fontSize: 24, paddingTop: 12}}>Products under developement: </Text>
        <Upcomming/>
      </View>
    );
}
