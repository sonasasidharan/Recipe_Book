import React, { useContext, useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addRecipes } from '../Services/allApi';
import { addRecipeResponseContext } from '../Context Api/Contextapi';

function Add() {
  const {addRecipeResponse,setAddRecipeResponse}=useContext(addRecipeResponseContext)
  const [show, setShow] = useState(false);
  const[imageStatus,setImageStatus]=useState(false)
  const [preview,setPreview]=useState("")

   const [recipes,setRecipes]=useState({
    title:"",ingredients:"",instructions:"",imageUrl:"",cookingTime:"",catagory:"",userId:""
    });

    // console.log(recipes)


  

  useEffect(()=>{
    // console.log(recipes)
    if(recipes.imageUrl.type == "image/jpg" || recipes.imageUrl.type == "image/jpeg" || recipes.imageUrl.type == "image/png"){
      // console.log("image is correct format")
      setPreview(URL.createObjectURL(recipes.imageUrl))
      setImageStatus(false)
    }
    else{
      console.log("invalid file format ,image should be png/jpeg/jpg")
      setImageStatus(true)
      setPreview("")
    }
  },[recipes.imageUrl])

  const handleAddRecipe=async()=>{
    const {title,ingredients,instructions,cookingTime,catagory,imageUrl}=recipes
    if(!title || !ingredients || !instructions || !cookingTime ||!catagory || !imageUrl ){
      toast.warning("enter valid input data in every feilds")
    }
    else{
      
      // const formData=new FormData()
      const formData=new FormData()
      formData.append("title",title)
      formData.append("ingredients",ingredients)
      formData.append("instructions",instructions)
      formData.append("cookingTime",cookingTime)
      formData.append("catagory",catagory)
      formData.append("imageUrl",imageUrl)
      // formData.append("userId",userId)

      const token=sessionStorage.getItem("token")

      const reqHeader={"Content-Type":"multipart/form-data",
                        "Authorization":`Bearer ${token}`
      }
      const result=await addRecipes(formData,reqHeader)
      if(result.status==200){
        toast.success("recipe added successfully")
        setRecipes({
          title:"",ingredients:"",instructions:"",cookingTime:"",catagory:"",imageUrl:""
        })
        handleClose()
        setAddRecipeResponse(result)
      } 
      else{
        toast.error(result.response.data)
      }           
      
    }
  }
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)


  return (
    <>
    <Link className='btn' onClick={handleShow}> <i className="fa-solid fa-plus" style={{color: "#FFD43B"}}>  Add Recipes </i></Link>
   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add recipies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div>
      
            <label >
                <input type="file"  name='image'   onChange={(e)=>{setRecipes({...recipes,imageUrl:e.target.files[0]})}}/>
                  <img src={preview?preview:"https://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png"} alt="" className='img-fluid' style={{width:'300px',marginLeft:'70px'}} />
            </label>
            {
              imageStatus&&
              <p className='text-danger'>invalid file format image sould beb png/jpeg/jpg</p>
            }
       

       <FloatingLabel controlId="titleinp" label="recipe name"className="mb-3">
        <Form.Control type="text" placeholder="recipe name"   onChange={e=>setRecipes({...recipes,title:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="overvierinp"  label='ingredients' className="mb-3">
      <Form.Control type="text" placeholder="instruction" onChange={e=>setRecipes({...recipes,ingredients:e.target.value})} /> 
      </FloatingLabel>
      <FloatingLabel controlId="instructioninp" label="instructions" className="mb-3">
         <Form.Control type="text" placeholder="instructions" onChange={e=>setRecipes({...recipes,instructions:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="cookingtimeinp" label="cookingtime" className="mb-3">
        <Form.Control type="text" placeholder="cookingtime"  onChange={e=>setRecipes({...recipes,cookingTime:e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="catagoryinp" label="catagory" className="mb-3">
        <Form.Control type="text" placeholder="catagory"  onChange={e=>setRecipes({...recipes,catagory:e.target.value})} />
      </FloatingLabel>
           
           
       </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleAddRecipe}>Add Recipe</Button>
        </Modal.Footer>
        

      </Modal>

    </>
  )
}

export default Add