import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';

function Share({status}) {
    // console.log(status)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Button variant="primary" onClick={handleShow}>
        <i class="fa-solid fa-share-nodes fa-xl" style={{color: "#FFD43B",}} />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"red"}}>Share options...</Modal.Title> 
        </Modal.Header>
        <Modal.Body >
          <div className='p-4'> 
          <a href="https://wa.link/l27ky0" className='p-4'>
            <i class="fa-brands fa-whatsapp fa-2xl" style={{color: "#4bf005",}} />
            </a>
          
          
          
          <a href="https://www.instagram.com/sona__sasidharan?igsh=MWh5NmdmZGx1ZWhnaw==" className='p-4'>
            <i class="fa-brands fa-instagram fa-2xl" style={{color: "#a614a9",}} />
            </a>
          

        
           <a href="" className='p-4'>
            <i class="fa-brands fa-telegram fa-2xl" style={{color: "#1ecdf1",}} />
            </a>
        </div>
           


        </Modal.Body>
        {/* <Modal.Footer> */}
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default Share