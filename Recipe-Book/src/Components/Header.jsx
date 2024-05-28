import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {

  const [token,setToken]=useState("")


  useEffect(()=>{
      setToken(sessionStorage.getItem('token'))
  })


  return (
    <>
    <div>
     <Navbar class="bg-body-tertiary">
        <Container>
          <Navbar.Brand   >
          <i className="fa-solid fa-r fa-fade fa-lg" style={{color: "#FFD43B"}}></i>
          {" "}
          ecipies
          </Navbar.Brand>
           <div>
            {
              token?

              <Link class='btn btn-warning' to={'/prof'}   >
              <i className="fa-regular fa-user fa-xl" style={{color: "#fdfdf7"}} ></i>
              profile
              </Link>
              :
              <Link class='btn btn-warning' to={'/auth'}  style={{marginRight:''}}>sign in</Link >
                  
                
            }
           
           </div>
            
         
     
        </Container>
      </Navbar>
      </div>
     
     
    </>
  )
}

export default Header