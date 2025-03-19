const regionModel = require('../models/regionModel');
const Errors = require('../errors/errors');

const createRegion = async (req, res) => {
    const body = req.body;
    const regionData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdRegion = new regionModel({
                regionName : body[i].regionName,
                regionISOCode : body[i].regionISOCode,
                countryLink : body[i].countryLink
            });
            regionData.push(createRegion);
        }
        await Promise.all(regionData.map(region => region.save()));
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