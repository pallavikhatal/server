const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Register = async (req,res) => {

    const {name, email, password, role} = req.body;

    try {
        if(!name || !email || !password || !role)
        {
            return res.status(400).json({message:'Please fill all the fields...'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password:hashedPassword, role});

        res.status(201).json({message:"User Registered Successfully..."});
        
    } catch (error) {
        res.status(500).json({message:error});
    }
}

const Login = async (req,res) => {

    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.status(401).json({message:"Enter email and password"})
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message : "User not found..."})
        }

        const isPasswordValid =  await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({message : "Invalid Password..."})
        }

        const token = jwt.sign({id:user._id, name:user.name, role:user.role}, process.env.JWT_SECRET);

        res.status(200).json({message:"Login successfully...",
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        });

    } catch (error) {
        res.status(500).json({message:error});
    }
}

module.exports = {Register, Login};