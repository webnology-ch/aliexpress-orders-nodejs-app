
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

const Fuse = require('fuse.js');

exports.listOrders = (req, res) => {
    const search = req.query.search ? req.query.search.trim() : '';
    getOrders((orders) => {
        let filtered = orders;
        if (search) {
            const fuse = new Fuse(orders, {
                keys: ['name', 'Item attributes', 'Item product link', 'storeName'],
                threshold: 0.2,
                ignoreLocation: true,
                minMatchCharLength: 2
            });
            filtered = fuse.search(search).map(result => result.item);
        } else {
            filtered = orders;
        }
        res.render('orders', { orders: filtered, search });
    });
};


exports.orderDetail = (req, res) => {
    const orderId = req.params.id;
    getOrders((orders) => {
        const order = orders.find(o => o.orderId === orderId);
        res.render('orderDetail', { order });
    });
};

exports.imagesView = (req, res) => {
    const search = req.query.search ? req.query.search.trim() : '';
    getOrders((orders) => {
        let images = orders.filter(order => order.imageUrl);
        if (search) {
            const Fuse = require('fuse.js');
            const fuse = new Fuse(images, {
                keys: ['name', 'Item attributes', 'Item product link', 'storeName'],
                threshold: 0.4,
                ignoreLocation: true,
                minMatchCharLength: 2
            });
            images = fuse.search(search).map(result => result.item);
        }
        res.render('images', { images, search });
    });
};
