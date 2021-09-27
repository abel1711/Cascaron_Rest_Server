require('dotenv').config();

const { cabecero } = require('./helpers/cabecero');
const Server = require('./models/server');


cabecero();



const server = new Server();

server.listen();

 
