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
    prepTime:{
        type:String,
        required:true
    },
    cookingTime:{
        type:String,
        required:true
    },
    totalCooktime:{
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
    },
    totalfat:{
        type:String,
        required:true,
    },
    sodium:{
        type:String,
        required:true,
    },
    dietaryfiber:{
        type:String,
        required:true,
    },
    protein:{
        type:String,
        required:true,
    },
    vitaminc:{
        type:String,
        required:true,
    },

    potassium:{
        type:String,
        required:true,
    },
        review:{
            type:mongoose.Types.ObjectId,
            ref:"reviews"

        }
    

})

const recipes=mongoose.model('recipes',recipeSchema)

module.exports=recipes