require('dotenv').config()

const express=require('express')
const cors=require('cors')
// const router=require('./Routes/routes')
const router=require('./Routes/routes')
require('./DB/connection')

const rbserver=express()

rbserver.use(cors())

rbserver.use(express.json())

rbserver.use(router)

rbserver.use('/uploads',express.static('./uploads'))

const PORT=3000

rbserver.listen(PORT,()=>{

    console.log(`server is running at:${PORT}`)
})

rbserver.get('/',(req,res)=>{
    res.status(200).send("<h1>the get request hit successfully</h1>")

})