const communeModel = require('../models/communeModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('communeController.js');
logger.level = 'all';

const registerCommune = async (req, res) => {
    const body = req.body;
    const communeData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdCommune = new communeModel({
                communeName : body[i].communeName,
                communeLocode : body[i].communeLocode,
                regionLink : body[i].regionLink
            });
            communeData.push(createdCommune);
        }
        await Promise.all(communeData.map(commune => commune.save()));
        res.status(200).send({msg : "Comuna registrada correctamente"});
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
const getAllCommunesOfRegion = async (req, res) => {
    const { region } = req.body;
    try {
        const communesOfRegion = await communeModel.find({regionLink : region});
        res.status(200).send(communesOfRegion);
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
    registerCommune,
    getAllCommunesOfRegion
}