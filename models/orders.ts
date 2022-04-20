import config from "../config/config.json";
import initialOrdersAndAndItems from "../config/initialorders.ts";
import Order from "../interfaces/order.ts"
import OrderItem from "../interfaces/orderitem.ts"
import productModel from "./products.ts";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>, status_id = 200) {
        order.status_id = status_id;
        order.api_key = config.api_key
        orders.updateOrder(order);
        // const response = await fetch(`${config.base_url}/orders`, {
        //     body: JSON.stringify(order),
        //     headers: {
        //       'content-type': 'application/json'
        //     },
        //     method: 'PUT'
        // });
        // console.log(response.status);
        // const status = response.status;
        productModel.updateProductsStock(order.order_items);
        // TODO: Minska lagersaldo för de
        // orderrader som finns i ordern

        // TODO: Ändra status för ordern till packad
    },
    resetOrders: async function resetOrders() {
        console.log("At reset orders");
        const allOrders = await orders.getOrders();
        for (let order of allOrders) {
            order.status_id = 100;
            order.api_key = config.api_key;
            orders.updateOrder(order);
        }
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        const response = await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
        });
        console.log("response.status");
        console.log(response.status);
    },
    deleteOrder: async function deleteOrder(order: Partial<Order>) {
        order.api_key = config.api_key;
        const response = await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'DELETE'
        });
    },
    createOrder: async function createOrder(order: Partial<Order>) {
        order.api_key = config.api_key;
        // console.log(order);
        const response = await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });
    },
    addOrderItem: async function addOrderItem(orderItem: Partial<OrderItem>) {
        orderItem.api_key = config.api_key;
        // console.log(orderItem);

        const response = await fetch(`${config.base_url}/order_items`, {
            body: JSON.stringify(orderItem),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });
        // console.log(response.status);
    }
};

export default orders;
