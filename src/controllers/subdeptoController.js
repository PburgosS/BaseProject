const subdeptoModel = require('../models/subdeptoModel');
const Errors = require('../errors/errors');

const createSubdepto = async (req, res) => {
    const body = req.body;
    let subdeptoData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdSubdepto = new subdeptoModel({
                subdeptoName : body[i].subdeptoName,
                deptoLink : body[i].deptoLink
            });
            subdeptoData.push(createdSubdepto);
        }
        await Promise.all(subdeptoData.map(subdepto => subdepto.save()));
        res.status(200).send({msg : "subdepartamento creado correctamente"});
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
const viewAllSubdeptosOfDepto = async (req, res) => {
    const { costCenterLink } = req.body;
    const getSubDeptos = await subdeptoModel.find({deptoLink: costCenterLink}, '-__v -deptoLink');
    try {
        res.status(200).send(getSubDeptos);
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
    createSubdepto,
    viewAllSubdeptosOfDepto
}