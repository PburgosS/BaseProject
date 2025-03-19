const actionModel = require('../models/actionModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger("actionController.js");
logger.level = "all";

const createAction = async (req, res) => {
    const body = req.body;
    const actionData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdAction = new actionModel({
                actionName : body[i].actionName,
                processLink : body[i].processLink
            });
            actionData.push(createdAction);
        }
        await Promise.all(actionData.map(action => action.save()));
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