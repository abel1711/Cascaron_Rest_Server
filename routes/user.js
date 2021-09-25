const {Router} = require ('express');
const { check } = require('express-validator');

const {authenticateJWT,
       validarCampos,
       isADMIN_ROLE,
       haveRole} = require ('../middlewares');

const { userGet,
        userPost,
        userPut,
        userDelete,
        userPatch } = require('../controllers/user');
        
const {
        roleValidationDb,
        existsEmailDb,
        existsUserByIdDb
      } = require('../helpers/db-validators');

const router = Router();



router.get('/', userGet );

router.post('/', [
  check('name', 'the name is required').not().isEmpty(),
  check('password', 'the min length of password is 6').isLength({min:6}),
  check('email', 'the email is not valid').isEmail(),
  check('email').custom(existsEmailDb),
  check('role').custom(roleValidationDb),
  validarCampos
],userPost );

router.put('/:id', [
  check('id','Not is an id valid').isMongoId(),
  check('id').custom(existsUserByIdDb),
  check('role').custom(roleValidationDb),
  validarCampos
], userPut );

router.delete('/:id', [
  authenticateJWT,
  //isADMIN_ROLE,
  haveRole('USER_ROLE', 'ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id','Not is an id valid').isMongoId(),
  check('id').custom(existsUserByIdDb),
  validarCampos
], userDelete );

router.patch('/', userPatch );


  module.exports = router;