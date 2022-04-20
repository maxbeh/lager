const initialOrdersAndItems = {
    orders: [
        {
            "name": "Gjinghis Kahn",
            "address": "History Road 42",
            "zip": null,
            "city": null,
            "country": null,
        },
        {
            "name": "Mahatma Gandhi",
            "address": "Nirvana Boulevard 42",
            "zip": null,
            "city": null,
            "country": null,
        }
    ],
    orderItems: [
        {
        Kahn: [{
            "product_name": "Autocracy",
            "amount": 1,
        },
        {
            "product_name": "war",
            "amount": 1,
        },
        {
            "product_name": "World peace",
            "amount": 3,
        }],
        Gandhi: [{
            "product_name": "Democracy",
            "amount": 3,
        }]
        }
    ]
}

export default initialOrdersAndItems;
