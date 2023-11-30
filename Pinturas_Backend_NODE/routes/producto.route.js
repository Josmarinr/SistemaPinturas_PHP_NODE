const express = require('express');
const productoSchema = require('../models/producto');

const router = express.Router();

//Crear un producto
router.post('/producto', async (req, res) => {
    const producto = new productoSchema(req.body);
    producto.save().then(() => {
        res.status(201).send(producto);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Obtener todos los productos
router.get('/producto', async (req, res) => {
    productoSchema.find({}).then((productos) => {
        res.send(productos);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Obtener un producto por Codigo
router.get('/producto/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    productoSchema.find({codigo: _codigo}).then((producto) => {
        if (!producto) {
            return res.status(404).send();
        }
        res.send(producto);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Actualizar un producto por Codigo
router.put('/producto/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    const { nombre, descripcion, cantidad, precio } = req.body;
    productoSchema
        .updateMany({codigo: _codigo}, { $set: { nombre, descripcion, cantidad, precio } })
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)
    });
});

//Eliminar un producto por Codigo
router.delete('/producto/:codigo', async (req, res) => {
    const _codigo = req.params.codigo;
    productoSchema
        .deleteMany({codigo: _codigo})
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)});
});

module.exports = router;