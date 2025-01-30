const communeModel = require('../models/communeModel');
const Errors = require('../errors/errors');

const registerCommune = async (req, res) => {
    const { communeName, communeLocode, regionLink } = req.body;
    const registeredCommune = new communeModel({
        communeName : communeName,
        communeLocode : communeLocode,
        regionLink : regionLink
    });
    try {
        await registeredCommune.save();
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

module.exports = {
    registerCommune
}