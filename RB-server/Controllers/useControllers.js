
// const recipes = require('../Models/recipeModels')
const users=require('../Models/userModels')

const jwt=require('jsonwebtoken')

exports.userRegister=async(req,res)=>{
    const {username,password,email,Profile}=req.body
    console.log(username,password,email,Profile)
    console.log("inside register function")
   try{
    const existingUser=  await users.findOne({email})
    // console.log(existingUser)
    if(existingUser){
        res.status(401).json("user already exist")
    }
    else{
        const newUser=new users({
            username,password,email,Profile:""
        })
         await newUser.save()
         res.status(201).json(newUser)
   }
    }
    catch(err){
        console.log(err)
        res.status(404).json(err)
    }
    // res.status(404).json("user registration successfull!!")
}

exports.userLogin=async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    console.log(req.body)
    try{
        const existingUser= await users.findOne({email,password})
        console.log(existingUser)
        if(existingUser){
          
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest= {token,username :existingUser.username,userDetails:existingUser}
           console.log(token)
            res.status(200).json(rest)
        }
        else{
            res.status(406).json("invalid username/password")
        }
    }
    catch(err){
        console.log(err)
        res.status(401).json(err)
    } 

}



exports.userUpdateProfile=async(req,res)=>{
    const userId=req.payload
    const {username,password,email,Profile}=req.body
    const ProfileImage=req.file ? req.file.filename:Profile

    try{
        const updateUser=await users.findByIdAndUpdate({_id:userId},{username,password,email,Profile:ProfileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        console.log(err)
        res.status(406).json(err)   
    }

}

  