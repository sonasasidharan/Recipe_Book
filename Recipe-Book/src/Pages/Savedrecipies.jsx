import React from 'react'
import Header from '../Components/Header'
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Savedrecipies() {
  return (
    <>
    {/* saved recipies!!!!! */}
    <Header/>
   
   <div >
   <Row>
      <Col sm={12} md={6} className='p-3'>
      <h3>saved recipes</h3>
      <div className='border border-3 p-3'>
          <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
          <h4>Recipes</h4>
        </div>
        <h3 className='text-center '>no saved recipies available</h3>
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

export default Savedrecipies