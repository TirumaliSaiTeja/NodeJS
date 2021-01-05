const express = require('express');

const https = require('https');

const app = express();

app.get('/', function(req,res) {

    const url = 'https://api.openweathermap.org/data/2.5/weather?appid=ff7cf33167733141e8ab14c846556858&q=london&units=metric'

    https.get(url, function(res){
        console.log(res);
    })
    res.send('Server is up and running');
})






app.listen(3000, function(){
    console.log('Server is running on port 3000');
})