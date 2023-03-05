const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isTrainer: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    seenNotifications:{
        type: Array,
        default: [],
    },
    unseenNotifications: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "approved",
    }
},{
    timestamps: true,
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;