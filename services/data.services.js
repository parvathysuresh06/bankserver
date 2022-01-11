users= {
    1000: { acno: 1000, uname: "aswathy", pswd: "zero", balance: 6000,transaction:[] },
    1001: { acno: 1001, uname: "vishnu", pswd: "one", balance: 6000,transaction:[] },
    1002: { acno: 1002, uname: "ram", pswd: "two", balance: 8000,transaction:[] },
  }

  //register definition
  const register=(acno,pswd,uname)=> {


    if (acno in users) {
      
        return {
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
        status:true,
        message:"Account sucessfully created"
    }
    }
  }
  //export
  module.exports={
      register
  }