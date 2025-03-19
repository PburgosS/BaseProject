const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const permissonModel = require('../models/permissonModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('userController.js');
logger.level = 'all';

const resgisterUser = async (req, res) =>{
    const body = req.body;
    const userData = [];
    const salt = bcrypt.genSaltSync(10);
    try {
        for(let i = 0; i < body.length; i++){
            const hashPassword = bcrypt.hashSync(body[i].password, salt);
            const permissonFind = await permissonModel.findOne({permissonName : body[i].permissonName});
            let createdUser = new userModel({
                firstname : body[i].firstname,
                secondname : body[i].secondname,
                lastname : body[i].lastname,
                secondSurname : body[i].secondSurname,
                email : body[i].email.toLowerCase(),
                username : body[i].username.toLowerCase(),
                permisson : permissonFind,
                password : hashPassword,
                depto : body[i].depto,
                subdepto : body[i].subDepto,
                userMenu : []
            });
            userData.push(createdUser);
        }
        await Promise.all(userData.map(user => user.save()));
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