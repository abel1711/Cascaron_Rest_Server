

const validaJWT = require('../middlewares/auth-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validaRole = require('../middlewares/validation-rols');
const validarArchivo = require('../middlewares/validar-archivo');


module.exports = {
    ...validaJWT,
    ...validarCampos,
    ...validaRole,
    ...validarArchivo
}



