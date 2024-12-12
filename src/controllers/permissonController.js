const permissonModel = require('../models/permissonModel');
const Errors = require('../errors/errors');

const createPermisson = (req, res) => {
    const { permissonCode, permissonName, postName } = req.body;
    const addPermisson = new permissonModel({
        permissonCode: permissonCode,
        permissonName: permissonName,
        postName: postName
    });
    try {
        addPermisson.save();
        res.status(200).send({msg : "Permiso creado correctamente"});
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).send(msg);
        }
    }
}

const getAllPermissons = async (req, res) => {
    try {
        const allPermissons = await permissonModel.find();
        res.status(200).send(allPermissons);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 404,
                'message' : error.message
            }
            res.status(404).send(msg);
        }
    }
}

module.exports = {
    createPermisson,
    getAllPermissons
}