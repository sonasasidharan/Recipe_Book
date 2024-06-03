import React, { useEffect, useState } from 'react'
 import Recipelist from '../Components/Recipelist'
 import { Row,Col } from 'react-bootstrap'
 import { allRecipes } from '../Services/allApi'
import { Link } from 'react-router-dom'

function Dashboard() {


  const [allRecipe,setAllRecipe]=useState([])
  const [logStatus,setLogStatus]=useState(false)
  const [search,setSearch]=useState("")
      
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
        getData()
        setLogStatus(true)
    }
    else{
      console.log("login first")
      setLogStatus(false)
    }
  },[search])
  console.log(allRecipe)


      const getData=async()=>{
        const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
        const result=await allRecipes(header,search)
        console.log(result)
        if(result.status==200){
          setAllRecipe(result.data)
        }
        else{
          console.log(result.response.data)
        }

      }
 
  return (
    <>
   
     <div className='p-5'>
      <div className='d-flex justify-content-between p-5'>
      <h1 className='text-center text-warning'>Recipes for you..</h1>
      <input type="text" name='' className='form-control w-25' placeholder='search recipes'  id=''  onChange={(e)=>{setSearch(e.target.value)}} style={{fontSize:'20px'}}/>
      </div>
      {
        logStatus?
        <Row>
        {
          allRecipe.length>0 ?
          allRecipe.map(item=>(
            <Col>
            <Recipelist recipe={item}/>  
           </Col>
          ))
          :
          <h4>No recipes available</h4>
        }
        
      </Row>
      :
          <h1 className='text-center text-warning'>login for more recipes</h1>
      }

      <div className='text-center' style={{fontSize:'30px',textDecoration:"none"}}>
      <Link to={'/'} style={{textDecoration:"none"}}>
      <i class="fa-solid fa-backward fa-beat" style={{color: "#FFD43B",}} />
      {" "}
        BACK</Link>
      </div>  

   </div>
   

    </>
  )
}

export default Dashboard