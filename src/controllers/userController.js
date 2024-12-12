const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('userController.js');
logger.level = 'all';

const resgisterUser = async (req, res) =>{
    const { firstname, secondname, lastname, secondSurname, email, username, role, permissonName,  password, costCenter, subDepto } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const permissonFind = await permissonModel.findOne({namePermisson : permissonName});
    const newUser = new userModel({
        firstname : firstname,
        secondname : secondname,
        lastname : lastname,
        secondSurname : secondSurname,
        email : email.toLowerCase(),
        username : username.toLowerCase(),
        role : role,
        permisson : permissonFind,
        password : hashPassword,
        costCenter : costCenter,
        subDepto : subDepto,
        userMenu : []
    });
    try {
        await newUser.save();
        res.status(200).send(newUser);
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
    resgisterUser
}