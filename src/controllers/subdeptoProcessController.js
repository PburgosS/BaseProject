const subdeptoProcessModel = require('../models/subdeptoProcessModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('subdeptoProcessController');
logger.level = 'all';

const createSubdeptoProcess = async (req, res) => {
    const body = req.body;
    const subdeptoProcessData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdSubdeptoPrcess = new subdeptoProcessModel({
                subdeptoProcessName : body[i].subdeptoProcessName,
                subdeptoLink : body[i].subdeptoLink
            });
            subdeptoProcessData.push(createdSubdeptoPrcess);
        }
        await Promise.all(subdeptoProcessData.map(subdeptoProcess => subdeptoProcess.save()));
        res.status(200).send({msg : "Funcion de Subdepatamento creada y asignada correctamente"});
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).json(msg);
        }
    }
}
const viewAllProcessOfSubdepto = async (req, res) => {
    const { subdeptoLink } = req.body;
    const getSubDeptoFunction = await subdeptoProcessModel.find({subdeptoLink :subdeptoLink},'-__v -subdeptoLink');
    try {
        res.status(200).send(getSubDeptoFunction)
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).json(msg);
        }
    }
}
module.exports = {
    createSubdeptoProcess,
    viewAllProcessOfSubdepto
}