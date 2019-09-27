const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/5403ed94481d42ddcb6188c079682f98/' + lat + ',' + long
  
  request({'url': url, 'json': true}, (error, respond)=>{
    if(error){
      callback("no network connected", undefined)
    }else if(respond.body.error){
      callback("unable to find location", undefined)
    }else{
      callback(undefined, respond.body.daily.data[0].summary + " It is currently " + respond.body.currently.temperature + " degree out. There is a " + respond.body.currently.precipProbability + "% chance of rain." );
    }
  })
}

module.exports = forecast;