const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generator-jwt");
const { googleVerify } = require("../helpers/google-verifi");



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
        const token = await generarJWT( usuario.id );


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

const googleSingIn = async ( req, res = response) =>{

    const { id_token } = req.body;

    try {

        const { email, name, img } = await googleVerify(id_token);
        
        let user = await Usuario.findOne({email});

        if(!user){
            //the user not exists, I have to create it
            const data={
                name,
                email,
                img,
                password : ':P',
                google:true,
                role:'USER_ROLE'
            }
            user = new Usuario(data);
            await user.save();
        }
        // si el usuario existe pero tiene el estado en false
        if(!user.estado){
            res.status(401).json({
                msg:'the user is removed from the database, talk with administ'
            })
        }
        //generar el json web token
        const token = await generarJWT( user.id );




        res.json({
           user, token    
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'The token could not be verified',
            error
        })
    }


}
module.exports={
    login,
    googleSingIn
}