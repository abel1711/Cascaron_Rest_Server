const { Router } = require('express');
const {check} =  require('express-validator');
const { cargarArchivo, actualizarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { esColeccionPermitida } = require('../helpers');
const { validarCampos, validarArchivo, authenticateJWT } = require('../middlewares');

const router = Router();


router.post('/', [
    validarArchivo,
authenticateJWT], cargarArchivo);

router.put('/:coleccion/:id', [ validarArchivo,
    authenticateJWT,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('coleccion').custom( c =>  esColeccionPermitida( c, ['user','productos'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen)


module.exports = router;
