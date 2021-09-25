const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generator-jwt");



const login = async (req, res = response)=>{

    const { email, password } = req.body

    try {
        //verificar si email existe
        const usuario = await Usuario.findOne({email});
        if (!usuario){
            return res.status(400).json({
                msg:'Email | Password incorrect-email'
            })
        }
        //Verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg:'Email | Password incorrect-estado:false'
            })
        }
        //verificar contraseña
        const isPassCorrect = bcryptjs.compareSync(password, usuario.password);
        if(!isPassCorrect){
            return res.status(400).json({
                msg:'Email | Password incorrect-password'
            })
        }
        //generar el json web token
        const token = await generarJWT( usuario.id);


        res.json({
            usuario,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "msg":"Hable con el administrador"
        })
        
    }


}

module.exports={
    login
}