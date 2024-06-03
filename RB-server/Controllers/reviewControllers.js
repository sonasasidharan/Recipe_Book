const reviews=require('../Models/reviewModels')
const recipes=require('../Models/recipeModels')


exports.createReview=async(req,res)=>{
    const {rid}=req.params
    console.log(req.params)
    const {recipe_Id,reviewComment,ratings}=req.body
    try{
        const newReview=new reviews({...req.body,recipe_Id:rid})
        console.log(req.body)
        await newReview.save()
        // after creating a new review we now update the reviews arry of the recipes
        await recipes.findByIdAndUpdate(rid,{
            $push:{review:newReview._id}
        },{new:true})
        res.status(200).json(newReview)
        console.log(req.body)
    }catch(err){
        res.status(400).json(err)
        console.log(err)
    }
}


exports.getRecipeReview=async(req,res)=>{
    const {rid}=req.params


    try{
        const result=await reviews.find({recipe_Id:rid})
        console.log(result)
       
        if(result){
            res.status(200).json(result) 
        }
        else{
            res.status(401).json("no reviews available")
        }
    }catch(err){
        console.log(err)
        res.status(406).json(err)
    }
}

