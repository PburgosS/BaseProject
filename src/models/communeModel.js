const mongoose = require('mongoose');

const communeSchema = mongoose.Schema({
    communeName : {
        type: String,
        require : true,
        unique: true
    },
    communeLocode : {
        type: String,
        require : true,
        unique : true
    },
    regionLink : {
        type :  mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'regions'
    }
});

module.exports = mongoose.model('communes', communeSchema);