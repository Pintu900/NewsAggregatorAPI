const express = require('express');
const cors = require('cors');
const routes = express.Router();
const mongoose = require("mongoose");
const {register,login} = require("./controllers/authController");
require('dotenv').config();

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

app.listen(PORT, (error)=>{
    if(!error)
     console.log("Server is running on port "+PORT);
    else
    console.log(error);
})
