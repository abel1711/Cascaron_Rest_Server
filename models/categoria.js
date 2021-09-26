const {Schema, model} = require('mongoose');


const CategoriaSchema = Schema ({
    name:{
        type:String,
        require:[true, 'El nombre de la categoria es requerido'],
        unique:true
    },
    estado:{
        type: Boolean,
        require: true,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

CategoriaSchema.methods.toJSON = function (){
    const { __v, estado, ...data} = this.toObject();
    return  data;
}


module.exports= model('Categoria', CategoriaSchema);