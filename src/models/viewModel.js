const mongoose = require('mongoose');

const viewSchema = mongoose.Schema({
    viewName: {
        type: String,
        unique: true,
        require: true
    },
    frontPath:{
        type: String,
        unique: true,
        require: true
    },
    viewPermisson:{
        type: String,
        require: true,
    },
    actionLink : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'action'
    }
});

module.exports = mongoose.model("view", viewSchema);