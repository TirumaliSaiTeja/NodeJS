const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')

const app = express();

// using public as static will load our css and  image properties

app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: true}));

// using the signup page and landing in on root page

app.get('/', function(req,res){
    res.sendFile(__dirname + '/signup.html');
})



app.post('/', function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // structuring the data object with required details

    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/1dcaf21da4";

    const options = {
        method: "POST",
        auth: "saiteja:6e8931f8f5064fa6118c33cdf764f4e7-us7"

    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }
        else{
            res.sendFile(__dirname + '/failure.html')
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));

        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log('server running');
})



