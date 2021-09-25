

const validaJWT = require('../middlewares/auth-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validaRole = require('../middlewares/validation-rols');


module.exports = {
    ...validaJWT,
    ...validarCampos,
    ...validaRole,
}



