const express = require('express');
const cors = require ('cors');
require('colors');
const { dbConnection } = require('../db/config');

class Server {

    constructor (){

        this.app  = express();
        this.port = process.env.PORT;

        //rutas
        this.paths = {
            auth : '/api/auth',//ruta autentificacion
            categorias : '/api/categorias',//rutas categorias
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
        //Lectura y Parseo del Body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routers(){
       
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.user, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Escuchando en el puerto: ${this.port}`.green);
        });
    }

}


module.exports = Server;