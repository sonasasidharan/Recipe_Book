const recipes=require('../Models/recipeModels')
const mongoose=require('mongoose')
// const users = require('../Models/userModels')


// add recipe
exports.addRecipe=async(req,res)=>{
    const userId=req.payload
    const {title, ingredients, instructions, imageUrl,cookingTime,catagory,prepTime,totalCooktime,totalfat,sodium,dietaryfiber,protein,vitaminc,potassium}=req.body
   const img=req.file.filename
   console.log(title, ingredients, instructions,img,cookingTime,catagory,prepTime,totalCooktime,totalfat,sodium,dietaryfiber,protein,vitaminc,potassium,userId)
   try{
    const existingRecipe= await recipes.findOne({title})
    if(existingRecipe){
     res.status(406).json("recipe already added")
    }
    else{
 const newRecipe= new recipes({
     title, ingredients, instructions,imageUrl:img,cookingTime,catagory,prepTime,totalCooktime,totalfat,sodium,dietaryfiber,protein,vitaminc,potassium,userId
 })
     await newRecipe.save()
     res.status(200).json(newRecipe)
    }
   }catch(err){
      console.log(err)  
    res.status(401).json(err)
   }
  
}


exports.homeRecipes=async(req,res)=>{
   try{
    const result=await recipes.find().limit(3)
    if(result){
        res.status(200).json(result)
    }
    else{
        res.status(401).json("No recipes available...")
    }
   }
   catch(err){
    console.log(err)
    res.status(406).json(err)
   }
}


exports.allRecipes=async(req,res)=>{
    console.log("inside all recipe")
    const search=req.query.search
    console.log(search)
    try{
        const query={
            title:{$regex:search,$options:'i'}
        }
        const result=await recipes.find(query)
        // console.log(result)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("No recipes available")
        }
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}
exports.userRecipes=async(req,res)=>{
    try{
        const userId=req.payload
        const result=await recipes.find({userId})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("No recipes available")
        }
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}

exports.editRecipe=async(req,res)=>{
    // console.log("inside edit recipe")
    const {title, ingredients, instructions, imageUrl,cookingTime,catagory,prepTime,totalCooktime,totalfat,sodium,dietaryfiber,protein,vitaminc,potassium}=req.body
    const userId=req.payload
    const RecipeImage =req.file ? req.file.filename:imageUrl
    const {rid}=req.params 
    try{
        const updateRecipe=await recipes.findByIdAndUpdate({_id:rid},
        {title,ingredients,instructions,cookingTime,imageUrl:RecipeImage,catagory,prepTime,totalCooktime,totalfat,sodium,dietaryfiber,protein,vitaminc,potassium,userId},{new:true})
        await updateRecipe.save
        res.status(200).json(updateRecipe)
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}


 exports.deleteRecipe=async(req,res)=>{
    console.log("inside delete recipe")
    const {rid}=req.params
 try{
    const result=await recipes.findByIdAndDelete({_id:rid})
    res.status(200).json(result)

 }
 catch(err){
    console.log(err)
    res.status(406).json(err)
 }

 }


 exports.singleRecipe=async(req,res)=>{
    const {rid}=req.params
    try{
        const result=await recipes.findById({_id:rid})
            if(result){
            res.status(200).json(result)
            }
            else{
                res.status(401).json("no recipe available")
            }
        
    }catch(err) {
        console.log(err)
        res.status(406).json(err)
    }

 }








 



 






