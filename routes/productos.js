const { Router } = require ('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductoById, obtenerProductos, actualizarProductoById, borrarProducto } = require('../controllers/productos');
const { existeCategoriaById, existeProductoDB, existeProductoById } = require('../helpers/db-validators');

const { authenticateJWT, validarCampos, isADMIN_ROLE } = require('../middlewares');

const router = Router();


// //obtener todos los productos - pùblico
router.get('/', obtenerProductos);

// //Obtener un producto por id - Pùblico

router.get('/:id', [
    check('id', 'necesitas un id valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
],obtenerProductoById)

// Crea producto - privado - cualquier con token valido
//obligatorio: nombre, categoria
router.post('/', [
    authenticateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('name').custom(existeProductoDB),
    check('categoria','el id de la categoria esta mal').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
], crearProducto)

//Actualizar producto - cualquiera con token válido

router.put('/:id', [ authenticateJWT, 
    check('id', 'necesitas un id valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos], actualizarProductoById )

// // Borrar un producto solo ADMIN_ROLE

router.delete('/:id', [
    authenticateJWT,
    isADMIN_ROLE,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], borrarProducto )




module.exports= router;