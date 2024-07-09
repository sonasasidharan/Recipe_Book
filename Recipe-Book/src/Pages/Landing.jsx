import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row} from 'react-bootstrap'
import Recipelist from '../Components/Recipelist'
import { homeRecipes } from '../Services/allApi'
import { Link } from 'react-router-dom'

function Landing() {
 
const [token,setToken]=useState("")
const [homeRecipe,setHomeRecipe]=useState([])

  useEffect(()=>{
       // conditional rendering
  // const token=sessionStorage.getItem('token') 
  getRecipes(3)
  })


  const getRecipes=async()=>{
    const result=await homeRecipes()
    // console.log(result)
    if(result.status==200){
        setHomeRecipe(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }

// console.log(homeRecipe)

  return (
  <>
  <Row>
    <Header/>
    <div className='w-100  align-items-center ' style={{height:'80vh',width:'100%',padding:"0px"}}>
        {/* <h1 className='  align-items-center justify-content-center' 
        style={{fontFamily:'italics',marginBottom:'500px',marginLeft:'600px'}}> Recipe</h1> */}
        <img className='img-fluid ' src="https://i0.wp.com/nicolesyblog.com/wp-content/uploads/2013/03/nicolesy-australia-1250.jpg?fit=1200%2C800&ssl=1"  style={{width:'100%',height:'100%'}} />
    </div>
  </Row>
    <div className='p-5 w- mt-2'>
        <h2 className='text-center mt-4 mb-3'>recipes...</h2>
        <div className='d-flex justify-content-evenly mt-2'>

          {
            homeRecipe.length>0 ?
            homeRecipe.map(item=>(
              <Recipelist recipe={item}/>
            ))
            :
            <h5>No recipes available</h5>
          }
       
        
       
        </div>
    
  
    
    <div className='text-center  '  >
            <Link to={'/dash'}  >click for more recipes... </Link>
          </div>
          </div>
        
  
   
    </>
  )
}

export default Landing