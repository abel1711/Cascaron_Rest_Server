const express = require('express');
const cors = require ('cors');
require('colors');
const { dbConnection } = require('../db/config');
const fileUpload =require('express-fileupload');
class Server {

    constructor (){

        this.app  = express();
        this.port = process.env.PORT;

        //rutas
        this.paths = {
            auth : '/api/auth',//ruta autentificacion
            buscar: '/api/buscar',//ruta para buscar
            categorias : '/api/categorias',//rutas categorias
            img : '/api/img',//rutas img
            productos : '/api/productos',// ruta de productos
            uploads : '/api/uploads',//subir archivos
            user : '/api/user'//Usuarios
        }
        
        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //llamar a las rutas de la app
        this.routers();

    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y Parseo del Body es para que express entienda los json
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        //uploads de archivos
        this.app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/', createParentPath : true}));
    }

    routers(){
       
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.img, require('../routes/img'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.user, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Escuchando en el puerto: ${this.port}`.green);
        });
    }

}


module.exports = Server;