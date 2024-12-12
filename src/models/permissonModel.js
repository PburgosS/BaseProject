const mongoose = require('mongoose');

const permissonSchema = mongoose.Schema({
    permissonCode: {
        type: String,
        require: true,
        unique:true
    },
    permissonName: {
        type: String,
        require: true,
        unique: true
    },
    postName : {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model("permison", permissonSchema);