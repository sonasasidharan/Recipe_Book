
const recipes=require('../Models/recipeModels')
const users=require('../Models/userModels')


exports.saveRecipe=async(req,res)=>{
    try{
    const recipe=await recipes.findById({_id:req.body.rid})
    const user=await users.findById({_id:req.payload})
    if (!recipe) {
         res.status(404).json( "Recipe not found" )
    }
    if (!user) {
     res.status(404).json( "User not found" )
    }
    // Ensure savedRecipes is an array
    if (!Array.isArray(user.savedRecipes)) {
        user.savedRecipes = []  
    }
    const isRecipeAlreadySaved = user.savedRecipes.some(savedRecipe => savedRecipe.equals(recipe._id))

    if (isRecipeAlreadySaved) {
        return res.status(400).json( "Recipe already saved" )
    }
    user.savedRecipes.push(recipe)
    await user.save()
    res.status(200).json( "Recipe saved successfully" )
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}

exports.getSavedRecipes = async (req, res) => {
    try {
        const user = await users.findById(req.params.userId)
        if (!user) {
            return res.status(404).json( "User not found")
        }
        // const savedRecipes = await recipes.find({})
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json( "Could not find saved recipes")
    }
}


