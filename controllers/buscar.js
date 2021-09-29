const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {userGet} = require('./user')

const {Usuario, Producto, Categoria } = require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosporusuarioid',
    'productosporcategoriaid'
]

const buscarUsuarios = async  (req, res = response, termino = '')=>{
   
    if(termino === 'all'){
        const usuarios = await Usuario.find({estado:true});
        return res.json({
            totals: usuarios.length,
            results : usuarios
        })
    }
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const usuario = await  Usuario.findById(termino);
        return res.json({
            results: ( usuario) ? [usuario] : []
        })
    }
    const regexp = new RegExp ( termino , 'i');//con esta expresion regular lo hago que no tenga en cuenta masyusculas ni minisculas
    const usuarios = await Usuario.find({
        $or :[{ name : regexp}, {email:regexp}],
        $and:[{estado:true}]
    });
    return res.json({
        totals: usuarios.length,
        results : usuarios
    })
    
}
const buscarCategorias = async  ( req, res = response, termino = '' )=>{

    if(termino === 'all'){
        const categorias = await Categoria.find({estado:true})
                                    .populate('usuario', 'name');

        return res.json({
            totals: categorias.length,
            results : categorias
        })
    }
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const categoria = await  Categoria.findById(termino)
                                            .populate('usuario', 'name');
        return res.json({
            results: ( categoria ) ? [categoria ] : []
        })
    }
    const regexp = new RegExp ( termino , 'i');//con esta expresion regular lo hago que no tenga en cuenta masyusculas ni minisculas
    const categoria = await Categoria.find({$and:[{estado:true},{ name : regexp}]}) //las dos expresiones se tiene que cumplir
                                        .populate('usuario', 'name');
    return res.json({
        totals: categoria.length,
        results : categoria
    })
    
}
const buscarProductos = async  ( req, res = response, termino = '' )=>{

    if(termino === 'all'){
        const productos = await Producto.find({estado:true})
                                    .populate('usuario', 'name')
                                    .populate('categoria', 'name');
        return res.json({
            totals: productos.length,
            results : productos
        })
    }
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const producto = await  Producto.findById(termino)
                                            .populate('usuario', 'name')
                                            .populate('categoria', 'name');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }
    const regexp = new RegExp ( termino , 'i');//con esta expresion regular lo hago que no tenga en cuenta masyusculas ni minisculas
    const producto = await Producto.find({$and:[{estado:true},{ name : regexp}]}) //las dos expresiones se tiene que cumplir
                                        .populate('usuario', 'name')
                                        .populate('categoria', 'name');

    return res.json({
        totals: producto.length,
        results : producto
    })
    
}
const buscarProductosPorUsuarioID = async  ( req, res = response, termino = '' )=>{

    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const producto = await Producto.find({usuario : ObjectId(termino), estado:true}) //las dos expresiones se tiene que cumplir
                                                    .populate('usuario', 'name')
                                                    .populate('categoria', 'name');

        return res.json({
        totals: producto.length,
        results : producto
        })
    }else{
       return res.status(400).json({
            msg:`el id ${termino} que ingresaste no es valido`
        })
    }
}
const buscarProductosPorCategoriaID = async  ( req, res = response, termino = '' )=>{

    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const producto = await Producto.find({categoria : ObjectId(termino), estado:true}) //las dos expresiones se tiene que cumplir
                                                    .populate('usuario', 'name')
                                                    .populate('categoria', 'name')

        return res.json({
        totals: producto.length,
        results : producto
        })
    }else{
       return res.status(400).json({
            msg:`el id ${termino} que ingresaste no es valido`
        })
    }
}


const buscar = (req, res = response )=>{

    const { coleccion, termino } = req.params;
    
    if ( !coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(req, res, termino);
            break;
        case 'categorias':
            buscarCategorias(req, res, termino);
            break;
        case 'productos':
            buscarProductos(req, res, termino);
            break;
        case 'productosporusuarioid':
            buscarProductosPorUsuarioID(req, res, termino);
            break;
        case 'productosporcategoriaid':
            buscarProductosPorCategoriaID(req, res, termino);
            break;
        default:
            res.status(500).json({
                msg:'falto completar la coleccion de la busqueda'
            })
    }
    
};

module.exports = {
    buscar
}