import React from 'react'
import { Link } from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'

function Footer() {
  return (
    <>
     <div className='w-100 bg-light  bg-success'>
      <Row>
        <Col className='d-flex flex-column align-items-center'> 
        <h4>Recipe book 2024</h4>
          <p  style={{textAlign:'justify'}}> Recipe is a recipe web application it provide thousands of verities of<br/>
          food recipies .We can prepare delicious foods with perfect intructions </p></Col>
     
     
         
     
      <Col className='d-flex flex-column align-items-center'> 
      <h4>links</h4>
      <Link to={'/'} style={{color:'grey',textDecoration:'none'}}>Landing</Link><br/>
          {/* <Link to={'/log'} style={{color:'grey'}} >Login</Link><br/>
          <Link to={'/reg'} style={{color:'grey'}} >Register</Link><br/> */}
          {/* <Link to={'/auth'} style={{color:'grey'}} >Auth</Link><br/> */}
          </Col>
         
        

        
      <Col className='d-flex flex-column align-items-center '>
        <h4>References</h4>
          <a href="https://react-bootstrap.github.io/"  target='_blank' style={{color:'grey',textDecoration:'none'}} >React-bootstrap</a><br/>
          <a href="https://react.dev/" target='_blank' style={{color:'grey',textDecoration:'none'}} >React</a><br/>
          <a href="https://getbootstrap.com/" target='_blank' style={{color:'grey',textDecoration:'none'}} >bootstrap</a><br/>
          </Col>

        
      <div className='text-center' style={{color:'#FFD43B'}}>
          <p> &copy; Recipe Book 2024</p>
      </div>
      </Row>
      </div>
    </>
  )
}

export default Footer 