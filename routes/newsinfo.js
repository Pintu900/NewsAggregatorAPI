const express = require('express');
const newsRoutes = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
var URLSearchParams = require('url-search-params');
const {newsPromise} = require('../controllers/newsController');
const verifyToken = require('../middleware/authJWT');

newsRoutes.use(bodyParser.urlencoded({ extended: false }));
newsRoutes.use(bodyParser.json());

let url = "https://newsapi.org/v2/top-headlines/sources";

newsRoutes.get('/news',verifyToken,async (req,res)=>{
if(req.user === undefined){
    res.status(401).json({ message: 'Unauthorized' })
}
let categoryName = req.user.preferences;
// console.log(categoryName)
const searchParams = new URLSearchParams({
    apiKey:"48193023c795458787db10cb3c1739a7",
    category: categoryName
})
// console.log(`${url}?${searchParams}`);
try {
    let resp = await newsPromise(`${url}?${searchParams}`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(resp);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  }
})

module.exports = newsRoutes;