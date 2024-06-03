import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'
import server_url from '../Services/server_url'
import Share from '../Components/Share';
import {  saveRecipe } from '../Services/allApi';
import { toast } from 'react-toastify';
 import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addReviews } from '../Services/allApi';

function Recipelist({recipe}) {
  // console.log(recipe)
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// console.log(recipe)
  return (
    <>
       <Card style={{ width: '18rem',height:"21rem",marginTop:'20px' }} className='border shadow'> 
       <Link to={`/recipes/${recipe._id}`}>
       <Card.Img variant="top" src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://wallpapercave.com/wp/wp7556107.jpg"} onClick={handleShow} style={{height:'250px'}} />
        </Link> 
        {/* <Card.Img variant="top" src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://wallpapercave.com/wp/wp7556107.jpg"} onClick={handleShow} style={{height:'250px'}} /> */}


      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
   
    


    


    </>
  )
}

export default Recipelist