
import React, { useEffect, useState } from 'react'
import{Row,Col} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Share from '../Components/Share';
import { useParams } from 'react-router-dom';
import { getAllReviews, singleRecipe } from '../Services/allApi';
import { addReviews, saveRecipe } from '../Services/allApi';
import { toast } from 'react-toastify';
import server_url from '../Services/server_url'
import { Link } from 'react-router-dom';

 function Recipes() {
  const [addStatus,setAddStatus]=useState({})


  const [recipe,setRecipe]=useState([])
  const {rid}=useParams()
  const user=sessionStorage.getItem("username")
  const [review,setReview]=useState({
    username:user,reviewComment:"",ratings:""
  })

    const [allReview,setAllReview]=useState({
      username:user,reviewComment:"",ratings:""
    })


   
    


    useEffect(()=>{
      getData()
    },[addStatus])

// console.log(recipe)

    const getData=async()=>{
      const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
      const result=await singleRecipe(rid,header)
      const reviews=await getAllReviews(rid,header)
      console.log(result.data)
      console.log(reviews)
      if(result.status==200){
        setRecipe(result.data)
        // console.log(reviews)
      }
      else{
        console.log(result.response.data)
      }
      if(reviews.status==200){
        setAllReview(reviews.data)
      //  set all review consol cheyth veche tazhe 
      //  console.log(reviews) 
         
      }
      else{
       console.log(reviews.response.data)
      }
     }
    //  console.log(review)
    console.log(allReview)

        
  const handleAddReview=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}

    const {username:user,reviewComment,ratings}=review

    const result=await addReviews(rid, review, header)
    // const result=await addReviews(review)
    
    console.log(result)
  
  
    if(result.status==200){
      toast.success("review added successfully")
      setReview({
        reviewComment: "" , ratings: ""
      })
      setAddStatus(result)
    }
    else{
      toast.error(result.response.data)
    }
   console.log(result) 
  
}
    // all review empty ayit aanu kittunnath
   console.log(allReview)
  //  console.log(review) reviewcomment,rating empty string atit kittunne
  console.log(review)



 const handleSavedRecipe=async()=>{
    const data = {rid: rid }
    console.log(data)
  
    const header = {
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`

    } 
   
    
      const result = await saveRecipe(data,header)
      if(result.status==200){
        toast.success("recipe saved successfully")
        sessionStorage.setItem('savedRecipeId')
      }
      else{
        console.log(result)
        // toast.error("recipe saving is failed")
        toast.error(result.response.data)
      }
    
  }





  return (
    <>
    
    {/* <Row>
   
      <Col md='6'> */}
      <div className='d-flex align-items-center w-100'></div>
        <div className='   align-items-center p-5 border' > 
          <h2 className='align-items-center'>{recipe.title}</h2>
          <div className='p-3'>
                    {
                      allReview.length > 0 ?
                      allReview.map(item=>(
                        <div className="my-4 border rounded-4">
                        <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between pe-3'>
                                <div className='d-flex justify-content-around w-25'>
                                    <div>
                                        <i class="fa-regular fa-user"></i>
                                    </div>
                                    <div>
                                        <h5 style={{ marginBottom: '-3px' }}>{item.username}</h5>
                                        <h6 style={{ marginLeft: '80px' }}>{item.reviewComment}</h6>
                                    </div>
                                </div>
                                <span style={{ marginTop: '-13px' }}>
                                    {item.ratings} <i class="fa-solid fa-star fa-2xs" style={{ color: '#ffc800' }}></i>
                                </span>
                            </div>
                            
                        </div>
                    </div>

                      ))
                      :
                      <h5>no reviews</h5>
                    }
                    </div>

                     
              <div className='border shadow' style={{backgroundColor:'#D3D3D3'}}>
          <img src={recipe.imageUrl?`${server_url}/uploads/${recipe.imageUrl}`:"https://wallpapercave.com/wp/wp7556107.jpg"} className='img-fluid p-3 align-items-center' alt="" style={{width:'1600px'}} />
        
          </div>
          <div>
            <h4  style={{color:"orange"}}>ingredients</h4>
            <p>{recipe.ingredients}</p>

            <h4  style={{color:"orange"}}>instructions</h4>
            <p>{recipe.instructions}</p>

            <h4  style={{color:"orange"}}>preptime</h4>
            <p>{recipe.prepTime}</p>

            <h4  style={{color:"orange"}}>cooktime</h4>
            <p>{recipe.cookingTime}</p>

            <h4  style={{color:"orange"}}>totaltime</h4>
            <p>{recipe.totalCooktime}</p>

            <h4  style={{color:"orange"}}>catagory</h4>
            <p>{recipe.catagory}</p>

            <div className='p-3'>
              <h3>Nutritional facts</h3>
              <Table striped bordered hover>
    
               <tbody>
                  <tr>
                   <td  style={{color:"orange"}}>totalfat</td>
                   <td>{recipe.totalfat}</td>
                 </tr>
                  <tr>
                  <td  style={{color:"orange"}}>sodium</td>
                    <td>{recipe.sodium}</td>
                  </tr>
                  <tr>
                  <td  style={{color:"orange"}}>dietry fiber</td>
                    <td>{recipe.dietryfiber}</td>
                  </tr>
                  <tr>
                  <td  style={{color:"orange"}}>protein</td>
                    <td>{recipe.protein}</td>
                  </tr>
                  <tr>
                  <td  style={{color:"orange"}}>vitamin c</td>
                    <td>{recipe.vitaminc}</td>
                  </tr>
                  <tr>
                  <td  style={{color:"orange"}}>potassium</td>
                    <td>{recipe.potassium}</td>
                  </tr>
        
       
                </tbody>
              </Table>
            </div>
                <div>
                  <div className='p-3  d-flex'>
                <div className='mt-3 p-3  justify-content-center'>
                <button  className='btn btn-primary p-3' onClick={handleSavedRecipe}>
                <i class="fa-solid fa-bookmark fa-xl" style={{color: "#FFD43B",}} />
                </button>
                
               <div className='p-1' >
               {/* <Share /> */}
               </div>
                </div>
                </div>

                                 <div>
                                    <div className=' align-items-center gap-3 my-3 rating__group'>
                                    <span style={{ color: '#ffc800' }} onClick={e=>setReview({...review,ratings:1})}>
                                        1 <i class="fa-solid fa-star fa-2xs" ></i>
                                    </span>
                                    <span style={{ color: '#ffc800' }} onClick={e=>setReview({...review,ratings:2})}>
                                        2 <i class="fa-solid fa-star fa-2xs" ></i>
                                    </span>
                                    <span style={{ color: '#ffc800' }} onClick={e=>setReview({...review,ratings:3})}>
                                        3 <i class="fa-solid fa-star fa-2xs" ></i>
                                    </span>
                                    <span style={{ color: '#ffc800' }} onClick={e=>setReview({...review,ratings:4})}>
                                        4 <i class="fa-solid fa-star fa-2xs"></i>
                                    </span>
                                    <span style={{ color: '#ffc800' }} onClick={e=>setReview({...review,ratings:5})}>
                                        5 <i class="fa-solid fa-star fa-2xs"></i>
                                    </span>
                                </div>
                                    <div className='border rounded w-50 d-flex justify-content-between mb-4'>
                                      <input type="text" className='border-0 p-2  w-100' placeholder='reviews' style={{width:"100px",borderColor:'yellow'}}  onChange={e=>setReview({...review,reviewComment:e.target.value})}/>
                                      <button className='btn btn-warning' type='submit' onClick={handleAddReview}>submit</button>
                                    </div>
                          
                    </div>  
                </div>
          </div>
          </div>
          <div className='text-center' style={{fontSize:'30px',textDecoration:"none"}}>
      <Link to={'/'} style={{textDecoration:"none"}}>
      <i class="fa-solid fa-backward fa-beat" style={{color: "#FFD43B",}} />
      {" "}
        BACK</Link>
      </div>  
          
        {/* </div> */}
        
      {/* </Col>
    </Row> */}
    </>
  )
}
 
export default Recipes