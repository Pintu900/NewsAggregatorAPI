const express = require('express');
const cors = require('cors');
const routes = express.Router();
const mongoose = require("mongoose");
const {register,login,getPreferences,updatePreferences} = require("./controllers/authController");
require('dotenv').config();
const newsinfo = require('./routes/newsinfo');
const verifyToken = require('./middleware/authJWT');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to News Api")
})

routes.post('/register',register);

routes.post('/login',login);

routes.get('/preferences',verifyToken,getPreferences);

routes.put('/preferences',verifyToken,updatePreferences);
routes.use(newsinfo);

app.listen(PORT, (error)=>{
    if(!error)
     console.log("Server is running on port "+PORT);
    else
    console.log(error);
})
