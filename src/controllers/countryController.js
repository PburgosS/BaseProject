const countryModel = require('../models/countryModel');
const Errors = require('../errors/errors');
const log4 = require('log4js');
const logger = log4.getLogger('countryController.js');
logger.level = 'all';

const createCountry = async (req, res) => {
    const body = req.body;
    const countryData = [];
    try {
        for(let  i = 0; i < body.length; i++){
            let createdCountry = new countryModel({
                countryName : body[i].countryName,
                countryIataCode : body[i].countryIataCode,
            });
            countryData.push(createdCountry);
        }
        await Promise.all(countryData.map(country => country.save()));
        res.status(200).send({msg : "Pais Agregado correctamente"});
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
    createCountry
}