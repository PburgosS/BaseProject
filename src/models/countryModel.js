const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    countryName:{
        type: String,
        unique: true,
        require: true
    },
    countryIataCode : {
        type: String,
        unique : true,
        require : true
    }
});

module.exports = mongoose.model("country", countrySchema);