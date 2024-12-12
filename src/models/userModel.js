const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    secondname: String,
    lastname : String,
    secondSurname : String,
    email:{
        type: String,
        unique: true,
        require: true
    },
    username:{
        type: String,
        unique: true,
        require: true
    },
    role:{
        type: String,
        require : true
    },
    permisson: {
        code: String,
        namePermisson: String
    },
    active:{
        type: Boolean,
        default: false
    },
    password: String,
    costCenter : {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'costCenter'
    },
    subDepto : [{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'subDepto'
    }],
    userMenu : []
});

module.exports = mongoose.model("user", userSchema);