import config from "../config/config.json";
import Product from "../interfaces/product.ts"
import initialProducts from "../config/initialproducts.ts";

const products = {
    getProducts: async function getProducts(productId = "") {
        let path = `${config.base_url}/products/${productId}?api_key=${config.api_key}`;
        // if (productId) {
        //     path = `${config.base_url}/products/${productId}?api_key=${config.api_key}`;
        // }
        const response = await fetch(path);
        // console.log(response.status);
        const result = await response.json();
        console.log("Im at products model getproducts")
        // console.log(result.data);

        return result.data;
  },
  getProductByName: async function getProductByName(productName: String) {
      const path = `${config.base_url}/products/search/${productName}?api_key=${config.api_key}`
      const response = await fetch(path);
      const result = await response.json();
      return result.data;
  },

  updateProduct: async function updateProduct(product: Partial<Product>) {
      product.api_key = config.api_key;
      // console.log(product);
      const response = await fetch(`${config.base_url}/products`, {
          body: JSON.stringify(product),
          headers: {
            'content-type': 'application/json'
          },
          method: 'PUT'
      });
      // console.log(response.status);
  },
  updateProductsStock: async function updateProductsStock(itemList: Array<OrderItem>) {
      // console.log(itemList);
      for (let item of itemList) {
          const product = await products.getProducts(item.product_id);
          product.stock = product.stock - item.amount;
          products.updateProduct(product);
          // console.log(response.stock);
      }
  },
  resetProducts: async function resetProducts() {
      let allProducts = await products.getProducts();
      for (let product of allProducts) {
          // console.log(product.name);
          for (initProduct of initialProducts) {
              // console.log(initProduct.name);
              if (initProduct.name === product.name) {
                  console.log(initProduct.stock);
                  product.stock = initProduct.stock;
                  products.updateProduct(product);
              }
          }
      }
      allProducts = await products.getProducts();
      // console.log(allProducts);
  },
  deleteProduct: async function deleteProduct(product: Partial<Product>) {
      product.api_key = config.api_key;
      const response = await fetch(`${config.base_url}/products`, {
          body: JSON.stringify(product),
          headers: {
            'content-type': 'application/json'
          },
          method: 'DELETE'
      });
  },
  createProduct: async function createProduct(product: Partial<Product>) {
      product.api_key = config.api_key;
      const response = await fetch(`${config.base_url}/products`, {
          body: JSON.stringify(product),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
      });
  }

};

export default products
