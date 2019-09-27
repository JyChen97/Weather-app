const request = require('request')

const geocode = (address, callback) => {
  
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamlheWluZ2NoZW4zMTExOTk3IiwiYSI6ImNrMHp1OHBsZjB0d3kzY21pOHQxN21rNGIifQ.hjVXU9j_sWOpN_hNx3JOIw'
  request({'url': url, 'json':true}, (error, respond)=>{
    if(error){
      callback("no network connected", undefined)
    }else if(respond.body.features.length === 0){
      callback("unable to find location", undefined)
    }else{
      callback(undefined, {
        'latitude': respond.body.features[0].center[0],
        'longitude': respond.body.features[0].center[1],
        'location':  respond.body.features[4].place_name
      })
    }
  })
}

module.exports = geocode;