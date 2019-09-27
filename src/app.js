const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('/weather', (req, res)=>{
  if(!req.query.address){
    return res.send({
      'error':'No address provided'
    })
  }
  geocode(req.query.address, (error, {longitude, latitude, location}={}) =>{
    if(error){
      return res.send({ error })
    }
    forecast(longitude, latitude, (error, forecast)=>{
      if(error){
        return res.send({ error })
      }
      res.send({
        'forecast':forecast,
        location,
        'address':req.query.address
      })
    })
  });
})

app.get('/products', (req, res)=>{
  if(!req.query.search){
    return res.send({
      'error':"must provide a search term"
    })
  }
  console.log(req.query.search)
  res.send({
    'products': []
  })
})

app.get('', (req, res) => {
  res.render('index',{
    'title': 'Weather App',
    'name': 'MEEE'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    'title': 'Weather App',
    'name': 'MEEE'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    'title': 'Help',
    'name': 'MEEE'
  })
})

app.get('/help/*', (req, res) => {
  res.render('notFound',{
    'errorMessage': 'Help article not found',
    'name': 'MEEE'
  })
})

app.get('*', (req, res)=>{
  res.render('notFound',{
    'errorMessage': 'Page not found',
    'name': 'MEEE'
  })
})

app.listen(3000, ()=>{
    console.log('server starting on port 3000')
})