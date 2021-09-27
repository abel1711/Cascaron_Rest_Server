const { response } = require("express");
const {Categoria, Producto} = require('../models') 


//crear Producto
const crearProducto = async (req, res = response)=>{

   const { estado, usuario, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.usuario = req.user._id;
    // creo la nueva categoria
    const producto = new Producto( data );
    //guardo en la base de datos
    await producto.save();

    res.status(201).json(producto);

}
// // obtener todas las categorias
const obtenerProductos = async (req, res = response) => {
    const { limit = 5, skip = 0} = req.query;
    const query = {estado:true};//para obtener solo los que esten es estado como true

    const [ productos , total] = await Promise.all([
        Producto.find(query)//me busca solo los registros que tengan el estado en true
                    .populate('usuario', 'name')
                    .populate('categoria', 'name')
                    .skip(Number(skip))
                    .limit(Number(limit)),
        Producto.countDocuments(query)//me cuenta solo los registros que tenga el estado en true
    ])
    res.json({
        total,
        productos
    });
}

const obtenerProductoById = async (req, res = response)=>{
    const id = req.params.id;
    const producto = await Producto.findById(id)
                    .populate('usuario', 'name')
                    .populate('categoria', 'name');
    res.status(200).json({
        producto
    })

}

const actualizarProductoById = async (req, res = response)=>{

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;
    if(data.name){
        
        data.name = data.name.toUpperCase();
    }
    data.usuario = req.user._id;
    const producto = await Producto.findByIdAndUpdate(id, data, {new:true})
                        .populate('usuario', 'name')
                        .populate('categoria', 'name');
    
    res.status(200).json({
        producto
    })

}

const borrarProducto = async ( req , res=response )=>{

    const { id } = req.params;
    const usuario = req.user._id;
    const borrar = {estado:false, usuario};
    const producto = await Producto.findByIdAndUpdate( id , borrar, {new:true})
                        .populate('usuario', 'name')
                        .populate('categoria', 'name');
    res.json({
        producto
    })

}

module.exports={
    crearProducto,
    obtenerProductoById,
    obtenerProductos,
    actualizarProductoById,
    borrarProducto
}