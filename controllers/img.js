const { response } = require("express");
const {Usuario, Producto} = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const mostrarImagen = async (req, res = response)=>{
  
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
  
  
      if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
          return res.sendFile(pathImagen);
        }
      }
      const pathImagenFalta = path.join(__dirname,'../assets/no-image.jpg')
       res.sendFile(pathImagenFalta);



}
const mostrarImagenCloudinary = async (req, res = response)=>{
  
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
  
  
      if(modelo.img){
          const url = modelo.img;
          res.json({url});
      }
      const pathImagenFalta = path.join(__dirname,'../assets/no-image.jpg')
      res.sendFile(pathImagenFalta);



}


module.exports={
    mostrarImagen,
    mostrarImagenCloudinary
}