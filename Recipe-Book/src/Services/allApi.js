import { commonApi } from "./commonApi"
import base_url from "./server_url"


// register
 export const useRegister=async(data)=>{
        return await commonApi("POST",`${base_url}/register`,data,"")
}


// login

export const useLogin=async(data)=>{
        return await commonApi("POST",`${base_url}/login`,data,"")
}

// Add
export const addRecipes=async(data,header)=>{
        return await commonApi("POST",`${base_url}/add`,data,header)
}

//home recipe
export const homeRecipes=async()=>{
        return await commonApi("GET",`${base_url}/home-recipes`,"","")
}

// all recipes
export const allRecipes=async(header,search)=>{
        return await commonApi("GET",`${base_url}/all-recipes?search=${search}`,"",header)
}

// user recipes
export const userRecipes=async(header)=>{
        return await commonApi("GET",`${base_url}/user-recipes`,"",header)
}

// edit
export const editRecipes=async(id,data,header)=>{
        return await commonApi("PUT",`${base_url}/edit-recipes/${id}`,data,header)
}
// delete
export const deleteRecipes=async(id,header)=>{
        return await commonApi("DELETE",`${base_url}/delete-recipes/${id}`,{},header)
}

// update profile
export const updateProfile=async(header,data)=>{
        return await commonApi('PUT',`${base_url}/update-profile`,data,header)
}

// // saveRecipe
// export const saveRecipe=async(id,header)=>{
//         return await commonApi('POST',`${base_url}/saved-recipes/${id}`,"",header)
// }

// // getsavedrecipe
// export const getsavedrecipe=async(data,header)=>{
//         return await commonApi('GET',`${base_url}/getsaved-recipes`,data,header)
// }


 

