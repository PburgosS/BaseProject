const mongoose = require('mongoose');
const requestSchema = mongoose.Schema({
    requestor : {
        type: String,
        require: true
    },
    requestItems : [{
        item: String,
        quantity: Number 
    }],
    requestDate : {
        type: String,
        require: true
    },
    requestVia : {
        type: String,
        require: true
    },
    requestStatus: {
        statusName: String,
        requestStatusDate: String
    },
    previousRequestStatus : [{
        prevStatusName: String,
        prevRequestStatusDate: String
    }],
    finalUser: {
        finalUserName: String,
        finalUserDepto: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'deptos'
        },
        finalUserDeptoCode: {
            type : String,
            require : true
        },
        finalUserSubDepto : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'subdepto'
        }
    },
    requestID : {
        type : String,
        require : true,
        unique : true
    },
    requestorID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
});

module.exports = mongoose.model("request", requestSchema);