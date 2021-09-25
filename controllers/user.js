const {response} = require ('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require ('bcryptjs');


const userGet = async (req, res = response) => {
    const { limit = 5, skip = 0} = req.query;
    const query = {estado:true};//para obtener solo los que esten es estado como true

    const [ users, total] = await Promise.all([
        Usuario.find(query)//me busca solo los registros que tengan el estado en true
                    .skip(Number(skip))
                    .limit(Number(limit)),
        Usuario.countDocuments(query)//me cuenta solo los registros que tenga el estado en true
    ])
    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {

  
    //desestructurar el body
    const {name, email, role, password} = req.body;
    //crear instancia de schema
    const usuario = new Usuario ( {name, email, role, password} );//enviamos al schema usuario los argumentos que querramos
   
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardan en db
    await usuario.save();
    res.json(usuario);
}

const userPut = async (req, res = response) => {
    const {id}= req.params;
    const { password, email, google, ...resto} = req.body;
    //verificar que id exista en db

    //validar si me envia el password y cambiarlo
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);//encriptar contraseña
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const userPatch = (req, res = response) => {
    res.json({
        msg:'Patch API-Controllers'
    });
}

const userDelete = async (req, res = response) => {

    const {id} = req.params;//el id viena en el mismo url
    //para borrarlo fisicamente
    //no se aconseja hacer asi para no perder la integridad referencial
    // const usuario = await Usuario.findByIdAndDelete(id);
  
    //poner el estado en false
    const borrar = {estado: false};
    const usuario = await Usuario.findByIdAndUpdate(id, borrar);
    res.json(usuario);
}


module.exports={
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}