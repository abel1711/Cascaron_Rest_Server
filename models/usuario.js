const {Schema, model} = require ('mongoose');

const UsuarioSchema = Schema ({
    name:{
        type:String,
        required:[true, 'The name is required']
    },
    email:{
        type:String,
        required:[true, 'The email is required'],
        unique: true//para que no se ingresen correos duplicados
    },
    password:{
        type:String,
        required:[true, 'The password is required']
    },
    img:{
        type:String
    },
    public_id_cloudinary:{
        type:String
    },
    role:{
        type:String,
        required: true,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return  usuario;
}



module.exports= model ('Usuario', UsuarioSchema);