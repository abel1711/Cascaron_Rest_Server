const { response } = require("express");




const isADMIN_ROLE = ( req, res = response, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg:'Please validate before the JWT'
        })
    }

    const {role, name} = req.user;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name}: Not is an Administer`
        })
    }

    next();


}


const haveRole = ( ...rols )=>{
    return (req, res = response, next)=>{

        if(!req.user){
            return res.status(500).json({
                msg:'Please validate before the JWT'
            })
        }

        if( !rols.includes( req.user.role)){
            res.status(401).json({
                msg:`${req.user.name}: Not have one of this role:${rols}`
            })
        }

        next();

    }


}



module.exports={
    isADMIN_ROLE,
    haveRole
}