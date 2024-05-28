import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './Context Api/Contextapi.jsx'
import AuthContextapi from './Context Api/AuthContextapi.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextapi>
    <Contextapi>
    <App />
    </Contextapi>
    </AuthContextapi>
    </BrowserRouter>
  </React.StrictMode>,
)
