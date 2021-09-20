const {response} = require ('express');


const userGet = (req, res = response) => {
    const {name, lastname, page = "1"} = req.query;
    res.json({
        msg:'Get API-Controllers',
        name,
        lastname,
        page
    });
}
const userPost = (req, res = response) => {
    const {name, lastname} = req.body;
    res.json({
        msg:'Post API-Controllers',
        name,
        lastname
    });
}
const userPut = (req, res = response) => {
    const {id}= req.params;
    const {name, lastname} = req.body;

    res.json({
        msg:'Put API-Controllers',
        id, name, lastname
    });
}
const userPatch = (req, res = response) => {
    res.json({
        msg:'Patch API-Controllers'
    });
}
const userDelete = (req, res = response) => {
    res.json({
        msg:'Delete API-Controllers'
    });
}


module.exports={
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}