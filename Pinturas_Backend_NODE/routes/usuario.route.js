const express = require('express');
const userSchema = require('../models/usuario');

const router = express.Router();

//Crear un usuario
router.post('/usuario', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Obtener todos los usuarios
router.get('/usuario', async (req, res) => {
    userSchema.find({}).then((usuarios) => {
        res.send(usuarios);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Obtener un usuario por Cedula
router.get('/usuario/:cedula', async (req, res) => {
    const cedula = req.params.cedula;
    userSchema.findOne({cedula}).then((usuario) => {
        if (!usuario) {
            return res.status(404).send();
        }
        res.send(usuario);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

//Actualizar un usuario por Cedula
router.patch('/usuario/:cedula', async (req, res) => {
    const _cedula = req.params.cedula;
    const { nombre, email, password, rol } = req.body;
    userSchema
        .updateMany({cedula: _cedula}, { $set: { nombre, email, password, rol } })
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)});
});

//Eliminar un usuario por Cedula
router.delete('/usuario/:cedula', async (req, res) => {
    const _cedula = req.params.cedula;
    userSchema
        .deleteMany({cedula: _cedula})
        .then(() => {res.status(200).send();
    }).catch(err => {
        res.status(400).send(err)});
});

module.exports = router;