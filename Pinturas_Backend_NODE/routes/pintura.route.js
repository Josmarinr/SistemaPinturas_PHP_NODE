const express = require('express');
const pinturaSchema = require('../models/pintura');

const router = express.Router();

//Crear una pintura
router.post('/pintura', async (req, res) => {
    const pintura = new pinturaSchema(req.body);
    pintura.save().then(() => {
        res.status(201).send(pintura);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Obtener todas las pinturas
router.get('/pintura', async (req, res) => {
    pinturaSchema.find({}).then((pinturas) => {
        res.send(pinturas);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Obtener una pintura por Codigo
router.get('/pintura/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    pinturaSchema.find({codigo: _codigo}).then((pintura) => {
        if (!pintura) {
            return res.status(404).send();
        }
        res.send(pintura);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Actualizar una pintura por Codigo
router.put('/pintura/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    const { nombre, descripcion, tamaño, tipo, colores, precio } = req.body;
    pinturaSchema
        .updateMany({codigo: _codigo}, { $set: { nombre, descripcion, tamaño, tipo, colores, precio } })
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Eliminar una pintura por Codigo
router.delete('/pintura/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    pinturaSchema
        .deleteMany({codigo: _codigo})
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)});
});

module.exports = router;