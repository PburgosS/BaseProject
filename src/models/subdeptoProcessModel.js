const mongoose = require('mongoose');

const subdeptoProcessSchema = mongoose.Schema({
    subdeptoProcessName:{
        type: String,
        require: true
    },
    subdeptoLink:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'subdeptos'
    }
});
module.exports = mongoose.model('subdeptoProcess', subdeptoProcessSchema);