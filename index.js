//import express
const  express = require('express')
const dataService=require('./services/data.services')
const jwt=require('jsonwebtoken')
const { status } = require('express/lib/response')
//create app using express
const app = express()
//parse json
app.use(express.json())

//middleware //application specific
// app.use((req,res,next)=>{
// console.log("APPLICATION SPECIFIC MIDDLEWARE")
// next()
// })
//middleware //application specific another method
const logMiddleware =(req,res,next)=>{
console.log("APPLICATION SPECIFIC MIDDLEWARE")
next()
}
app.use(logMiddleware)


//jwt middleware to validate token
const jwtMiddleware=(req,res,next)=>{
  try{
    const token=req.headers["x-access-token"]
    const data=jwt.verify(token,'supersecretkey123')
    req.currentAcc=data.currentAcc
    next()
  }
   catch{
     res.json({
       statusCode:401,
       status:false,
       message:"please log in"
     })
   }
}
  
//resolve http request

//get request - to fetch
// app.get('/',(req,res)=>{
//     res.send("GET REQUEST!!!")
// })

// //post req-to create
// app.post('/',(req,res)=>{
//     res.send("POST REQUEST")
// })
// // put request - to modify entirely
// app.put('/',(req,res)=>{
//     res.send("put request")
// })

// //patch- to modify partially
// app.patch('/',(req,res)=>{
//     res.send("patch request")
// })

// //delete
// app.delete('/',(req,res)=>{

//     res.send("delete request")
// })

//Reister API
app.post('/register',(req,res)=>{
  console.log(req.body.acno);
const result=dataService.register(req.body.acno,req.body.pswd,req.body.uname)
// res.send(result.message)
res.status(result.statusCode).json(result)
// res.json(result)

})


// login
app.post('/login',(req,res)=>{
  console.log(req.body)
  const result =dataService.login(req.body.acno,req.body.pswd)
  res.status(result.statusCode).json(result)
  // res.send(result.message)
//   res.json(result)

})

//deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
})


//withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
    res.status(result.statusCode).json(result)
})


app.post('/transaction',jwtMiddleware,(req,res)=>{
  // console.log(req.body);
  const result =dataService.transaction(req.body.acno)
  res.status(result.statusCode).json(result)
})


//set port
app.listen(3000,()=>{
    console.log("server running in 3000")
})