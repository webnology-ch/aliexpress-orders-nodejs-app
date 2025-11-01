
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const ordersFile = path.join(__dirname, '../../generated.csv');

function getOrders(callback) {
    const results = [];
    let isFirstRow = true;
    fs.createReadStream(ordersFile)
        .pipe(csv({
            separator: ',',
            headers: [
                "Order Id","Order date","Order Status","Order detail url","Store Name","Store url","Currency","Tracking number","Tracking link","Item title","Item price","Item quantity","Item attributes","Item image url","Item product link","Total order net price","Total Shipping","Total price adjustments","Total discount","Total EU Tax","Total VAT","Total price","Buyer Full Name","Buyer address","Buyer Phone Number","Buyer country","Buyer region","Buyer ZIP","Buyer city","Payment method"
            ]
        }))
        .on('data', (data) => {
            // Skip header rows by checking for header values in data
            if (
                data['Order Id'] === 'Order Id' ||
                data['Item title'] === 'Item title' ||
                data['Order date'] === 'Order date'
            ) {
                return;
            }
            // Only parse rows with a valid item title and image
            if (data['Item title'] && data['Order Id'] && data['Item image url']) {
                results.push({
                    orderId: data['Order Id'],
                    date: data['Order date'],
                    price: data['Item price'],
                    currency: data['Currency'],
                    name: data['Item title'],
                    imageUrl: data['Item image url'],
                    detailUrl: data['Order detail url'],
                    storeName: data['Store Name'],
                    storeUrl: data['Store url'],
                    ...data // for detail view
                });
            }
        })
        .on('end', () => callback(results));
}

exports.listOrders = (req, res) => {
    getOrders((orders) => {
        res.render('orders', { orders });
    });
};

exports.orderDetail = (req, res) => {
    const orderId = req.params.id;
    getOrders((orders) => {
        const order = orders.find(o => o.orderId === orderId);
        res.render('orderDetail', { order });
    });
};
