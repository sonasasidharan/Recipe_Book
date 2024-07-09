import React from 'react'
import Card from 'react-bootstrap/Card';
import server_url from '../Services/server_url'
import { Link } from 'react-router-dom';

function Recipelist({recipe}) {

  // console.log(recipe)

// console.log(recipe)
  return (
    <>
       <Card style={{ width: '18rem',height:"21rem",marginTop:'20px' }} className='border shadow'> 
       <Link to={`/recipes/${recipe._id}`}>
       <Card.Img variant="top" src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://wallpapercave.com/wp/wp7556107.jpg"}  style={{height:'250px'}} />
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