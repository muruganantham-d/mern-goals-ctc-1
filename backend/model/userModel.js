const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'please add the name'],
        },
        email:{
            type: String,
            required: [true,'please add the email'],
            unique: true
        },
        password:{
            type: String,
            required: [true,'please add the password'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('users', userSchema);