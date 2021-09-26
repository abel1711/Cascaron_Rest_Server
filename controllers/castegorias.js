const { response } = require("express");
const {Categoria} = require('../models') 


//crear categoria
const crearCategoria = async (req, res = response)=>{
    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({name});
    //pregunto si ya existe la categoria en la base de datos
    if(categoriaDB){
        res.status(400).json({
            msg:`La categoria ${name} ya existe en la base de datos`
        })
    }
    //si no existe creo la data para la base de datos
    const data = {
        name,
        usuario : req.user._id
    }
    // creo la nueva categoria
    const categoria = new Categoria ( data );
    //guardo en la base de datos
    await categoria.save();

    res.status(201).json(categoria);

}
// obtener todas las categorias
const obtenerCategorias = async (req, res = response) => {
    const { limit = 5, skip = 0} = req.query;
    const query = {estado:true};//para obtener solo los que esten es estado como true

    const [ categorias , total] = await Promise.all([
        Categoria.find(query)//me busca solo los registros que tengan el estado en true
                    .populate('usuario', 'name')
                    .skip(Number(skip))
                    .limit(Number(limit)),
        Categoria.countDocuments(query)//me cuenta solo los registros que tenga el estado en true
    ])
    res.json({
        total,
        categorias
    });
}

const obtenerCategoriaById = async (req, res = response)=>{
    const id = req.params.id;
    const categoria = await Categoria.findById(id).populate('usuario', 'name');
    res.status(200).json({
        categoria
    })

}

const actualizarCategoriaById = async (req, res = response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;
    data.name = data.name.toUpperCase();
    data.usuario = req.user._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true}).populate('usuario', 'name');
    
    res.status(200).json({
        categoria
    })

}

const borrarCategoria = async ( req , res=response )=>{

    const { id } = req.params;
    const borrar = {estado:false};
    const categoria = await Categoria.findByIdAndUpdate( id , borrar);
    res.json({
        categoria
    })

}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    actualizarCategoriaById,
    borrarCategoria
}