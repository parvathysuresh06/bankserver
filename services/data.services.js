//import json web token
const jwt=require('jsonwebtoken')

users= {
  1000: { acno: 1000, uname: "aswathy", pswd: "zero", balance: 6000,transaction:[] },
  1001: { acno: 1001, uname: "vishnu", pswd: "one", balance: 6000,transaction:[] },
  1002: { acno: 1002, uname: "ram", pswd: "two", balance: 8000,transaction:[] },
}

//register definition
const register=(acno,pswd,uname)=> {


  if (acno in users) {

      return {
        statusCode:401,

          status:false,
          message:"Account already exist"

    }
  }
  else {
    users[acno] = {
      acno,
       uname,
        pswd,
         balance: 0,
         transaction:[],

    }

    return  {
      statusCode:200,
      status:true,
      message:"Account sucessfully created"
  }
  }
}

//login

const login=(acno, password)=> {

  let database = users

  if (acno in database) {
    if (password == database[acno]["pswd"]) {
      currentAcno=acno
      currentUserName=database[acno]["uname"]
      //token generation

      const token=jwt.sign({
        currentAcc:acno
      },'supersecretkey123')

       return {
        statusCode:200,
        status:true,
        message:"sucessfully logged",
        currentAcno,
        currentUserName,
        token
    }
    }
    else {
      // alert("incorrect password")
      return  {
        statusCode:401,
        status:false,
        message:"incorrect password"

  }
    }
  }
  else {
    // alert("invalid account number")
    return  {
      statusCode:401,
      status:false,
      message:"invalid acno"

}
  }
}
//deposit amount
//deposit amount
const deposit=(acno, password, amt)=> {

  var amount = parseInt(amt);

  let db = users

  if (acno in db) {
    if (password == db[acno]["pswd"]) {
      db[acno]["balance"] = db[acno]["balance"] + amount
      db[acno].transaction.push({
        amount:amount,
        type:"CREDIT"
      })
      return {
        statusCode:200,

            status:true,
            message:amount + " credited... New Balance is :" +   db[acno]["balance"]
      }
    }
    else {
      return {
        statusCode:401,

        status:false,
        message:"Incorrect Password!!"
    }
    }

  }
  else {
    return {
        statusCode:401,

        status:false,
        message:"account doesnt exist!!"
    }
    }
  }

//withdraw
const withdraw=(req,acno, password, amt)=> {
  var amount = parseInt(amt);
  let db = users;
  if (acno in db) {
    if(req.currentAcc!=acno){
      return{
        statusCode:401,
        status:false,
        message:"Account no does not exit"
  
      } }
    
    if (password == db[acno]["pswd"]) {
      var bal = db[acno]["balance"]
      if (bal >=amount) {
        db[acno]["balance"] = db[acno]["balance"] - amount
        db[acno].transaction.push({
          amount:amount,
          type:"DEBIT"
        })


       // return db[acno]["balance"];
       return{
        statusCode:200,
        status:true,
        message:amount+"Amount debited and the new balance is "+db[acno]["balance"]

      } 

      }
      else {
        return{
          statusCode:401,
          status:false,
          message:"Insufficient balance"

        }
      }

    }
    else {
      return{
        statusCode:401,
        status:false,
        message:"Incorrect Password"

      }
    }

  }
  else {
    return{
      statusCode:401,
      status:false,
      message:"Account no does not exit"

    } 
  }

}
//transactiom
const transaction = (acno)=>{
  if(acno in users){
    return {
      statusCode:200,
      status:true,
      transaction:users[acno].transaction
    }  
  }
  else{
    return  {
      statusCode:401,
      status:false,
      message:"account doesnot exist"
     } 
    
  }
}

//export
module.exports={
    register,
    login,
    deposit,
    withdraw,
    transaction
    
} 