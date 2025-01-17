const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const permissonModel = require('../models/permissonModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('userController.js');
logger.level = 'all';

const resgisterUser = async (req, res) =>{
    const { firstname, secondname, lastname, secondSurname, email, username, permissonName,  password, depto, subDepto } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const permissonFind = await permissonModel.findOne({permissonName : permissonName});
    const createdUser = new userModel({
        firstname : firstname,
        secondname : secondname,
        lastname : lastname,
        secondSurname : secondSurname,
        email : email.toLowerCase(),
        username : username.toLowerCase(),
        permisson : permissonFind,
        password : hashPassword,
        depto : depto,
        subdepto : subDepto,
        userMenu : []
    });
    try {
        await createdUser.save();
        res.status(200).send(createdUser);
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

const setUserMenu = async (req, res) => {
    const { id, viewID } = req.body;
    try {
        const userFilter = { _id : id };
        let menuToPush = viewID;
        let updateMenu = {
            $push : {
                userMenu : { $each : menuToPush },
            },
        };
        await userModel.updateOne(userFilter, updateMenu);
        res.status(200).send({msg : "Menú Asignado Correctamente"});
    } catch (error) {
        logger.error(error.message);
        res.status(504).send({msg : "Error al Asignar el menú"});
    }
}

const changeUserStatus = async (req, res) => {
    const { id } = req.body;
    const findedUser = await userModel.findById(id);
    const actualStatus = findedUser.active;
    try {
        if(actualStatus == true){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Inactivo"});
        }else if(actualStatus == false){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Activo"});
        }
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
module.exports = {
    resgisterUser,
    setUserMenu,
    changeUserStatus
}