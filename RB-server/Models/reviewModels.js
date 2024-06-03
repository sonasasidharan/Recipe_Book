const mongoose=require('mongoose')
const recipes = require('./recipeModels')

const reviewSchema=new mongoose.Schema(
    {
       recipe_Id:{
        type:mongoose.Types.ObjectId,
        ref:"recipes"
       } ,
       username: {
        type: String,
        required: true
    },
    reviewComment:{
        type:String,
        required: true
        
    },
    ratings:{
        type:Number,
        required:true,
        min:0,
        max:5,
        default:0,
    },
    },
    {timestamps:true}
)

const reviews=mongoose.model('reviews',reviewSchema)
module.exports=reviews