import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Savedrecipies from './Pages/Savedrecipies'
import Yoursrecipes from './Pages/Yoursrecipes'
import { TokenAuthContext } from './Context Api/AuthContextapi'
import { useContext } from 'react'
import Recipes from './Pages/Recipes'


function App() {
  const{authStatus,setAuthStatus}=useContext(TokenAuthContext)
  

  return (
    <>
    
     <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}></Route>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/prof' element={<Profile/>}></Route>
      <Route path='/save' element={<Savedrecipies/>}></Route>
      <Route path='/recipes/:rid' element={<Recipes/>}></Route>
      <Route path='/yours' element={authStatus?<Yoursrecipes/>:<Landing/>}></Route>
     </Routes>
     <Footer/>
     <ToastContainer/>

   
    </>
  )
}

export default App
