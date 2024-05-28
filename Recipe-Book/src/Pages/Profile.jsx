import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Add from '../Components/Add';
import { useNavigate } from 'react-router-dom';
 import { TokenAuthContext } from '../Context Api/AuthContextapi';
import { useContext } from 'react';
import server_url from '../Services/server_url'
import { updateProfile } from '../Services/allApi';
import { toast } from 'react-toastify';


function Profile() {
   const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

  const [user,setUser]=useState("")
  const [existingProfile,setExistingProfile]=useState("")
  const [preview,setPreview]=useState("")
  

  const[userss,setUserss]=useState({
    id:"",username:"",email:"",password:"",Profile:""
  })
   
  
  const navigate=useNavigate()

  // useEffect(()=>{
    
   
  // },[])

  useEffect(()=>{
    setUser(sessionStorage.getItem("username"))
    if(sessionStorage.getItem('token')){
      const userDetails=JSON.parse(sessionStorage.getItem('userDetails'))
      // console.log(userDetails)
         setUserss({id:userDetails._id,username:userDetails.username,email:userDetails.email,password:userDetails.password,Profile:""

         }) 
         setExistingProfile(userDetails.Profile)
        
           }

  },[])

  useEffect(()=>{
    if(userss.Profile){
      setPreview(URL.createObjectURL(userss.Profile))
    }
    else{
      setPreview("")
    }
  },[userss.Profile])
  


  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userDetails')
    navigate('/')
   setAuthStatus(false)

  }
  // console.log(userss)



  const handleProfileUpdate=async()=>{
    console.log(user)
    console.log(existingProfile,"profile image")
    const {username,password,email,Profile}=userss
    if(!username || !password || !email ){
      toast.warning("enter valid inputs")
    }
    else{
      const formData=new FormData()
      formData.append("username",username)
      formData.append("password",password)
      formData.append("email",email)
      preview?formData.append("Profile",Profile):formData.append("Profile",existingProfile)

      const header={
        "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
        "content-Type":preview?"multipart/form-data":"application/json"
      }
      const result=await updateProfile(header,formData)
      if(result.status==200){
        console.log(result.data)
        toast.success("profile update successfully")
        sessionStorage.setItem("userDetails",JSON.stringify(result.data))
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
  
  return (
    <>
   
    <div className='p-2 img-fluid' style={{backgroundImage:" url()",
       backgroundRepeat:'no-repeat',backgroundSize:"100%"
    }}>
      <div>
        <div className='p-2'>
          <h1>welcome <span className='text-warning'>{user}</span></h1>
        </div>
      </div>
      <div className='' >
      <Row>
      <Col sm={1} md={2} className='m-5'>
              <button className='btn btn-outline-warning p-4' onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket fa-xl" style={{color: "#e74813",}} />
                Logout
                </button>
      </Col>
      </Row>
    <Row>
    <Col sm={12} md={5}>
       <div className='p-5 m-4 border shadow border-3' style={{width:'200px'}} >
        <Link to={'/save'} className='btn'><i className="fa-solid fa-bookmark" style={{color: "#FFD43B"}}>  saved</i></Link>
        </div> 
        <div className='p-5 m-4 border shadow border-3' style={{width:'200px'}} >
        
        <Add/>
        </div>
        <div className='p-5 m-4 border shadow border-3' style={{width:'200px'}} >
        <Link  to={'/yours'} className='btn'><i className="fa-solid fa-paperclip" style={{color: "#FFD43B"}}>Your Recipes</i></Link>
        </div>
        {/* <div className='p-5 m-4 border shadow border-3' style={{width:'200px'}} >
           <Link className='btn'><i className="fa-solid fa-download fa-flip fa-2xl" style={{color: "#3bf109"}}> </i>
           
           </Link>
        </div> */}
      </Col>

      <Col sm={12} md={6}>
    
    <div className='p-5 border shadow border-3 m-3 '  style={{width:'400px',height:'600px'}}>
     <div className='d-flex justify-content-between'>
     <h3>profile</h3>
     <button className='btn'>
     <i className="fa-solid fa-check" style={{color: "#63E6BE",}} />
     </button>
     </div>
     <div>
              <label >
              <input type="file" name='' id='in' style={{display:'none'}} onChange={(e)=>setUserss({...userss,Profile:e.target.files[0]})}/>
           
              {
                existingProfile =="" ? 
                                <img src={preview?preview:"https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"} alt="" className='img-fluid'  width={'150px'}/>
                
               :
                
                <img src={preview?preview:`${server_url}/uploads/${existingProfile}`} alt="" className='img-fluid'  width={'150px'}/>
             

               }
               

             </label >
             <div >
             <FloatingLabel controlId="titleinp" label="name"className="mb-3">
         <Form.Control type="text" placeholder="name" value={userss?.username} onChange={(e)=>setUserss({...userss,username:e.target.value})} />
       </FloatingLabel>
       <FloatingLabel controlId="emailinp" label="email"className="mb-3">
         <Form.Control type="text" placeholder="email" value={userss?.email} onChange={(e)=>setUserss({...userss,email:e.target.value})} />
       </FloatingLabel>
      
       <div className='d-grid mt-3'>
        <button className='btn btn-block btn-success' onClick={handleProfileUpdate} >update</button>
      </div>
      </div>
     </div>
     </div>
     </Col>
     </Row>
     </div>
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

export default Profile
