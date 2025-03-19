const viewsModel = require('../models/viewModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('viewsController.js');
logger.level = 'all';

const createViewData = async (req, res) => {
    const body = req.body;
    const viewData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdView = new viewsModel({
                viewName : body[i].viewName,
                frontPath : body[i].frontPath,
                viewPermisson : body[i].viewPermisson,
                actionLink : body[i].actionLink
            });
            viewData.push(createdView);
        }
        await Promise.all(viewData.map(view => view.save()));
        res.status(200).send({msg : "Datos de vista creados correctamente"});
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

const deleteViewData = async (req, res) => {
    const { viewCode } = req.body;
    try {
        await viewsModel.deleteOne({_id:viewCode});
        res.status(200).send({msg : "Datos de vista eliminados correctamente"});
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

const getAllDataViews = async (req, res) => {
    try {
        const allDataViews = await viewsModel.find();
        res.status(200).send({allDataViews});
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
    createViewData,
    deleteViewData,
    getAllDataViews,
}