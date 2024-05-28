import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useRegister } from '../Services/allApi';
import { useLogin } from '../Services/allApi';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContextapi';
import { useContext } from 'react';


function Auth() {

     const{authStatus,setAuthStatus}=useContext(TokenAuthContext)
  const [status,setStatus]=useState(true)
  const [data,setData]=useState({
    username:"",password:"",email:""
  })

  const navigate=useNavigate()

//   console.log(data)

  const changeStatus=()=>{
    setStatus(!status)
  
  }
  const handleRegister=async()=>{
    console.log(data)
    const {username,password,email}=data

     if(!username || !email || !password){
            toast.warning("please fill the blanks...")

        }
        else{
            const result= await useRegister(data)
            
            console.log(result)

            if(result.status==201){
                toast.success("user registration successfully")
                setData({username:"",email:"",password:""})
                setStatus(true)
            }
            else{
                toast.error(result.response.data)
            }
        }
}

const handleLogin=async()=>{
    // console.log(data)
    const {email,password}=data
    if(! email || ! password ){
         toast.warning("invalid details  please fill the form properly")
    }
    else{
    const result=await useLogin({email,password})
    console.log(result)
    if(result.status==200){
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("username",result.data.username)
        sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
        toast.success("login successfully")
        setAuthStatus(true)
        navigate('/')
    }
    }
      
}
  return (
    <>
    

    <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow border w-50 p-4' style={{backgroundImage:'url(https://tse4.mm.bing.net/th?id=OIP.TL9SBr4vZNq2dJLWzhmkEQHaEK&pid=Api&P=0&h=180)',
                backgroundRepeat:'no-repeat', backgroundSize:'800px 500px'}} >
                  
                    <Row>
                        <Col sm={12} md={6}>
                            {/* <img src="https://deskcodesolution.com/wp-content/uploads/2019/03/881-Converted-1024x921.png" alt="" className='img-fluid' /> */}
                        </Col>
                        <Col sm={12} md={6}>
                            {
                                status ?
                                    <h3>Login</h3>
                                    :
                                    <h3>Register</h3>

                            }

                            <div className='mt-4 ' >
                              
                                {
                                    !status &&
                                    <FloatingLabel controlId="user" label="user name" className="mb-3" >
                                        <Form.Control type="text" placeholder="name@example.com"  onChange={(e)=>{setData({...data,username:e.target.value})}}></Form.Control>
                                    </FloatingLabel>
                                }

                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
                                    <Form.Control type="email" placeholder="email"  onChange={(e)=>{setData({...data,email:e.target.value})}} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" >
                                    <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setData({...data,password:e.target.value})}} />
                                </FloatingLabel>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                    {
                                        status ?

                                        <button className='btn btn-info' onClick={handleLogin}> 
                                        <span>login</span>
                                         </button>
                                         :
                                        <button className='btn btn-info'  onClick={handleRegister}> 
                                        <span>register</span> 
                                        </button>
                                    }
                               
                                <button className='btn btn-link' onClick={changeStatus}>
                                    {
                                        status ?
                                            <span>Are you new ?</span>
                                            :
                                            <span>Already a user ?</span>
                                    }
                                </button>

                            </div>
                        </Col>
                    </Row>
                  

                </div>
            </div>
    </>
  )
}

export default Auth