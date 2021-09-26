const mongoose = require ('mongoose');
require('colors');

const dbConnection = async ()=>{
    
    try {

        await mongoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de Datos Online!'.green);
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo iniciar la Base de Datos'.red);
    }
}


module.exports={
    dbConnection
}