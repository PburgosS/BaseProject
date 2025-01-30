const actionModel = require('../models/actionModel');
const log4 = require('log4js');
const logger = log4.getLogger("actionController.js");
logger.level = "all";

const createAction = async (req, res) => {
    const { actionName, processLink } = req.body;
    try {
        const createdAction = new actionModel({
            actionName : actionName,
            processLink : processLink
        });
        await createdAction.save();
        res.status(200).send({msg : "Accion creada correctamente"});
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
const viewAllActions = async (req,res) => {
    try {
        const allActions = await actionModel.find();
        res.status(200).send(allActions);
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
const getAllActionsByProcess = async (req, res) => {
    const { processLink } = req.body;
    try {
        const actionByFunction = await actionModel.find({processLink : processLink});
        res.status(200).send(actionByFunction);
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
    createAction,
    viewAllActions,
    getAllActionsByProcess
}