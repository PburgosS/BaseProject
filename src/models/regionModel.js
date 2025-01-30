const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
    regionName : {
        type: String,
        unique : true,
        require : true
    },
    regionISOCode : {
        type : String,
        unique : true,
        require : true
    },
    countryLink : {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'countries'
    }
});

module.exports = mongoose.model('regions', regionSchema);