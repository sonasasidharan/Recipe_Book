const mongoose=require('mongoose')

const recipeSchema=new  mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    ingredients:{
        type:String,
        required:true
    },

    instructions:{
        type:String,
        required:true
       
    },

    imageUrl:{
        type:String,
        required:true
    },

    cookingTime:{
        type:String,
        required:true
    },

    catagory:{
        type:String,
        required:true
        
    },
    userId:{
        type:String,
        required:true,
    }

})

const recipes=mongoose.model('recipes',recipeSchema)

module.exports=recipes