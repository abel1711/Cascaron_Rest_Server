const {Schema, model} = require('mongoose');


const ProductoSchema = Schema ({
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
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        require: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img:{
        type: String
    },
    public_id_cloudinary:{
        type:String
    }
});

ProductoSchema.methods.toJSON = function (){
    const { __v, estado, ...data} = this.toObject();
    return  data;
}


module.exports= model('Producto', ProductoSchema);