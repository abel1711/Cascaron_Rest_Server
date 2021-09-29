const { Router } = require ('express');
const { check } = require('express-validator');
const { mostrarImagen, mostrarImagenCloudinary } = require('../controllers/img');
const { esColeccionPermitida } = require('../helpers');
const { authenticateJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.get('/:coleccion/:id', [ 
    // authenticateJWT,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('coleccion').custom( c =>  esColeccionPermitida( c, ['user','productos'])),
    validarCampos
], mostrarImagenCloudinary );
// ], mostrarImagen );




module.exports= router;