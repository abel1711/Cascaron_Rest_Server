const { validationResult } = require('express-validator');



const validarCampos = ( req , res, next )=>{
      //manejar los errores del check del express-validator
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json(errors);
      }
      next();
}


module.exports={
    validarCampos
}