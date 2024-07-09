const express=require('express')
const userController=require('../Controllers/useControllers')
const router=express.Router()
const recipeController=require('../Controllers/recipeControllers')
const jwtmiddle=require('../Middlewares/jwtMiddleware')
const multerconfig=require('../Middlewares/multerMiddleware')
const reviewControllers=require('../Controllers/reviewControllers')
const saveControllers=require('../Controllers/saveControllers')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

router.post('/add',jwtmiddle,multerconfig.single('imageUrl'),recipeController.addRecipe)
router.get('/home-recipes',recipeController.homeRecipes)
router.get('/all-recipes',jwtmiddle,recipeController.allRecipes)
router.get('/user-recipes',jwtmiddle,recipeController.userRecipes)

router.put('/edit-recipes/:rid',jwtmiddle,multerconfig.single('imageUrl'),recipeController.editRecipe)

router.delete('/delete-recipes/:rid',jwtmiddle,recipeController.deleteRecipe)

router.put('/update-profile',jwtmiddle,multerconfig.single('Profile'),userController.userUpdateProfile)

router.post('/create-review/:rid',jwtmiddle,reviewControllers.createReview)
router.get('/getReview/:rid',jwtmiddle,reviewControllers.getRecipeReview)

router.get('/single-recipes/:rid',jwtmiddle,recipeController.singleRecipe)

router.post('/save-recipes',jwtmiddle,saveControllers.saveRecipe)
router.get('/saved',jwtmiddle,saveControllers.getSavedRecipes)



module.exports=router
