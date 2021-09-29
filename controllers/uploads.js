const path = require ('path');
const fs = require ('fs');
const { response } = require("express");
const { Usuario, Producto} = require('../models');
const { subirArchivo } = require('../helpers');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivo = async (req, res = response)=>{
    
    try {
      //por defecto acepta imagenes sino debo enviarle en el 
      //segundo argumento las extension admitidas en un arreglo
      //y el tercer argumento es el nombre de la carpeta 
      // const archivo = await subirArchivo(req.files, ['txt','md'], txts);
      const archivo = await subirArchivo(req.files, undefined, 'imgs/');//envio el archivo y me crea la carpeta imgs
      res.json({archivo});
      
    } catch (msg) {
      res.status(400).json({msg});
    }

}

const actualizarImagen = async (req, res = response)=>{

  const { coleccion, id } = req.params;
  let modelo;

  switch (coleccion) {
    case 'user':
          modelo = await Usuario.findById(id);
          if(!modelo){
            return res.status(400).json({msg:`No existe un usuario con el id ${id}`});
          }
          break;
    case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
              return res.status(400).json({msg:`No existe un producto con el id ${id}`});
            }

            break;
  
    default:
             return res.status(500).json({msg:'Se me olvido manejar esta posibilidad'});
      break;
  }

  try {
    //este if pregunta si el modelo contiene imagen, si es asi la busca en el directorio
    //y si existe la elimina, esto porque si no lo hacemos asi se nos llenaria de imagenes la carpeta
    if(modelo.img){
      const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
      if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
      }
    }
    const archivo = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = archivo;
    await modelo.save();
  
    res.json(modelo)
    
  } catch (msg) {
     res.status(400).json({msg});
  }
}
const actualizarImagenCloudinary = async (req, res = response)=>{

  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case 'user':
          modelo = await Usuario.findById(id);
          if(!modelo){
            return res.status(400).json({msg:`No existe un usuario con el id ${id}`});
          }
          break;
    case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
              return res.status(400).json({msg:`No existe un producto con el id ${id}`});
            }

            break;
  
    default:
             return res.status(500).json({msg:'Se me olvido manejar esta posibilidad'});
      break;
  }

    if(modelo.public_id_cloudinary){
      cloudinary.uploader.destroy(modelo.public_id_cloudinary);
    }
    const {tempFilePath} = req.files.archivo;
    const name = new Date().getTime();
    const {secure_url, public_id} = await cloudinary.uploader.upload(tempFilePath, {public_id:`${coleccion}/${name}`});
    modelo.img = secure_url;
    modelo.public_id_cloudinary = public_id;
    await modelo.save();
  
    res.json(modelo);
    
}
module.exports={
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary
}