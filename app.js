const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.sendFile(__dirname +"/signup.html")
})

app.post('/',(req,res) => {
    // var firstname = req.body.fname;
    // var lastname = req.body.lname;
    // var email = req.body.email;

    var firstname = req.body.fname
    var lastname = req.body.lname
    var email = req.body.email
   // console.log(firstname,lastname,email)

   var data = {
       members :[
           {
               email_address : email,
               status : "subscribed",
               merge_fields : {
                   FNAME : firstname,
                   LNAME : lastname
               }
           }
       ]
   }

   var jsondata = JSON.stringify(data)

   var Option = {
       url : "https://us6.api.mailchimp.com/3.0/lists/c12c87c9ba",
       method : "POST",
       headers : {
           "Authorization" : "Mits 77bb77a3296f1e8058b2f0a6b22958a3-us6"
       },
       body : jsondata
   }

   request(Option,(error,response,body) => {
       if(error){
           console.log(error)
           res.sendFile(__dirname + "/failure.html")
       }
       else{
           console.log(response.statusCode)
       }
       if(response.statusCode == 200){
           res.sendFile(__dirname + "/success.html")
       }
       else{
           res.sendFile(__dirname + "/failure.html")
       }
   })
    
})

app.listen(3000,() => {
    console.log("Server started at port 3000")
})

//API KEY
//77bb77a3296f1e8058b2f0a6b22958a3-us6

//unique ID
//c12c87c9ba
