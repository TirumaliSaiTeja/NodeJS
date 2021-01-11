const express = require('express');

const https = require('https');

const app = express();

app.get('/', function(req,res) {

    const url = 'https://api.openweathermap.org/data/2.5/weather?appid=ff7cf33167733141e8ab14c846556858&q=hyderabad&units=metric'

    https.get(url, function(response){
        console.log(res.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

            //description variable is available in index 0 of weather
            res.write('<h1>the temperature in hyderabad is ' + temp + ' degree celcius</h1>');
            res.write('<p>The weather is curently ' + description + '</p>')
            res.write('<img src=' + imageURl + '>')
            res.send()
        })
    })
})






app.listen(3000, function(){
    console.log('Server is running on port 3000');
})