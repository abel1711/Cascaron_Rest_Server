const { Router } = require ('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').notEmpty(),
    validarCampos
], login );


router.post('/google', [
    check('id_token', 'The google token is required').notEmpty(),
    validarCampos
], googleSingIn );


module.exports= router;