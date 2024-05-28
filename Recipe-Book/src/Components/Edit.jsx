import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap'
import { editRecipes } from '../Services/allApi';
import base_url from '../Services/server_url';
import { toast } from 'react-toastify';
import { editRecipeResponseContext } from '../Context Api/Contextapi';
import { useContext } from 'react';

function Edit({recipe}) {
    // console.log(recipe, "from edit")

    const {editRecipeResponse,setEditRecipeResponse}=useContext(editRecipeResponseContext)

    const [recipes,setRecipes]=useState({
        id:recipe._id,title:recipe.title,ingredients:recipe.ingredients,instructions:recipe.instructions,cookingTime:recipe.cookingTime,catagory:recipe.catagory,imageUrl:""
        })

        const [imgStatus,setImgStatus]=useState(false)
        const [preview,setPreview]=useState("")

        useEffect(()=>{
            if(recipes.imageUrl.type=="image/jpg" ||recipes.imageUrl.type=="image/jpeg" ||recipes.imageUrl.type=="image/png" ){
                setImgStatus(false)
                setPreview(URL.createObjectURL(recipes.imageUrl))
            }
            else{
                setImgStatus(true)
                setPreview("")
            }

        },[recipes.imageUrl])

         



        const handleUpdate=async()=>{
            console.log(recipes)
            const{title,ingredients,instructions,cookingTime,catagory}=recipes
            if(!title || !ingredients || !instructions || !cookingTime||!catagory ){
                toast.warning("enter valid input data in every feilds")
              }
              else{
                const formData=new FormData()
                formData.append("title",title)
                formData.append("ingredients",ingredients)
                formData.append("instructions",instructions)
                formData.append("cookingTime",cookingTime)
                formData.append("catagory",catagory)
                preview?formData.append("imageUrl",recipes.imageUrl):formData.append("imageUrl",recipe.imageUrl)
                
          
                const token=sessionStorage.getItem("token")
                if(preview){
                    
                const reqHeader={"Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
                  }
                  const result=await editRecipes(recipes.id,formData,reqHeader)
                  if(result.status==200){
                    toast.success(`recipe ${recipes.title} updated successfully`)
                    handleClose()
                    setEditRecipeResponse(result)
                  }
                  else{
                    toast.warning(result.response.data)
                  }
                }
                else{
                    
                const reqHeader={"Content-Type":"application/json",
                                 "Authorization":`Bearer ${token}`
                  }
                  const result=await editRecipes(recipes.id,formData,reqHeader)
                  if(result.status==200){
                    toast.success(`recipe ${recipes.title} updated successfully`)
                    handleClose()
                    setEditRecipeResponse(result)
                  }
                  else{
                    toast.warning(result.response.data)
                  }
                }
          
              }
        }

    const [show, setShow] = useState(false);
    
    const handleClose = () =>{
        setShow(false);
        setPreview("")
        setRecipes({
            id:recipe._id,title:recipe.title,ingredients:recipe.ingredients,instructions:recipe.instructions,cookingTime:recipe.cookingTime,catagory:recipe.catagory,imageUrl:""
        })
    } 
    const handleShow = () => setShow(true)
   

   
  
  return (
    <>  <button className='btn mt-3' onClick={handleShow}>
    <i className="fa-solid fa-pen-to-square fa-xl" style={{color: "#63E6BE",}} />
    </button>
<Modal
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
  <Modal.Title> Edit Recipe</Modal.Title>
</Modal.Header>
<Modal.Body>
<div>
<Row>
    <Col>
     <label>
        <input type="file" name='' onChange={(e)=>{setRecipes({...recipes,imageUrl:e.target.files[0]})}} />
        <img className='img-fluid' src={preview?preview:`${base_url}/uploads/${recipe.imageUrl}`} style={{height:'160px'}} alt=""/>
    </label>

        {
            imgStatus &&
            <p className='text-danger'>image extension invalid</p>
        }
    </Col>
    <Col>
    <div>
 
    <FloatingLabel controlId="titleinp" label="recipe name"className="mb-3">
        <Form.Control type="text" placeholder="recipe name"    value={recipes.title}  onChange={(e)=>{setRecipes({...recipes,title:e.target.value})}}/>
      </FloatingLabel>
      <FloatingLabel controlId="overvierinp"  label='ingredients' className="mb-3">
      <Form.Control type="text" placeholder="instruction"  value={recipes.ingredients} onChange={(e)=>{setRecipes({...recipes,ingredients:e.target.value})}} /> 
      </FloatingLabel>
      <FloatingLabel controlId="instructioninp" label="instructions" className="mb-3">
         <Form.Control type="text" placeholder="instructions" value={recipes.instructions}  onChange={(e)=>{setRecipes({...recipes,instructions:e.target.value})}} />
      </FloatingLabel>
      <FloatingLabel controlId="cookingtimeinp" label="cookingtime" className="mb-3">
        <Form.Control type="text" placeholder="cookingtime" value={recipes.cookingTime}  onChange={(e)=>{setRecipes({...recipes,cookingTime:e.target.value})}}/>
      </FloatingLabel>
      <FloatingLabel controlId="catagoryinp" label="catagory" className="mb-3">
        <Form.Control type="text" placeholder="catagory" value={recipes.catagory}  onChange={(e)=>{setRecipes({...recipes,catagory:e.target.value})}}/>
      </FloatingLabel>
    </div>
    </Col>
    
</Row>
</div>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleUpdate}>update</Button>
</Modal.Footer>


</Modal>
    
    </>
  )
}

export default Edit