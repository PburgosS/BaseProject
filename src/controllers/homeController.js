const Errors = require('../errors/errors');
const getHome = async (req, res) =>{
    try {
        if(1 == 0){
            console.log('controller ERROR');
            throw new Errors(402,'falso es igual a falso')
        }
    } catch (error) {
        console.log('controller ERROR ENVIADO');
        if(error instanceof Errors){
            res.status(error.code).send(error.getMessage());
        }else{
            const msg = {
                'code' : 500,
                'message' : error.message
            }
            res.status(500).json(msg);
        }
    }
}

module.exports = {
    getHome
}