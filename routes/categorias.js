const { Router } = require ('express');
const { check } = require('express-validator');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoriaById,
        actualizarCategoriaById,
        borrarCategoria
        } = require('../controllers/castegorias');
const { existeCategoriaById } = require('../helpers/db-validators');
const { authenticateJWT, validarCampos, isADMIN_ROLE } = require('../middlewares');

const router = Router();


//obtener todas las categorias - pùblico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - Pùblico

router.get('/:id', [
    check('id', 'necesitas un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],obtenerCategoriaById)

// Crea categoria - privado - cualquier con token valido

router.post('/', [authenticateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

//Actualizar categoria - cualquiera con token válido

router.put('/:id', [ authenticateJWT, 
    check('id', 'necesitas un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('name', 'Necesitasmos el nombre a cambiar').notEmpty(),
    validarCampos], actualizarCategoriaById )

// Borrar una categoria solo ADMIN_ROLE

router.delete('/:id', [
    authenticateJWT,
    isADMIN_ROLE,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], borrarCategoria )




module.exports= router;