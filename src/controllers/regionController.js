const regionModel = require('../models/regionModel');
const Errors = require('../errors/errors');

const createRegion = async (req, res) => {
    const body = req.body;
    try {
        await regionModel.insertMany(body);
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