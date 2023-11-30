const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/usuario.route');
const metodoPagoRouter = require('./routes/metodoPago.route');
const authRouter = require('./routes/autenticacion.route');
const pedidoRouter = require('./routes/pedido.route');
const pinturaRouter = require('./routes/pintura.route');
const productoRouter = require('./routes/producto.route');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api',userRouter);
app.use('/api',metodoPagoRouter);
app.use('/api',authRouter);
app.use('/api',pedidoRouter);
app.use('/api',pinturaRouter);
app.use('/api',productoRouter);


const server = app.listen(port, () => {
    console.log('Server is listening on port http://localhost:' + port);
});

mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

module.exports = {app, server};