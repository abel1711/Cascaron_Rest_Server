const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const authenticateJWT = async ( req = request , res = response , next)=>{

    
    const token = req.header('x-token');

    if(!token){
        
        return res.status(401).json({
            msg:'You need have an JWT'
        })

    }
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer usuario de la base de datos
        const user = await Usuario.findById( uid );
        // verificar que usuario no sea undefined
        if(!user){
            return res.status(401).json({
                msg: 'JWT not valid - user not exist in data base'
            })
        }
        //preguntar si el user esta activo
        if(!user.estado){
            return res.status(401).json({
                msg: 'JWT not valid - user state:false'
            })
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'You need an JWT valid'
        })
        
    }


}



module.exports={
    authenticateJWT
}