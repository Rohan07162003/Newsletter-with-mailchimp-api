//jshint esversion: 6
import express from "express";
import bodyparser from "body-parser";
import request from "request";
import https from "https";
const app=express();
var apikey="945fdfe49a075b7533a0cbc1bd5f8425-us21";
var audis="4e7212bc3f";
app.get("/",function(req,res){
    res.sendFile("C:/Users/rohan/OneDrive/Desktop/Web Dev/MailChimp API/signup.html")
})
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))
app.post("/", function (req, res){
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname,
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/4e7212bc3f";
    const options={
        method:"POST",
        auth:"rohan:945fdfe49a075b7533a0cbc1bd5f8425-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile("C:/Users/rohan/OneDrive/Desktop/Web Dev/MailChimp API/success.html")
        }
        else{
            res.sendFile("C:/Users/rohan/OneDrive/Desktop/Web Dev/MailChimp API/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("RUN");
})