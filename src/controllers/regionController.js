const regionModel = require('../models/regionModel');
const Errors = require('../errors/errors');

const createRegion = async (req, res) => {
    const { regionName, regionISOCode, countryLink } = req.body;
    const createdRegion = new regionModel({
        regionName : regionName,
        regionISOCode : regionISOCode,
        countryLink : countryLink
    });
    try {
        await createdRegion.send();
        res.status(200).send({msg : "Region agregada correctamente"});
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
    createRegion
}