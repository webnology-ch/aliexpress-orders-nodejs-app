const express = require('express');
const path = require('path');
const ordersRouter = require('./routes/orders');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/orders', ordersRouter);

app.get('/', (req, res) => res.redirect('/orders'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));