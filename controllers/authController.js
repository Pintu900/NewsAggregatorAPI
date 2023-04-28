const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

var register = (req,res) => {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password,bcrypt.genSalt(8)),
    });

    user.save().then(data => {
        res.status(201).json({ message: 'User registered successfully' });
    }).catch(err => {
        res.status(500).json({ message: err });
    });
}

var login = (req,res)=>{
    User.findOne({
        email: req.email
    }).then(user => {
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }
       
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(401)
            .json({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign({id: user._id},process.env.API_SECRET,{expiresIn: '1h'});
        
        res.status(200).
        json({
            user:{
                id: user._id,
                email: user.email,
                fullname: user.fullName
            },
            message: "Login Successfully",
            accessToken: token,
        });
    }).catch(err => {
        if(err){
            res.status(500)
            .json({
                message: err
            });
            return;
        }
    });
}

module.exports = {register,login};