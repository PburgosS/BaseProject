const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const log4 = require('log4js');
const logger = log4.getLogger('index.js');
logger.level = "all";
mongoose.set('strictQuery',false);
const app = require('./app');

let APPORT = undefined;
let URI = undefined;
let nodeenv = process.env.NODE_ENV;
switch (nodeenv) {
    case 'production':
        APPORT = 3030;
        URI = `mongodb+srv://Prd_${process.env.DB_USER}:p${process.env.DB_PASS}${process.env.DB_HOST}prd_${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Adquisiciones`;
        break;
    case 'testing':
        APPORT = 3040;
        URI = `mongodb+srv://Tst_${process.env.DB_USER}:t${process.env.DB_PASS}${process.env.DB_HOST}tst_${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Adquisiciones`;
        break;
    case 'development':
        APPORT = 3050;
        URI = `mongodb+srv://Dev_${process.env.DB_USER}:d${process.env.DB_PASS}${process.env.DB_HOST}dev_${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Adquisiciones`;
        break;
}

(async () => {
try {
    await mongoose.connect(URI);
    logger.info('OK CONEXION');
    await app.listen(APPORT,() =>{
        logger.debug('DB ACCESS SUCCESS');
        logger.debug(`SERVER IS RUNING IN http://${process.env.IP_SERV}:${APPORT}/${process.env.API_VER}`)
    })
} catch (error) {
    logger.fatal(error);
}
})();