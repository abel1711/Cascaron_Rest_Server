const { Categoria, Producto } = require('../models');
const Role = require ('../models/role');
const Usuario = require ('../models/usuario');



const roleValidationDb = async (role = '')=>{
        const existsRole = await Role.findOne({role});
        if (!existsRole){
          throw new Error(`This role ${role}, not exists in the DataBase`)
        }
}

const existsEmailDb = async ( email )=>{
  
  const existeEmail = await Usuario.findOne({email});
  if(existeEmail){
      throw new Error(`This email ${email} already exists in Data Base`);
  }
}

const existsUserByIdDb = async ( id )=>{
  
  const existeUser = await Usuario.findById(id);
  if(!existeUser){
      throw new Error(`Not exists user whit id: ${id}`);
  }
}

const existeCategoriaById = async ( id ) =>{

  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
    throw new Error(`Not exists category whit id: ${id}`);
    
  }
  if(!existeCategoria.estado){
    throw new Error(`Not exists category whit id: ${id}--estado:false`);
  }
}
const existeProductoDB = async ( name ) =>{

  const existeProducto = await Producto.findOne({name});
  if(existeProducto){
    throw new Error(`ya existe un producto con este nombre: ${name}`);
    
  }
}

const existeProductoById = async ( id ) =>{

  const existeProducto = await Producto.findById(id);
  if(!existeProducto){
    throw new Error(`no existe un producto con ese id: ${id}`);
    
  }
}

const esColeccionPermitida = (coleccion , colecciones = [])=>{

    const esColeccionCorrecta = colecciones.includes(coleccion);
    if(!esColeccionCorrecta){
      throw new Error(`La colección ${coleccion} no esta permitida: solo las siguientes:${colecciones}`);
    }
    return true;
}

module.exports={
  roleValidationDb,
  existsEmailDb,
  existsUserByIdDb,
  existeCategoriaById,
  existeProductoDB,
  existeProductoById,
  esColeccionPermitida
}