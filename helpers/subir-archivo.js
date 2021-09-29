const {v4:uuidv4} = require('uuid');
const path = require('path');


const subirArchivo=(files, extensionesPermitidas = ['jpg','jpeg','gif','png'], carpeta = '')=>{

    return new Promise((resolve, reject )=>{
        
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];
    
        if(!extensionesPermitidas.includes(extension)){
          return reject(`la extension ${extension} no esta permitida, solo se admite: ${extensionesPermitidas}`);
        }
    
        nombreUuid = uuidv4()+'.'+extension;
        uploadPath = path.join(__dirname , '../uploads/', carpeta, nombreUuid);
        archivo.mv( uploadPath, (err) => {
          if (err) {
            return reject({err});
          }
            return resolve(nombreUuid);
        });
    });

};


module.exports={
    subirArchivo
};