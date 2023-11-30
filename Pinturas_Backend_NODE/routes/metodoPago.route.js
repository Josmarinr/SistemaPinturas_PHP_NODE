const express = require('express');
const metodoPagoSchema = require('../models/metodoPago');

const router = express.Router();

//Crear un metodo de pago
router.post('/metodoPago', async (req, res) => {
    const metodoPago = new metodoPagoSchema(req.body);
    metodoPago.save().then(() => {
        res.status(201).send(metodoPago);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Obtener todos los metodos de pago
router.get('/metodoPago', async (req, res) => {
    metodoPagoSchema.find({}).then((metodosPago) => {
        res.send(metodosPago);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Obtener un metodo de pago por Codigo
router.get('/metodoPago/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    metodoPagoSchema.findOne({codigo: _codigo}).then((metodoPago) => {
        if(!metodoPago){
            return res.status(404).send();
        }
        res.send(metodoPago);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Actualizar un metodo de pago por Codigo
router.patch('/metodoPago/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try{
        const metodoPago = await metodoPagoSchema.findOne({codigo: codigo});
        if(!metodoPago){
            return res.status(404).send();
        }
        metodoPago.metodo = req.body.metodo;
        await metodoPago.save();
        res.send(metodoPago);
    }catch(error){
        res.status(500).send(error);
    }
});

//Eliminar un metodo de pago por Codigo
router.delete('/metodoPago/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try{
        const metodoPago = await metodoPagoSchema.findOneAndDelete({codigo: codigo});
        if(!metodoPago){
            return res.status(404).send();
        }
        res.send(metodoPago);
    }catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;
