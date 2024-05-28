import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'
import server_url from '../Services/server_url'
import Share from '../Components/Share';
// import { saveRecipe } from '../Services/allApi';

function Recipelist({recipe}) {
  // console.log(recipe)

// const handleSavedRecipe=async(id)=>{
//   const result=await saveRecipe(id)
// }

  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
       <Card style={{ width: '18rem',height:"21rem",marginTop:'20px' }} >
      <Card.Img variant="top" src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://wallpapercave.com/wp/wp7556107.jpg"} onClick={handleShow} style={{height:'250px'}} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color:"green"}}>Recipes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col>
            <img className='img-fluid' src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png" }/>
            </Col>
            <Col>
            <h2 style={{color:"#FFD43B"}}>{recipe.title}</h2>
            <h6 style={{color:"orange"}}>ingredients</h6>
            <p>{recipe.ingredients}</p>
            <h6 style={{color:"orange"}}>instructions</h6>
            <p>{recipe.instructions}</p>
            <h6 style={{color:"orange"}}>cooking time</h6>
            <p>{recipe.cookingTime}</p>
            <h6 style={{color:"orange"}}>catagory</h6>
            <p>{recipe.catagory}</p>

           <div className='mt-3 p-3 d-flex justify-content-between'>
                {/* <button onClick={handleSavedRecipe} varient='primary'>
                <i class="fa-solid fa-bookmark fa-xl" style={{color: "#FFD43B",}} />
                </button> */}
                
                <Share status={true}/>
              
                {/* <a href="">
               <i class="fa-regular fa-star" style={{color: "#FFD43B",}} />
                </a> */}


            </div> 
            </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Recipelist