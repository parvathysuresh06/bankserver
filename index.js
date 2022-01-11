//import express
const  express = require('express')
const dataService=require('./services/data.services')

//create app using express
const app = express()

//resolve http request

//get request - to fetch
app.get('/',(req,res)=>{
    res.send("GET REQUEST!!!")
})

//post req-to create
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})
// put request - to modify entirely
app.put('/',(req,res)=>{
    res.send("put request")
})

//patch- to modify partially
app.patch('/',(req,res)=>{
    res.send("patch request")
})

//delete
app.delete('/',(req,res)=>{
    res.send("delete request")
})

//Reister API
app.post('/register',(req,res)=>{
const result=dataService.register(req.acno,req.pswd,req.uname)
res.send(result.message)
})





//set port
app.listen(3000,()=>{
    console.log("server running in 3000")
})