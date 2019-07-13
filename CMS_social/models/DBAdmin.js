const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DBAdminSchema  = new Schema({

    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        max:255,
        min:6
    },
    password: {
        type: String,
        required: true,
        max:30
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

const DBAdmin = mongoose.model('DBAdmin',DBAdminSchema);

module.exports = DBAdmin;