const deptosModel = require('../models/deptosModel');
const Errors = require('../errors/errors');

const createDepto = (req, res) =>{
    const { deptoCode, deptoName, deptoNom } = req.body;
    const createdDepto = new deptosModel({
        deptoCode : deptoCode,
        deptoName : deptoName,
        deptoNom : deptoNom.toUpperCase()
    });
    try {
        createdDepto.save();
        res.status(200).send(createdDepto);
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

const getAllDeptos = async (req, res) =>{
    try {
        const allCostCenters = await deptosModel.find();
        res.status(200).send(allCostCenters);
    } catch (error) {
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }
        else{
            const msg = {
                'code' : 404,
                'message' : error.message
            }
            res.status(404).json(msg);
        }
    }
}

module.exports = {
    createDepto,
    getAllDeptos
}