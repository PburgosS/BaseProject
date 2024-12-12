const countryModel = require('../models/countryModel');
const Errors = require('../errors/errors');

const createCountry = async (req, res) => {
    const { countryName, countryIataCode } = req.body;
    const createdCountry = new countryModel({
        countryName: countryName,
        countryIataCode : countryIataCode
    });
    try {
        await createdCountry.save();
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