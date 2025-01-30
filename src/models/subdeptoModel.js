const mongoose = require('mongoose');

const subdeptoSchema = mongoose.Schema({
    subdeptoName:{
        type: String,
        unique: true,
        require: true
    },
    deptoLink:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'deptos'
    }
});
module.exports = mongoose.model('subdepto', subdeptoSchema);
