const deptosModel = require('../models/deptosModel');
const Errors = require('../errors/errors');

const createDepto = async (req, res) =>{
    const body = req.body;
    const deptosData = [];
    try {
        for(let i = 0; i < body.length; i++){
            let createdDepto = new deptosModel({
                deptoCode : body[i].deptoCode,
                deptoName : body[i].deptoName,
                deptoNom :body[i].deptoNom
            });
            deptosData.push(createdDepto);
        }
        await Promise.all(deptosData.map(depto => depto.save()));
        res.status(200).send({msg : 'Departamento creado correctamente'});
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