import config from "../config/config.json";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        console.log(response.status);
        const result = await response.json();
        return result.data;
    },
    postDelivery: async function postDelivery(delivery: Partial<Delivery>) {
        delivery.api_key = config.api_key;
        const response = await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });
        console.log(response.status);
    },
    deleteDelivery: async function deleteDelivery(delivery: Partial<Delivery>) {
        deliver.api_key = config.api_key;
        const response = await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
              'content-type': 'application/json'
            },
            method: 'DELETE'
        });
        console.log(response.status);
    },
};
export default deliveries;
