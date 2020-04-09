var express = require('express');
var router = express.Router();
const {getWeatherData} = require('./function.js');

router.get('/', (req,res) => {
  const data = getWeatherData();
})

module.exports = router;
