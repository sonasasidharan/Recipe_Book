const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    Profile: {
        type: String
    },
    savedRecipes: [{ type: Object, 
        ref: 'recipes'
     }],
})

const users = mongoose.model('users', userSchema)
module.exports = users