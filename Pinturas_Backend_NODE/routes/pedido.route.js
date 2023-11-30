const express = require('express');
const pedidoSchema = require('../models/pedido');

const router = express.Router();

//Crear un pedido
router.post('/pedido', async (req, res) => {
    const pedido = new pedidoSchema(req.body);
    pedido.save().then(() => {
        res.status(201).send(pedido);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Obtener todos los pedidos
router.get('/pedido', async (req, res) => {
    pedidoSchema.find({}).then((pedidos) => {
        res.send(pedidos);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Obtener un pedido por Codigo
router.get('/pedido/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    pedidoSchema.findOne({codigo: codigo}).then((pedido) => {
        if(!pedido){
            return res.status(404).send();
        }
        res.send(pedido);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Actualizar un pedido por Codigo
router.patch('/pedido/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try{
        const pedido = await pedidoSchema.findOne({codigo: codigo});
        if(!pedido){
            return res.status(404).send();
        }
        pedido.usuario = req.body.usuario;
        pedido.fecha = req.body.fecha;
        pedido.metodoPago = req.body.metodoPago;
        pedido.productos = req.body.productos;
        pedido.total = req.body.total;
        await pedido.save();
        res.send(pedido);
    }catch(error){
        res.status(500).send(error);
    }
});

//Eliminar un pedido por Codigo
router.delete('/pedido/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try{
        const pedido = await pedidoSchema.findOneAndDelete({codigo: codigo});
        if(!pedido){
            return res.status(404).send();
        }
        res.send(pedido);
    }catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;