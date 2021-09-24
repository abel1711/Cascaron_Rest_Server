const express = require('express');
const cors = require ('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor (){

        this.app  = express();
        this.port = process.env.PORT;
        //Usuarios
        this.usuariosPath = '/api/user';
        //Conectar a la base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //rutas de la app
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
       
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`escuchando en el puerto: ${this.port}`);
        });
    }

}


module.exports = Server;