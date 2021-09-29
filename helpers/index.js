const cabecero     = require('./cabecero');
const dbvalidators = require('./db-validators');
const generatorJwt = require('./generator-jwt');
const googleVerifi = require('./google-verifi');
const subirArchivo = require('./subir-archivo');


module.exports={
    ...cabecero,
    ...dbvalidators,
    ...generatorJwt,
    ...googleVerifi,
    ...subirArchivo,
}