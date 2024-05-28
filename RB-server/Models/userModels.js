const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    password:{
    type:String,
    required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
   
    Profile:{
        type:String
    },
    // savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
})

const users=mongoose.model('users',userSchema)
module.exports=users