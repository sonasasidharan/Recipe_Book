import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Edit from '../Components/Edit'
import { deleteRecipes, userRecipes } from '../Services/allApi'
import { addRecipeResponseContext } from '../Context Api/Contextapi'
import { editRecipeResponseContext } from '../Context Api/Contextapi'
import { useContext } from 'react'
import { toast } from 'react-toastify'



function Yoursrecipes() {
    const {addRecipeResponse,setAddRecipeResponse}=useContext(addRecipeResponseContext)
    const {editRecipeResponse,setEditRecipeResponse}=useContext(editRecipeResponseContext)

    const [user,setUser]=useState("")
    const [yourRecipe,setYourRecipe]=useState([])

    useEffect(()=>{
        setUser(sessionStorage.getItem("username"))
        getData()
    },[addRecipeResponse,editRecipeResponse])
    // console.log(yourRecipe)


    const getData=async()=>{
        const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
        const result=await userRecipes(header)
        // console.log(result)
        if(result.status==200){
            setYourRecipe(result.data)
        }
        else{
            console.log(result.response.data)
        }
    }

    const handleDelete=async(id)=>{
      const token=(sessionStorage.getItem('token'))
      console.log(id)
      const header={
        "Content-Type":"application/json",
         "Authorization":`Bearer ${token}`
      }
      const result=await deleteRecipes(id,header)
        if(result.status==200){
          console.log(result)
          toast.success("recipe deleted successfully")
          getData()
        }
        else{
          console.log(result)
          toast.error(res.response.data)
        }
      
    }


  return (
   <>
        <div >
   <Row>
      <Col sm={12} md={6} className='p-3'>
      <h3> your recipes</h3>
      <div className='border border-3 p-3'>
        {
            yourRecipe.length>0?
            yourRecipe.map(item=>(
                <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
                <h4>{item.title}</h4>
                <div>
                  {/* <a href="" className='btn mt-3'>
                  <i class="fa-solid fa-pen-to-square fa-xl" style={{color: "#63E6BE",}} />
                  </a> */}
                  <Edit recipe={item}/>
                 
                  <button className='btn mt-3'  onClick={()=>{handleDelete(item?._id)  }}>
                  <i class="fa-solid fa-trash fa-xl" style={{color: "#63E6BE",}} />
                  </button>
                </div>
              </div>
            ))
            :
            <h3 className='text-center '>no  recipies are added</h3>
        }
      </div>
      </Col>
      <Col sm={8} md={6}>
        
      </Col>
  </Row> 
      <div className='text-center' style={{fontSize:'30px',textDecoration:"none"}}>
      <Link to={'/prof'} style={{textDecoration:"none"}}>
      <i class="fa-solid fa-forward fa-beat" style={{color: "#FFD43B",}} />
      {" "}
        BACK</Link>
      </div>   
   </div>
  
   </>
  )
}

export default Yoursrecipes