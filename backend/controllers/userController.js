const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

//why not use in  throw-catch .then.catch ? becaus the asyncHandler is manage;

const registerUser = asyncHandler(async (req, res )=> {
    const {name, email, password} = req.body;

    if(!email || !name || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    } 

    //check email(already exite)
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User alradey exits');
    }
     
    //for encript
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //create for db
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    //if create send response from user
    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id),
        });
        } else {
           res.status(400)
           throw new Error('Invalid User Data')
        }
    //don't need
    // res.json({message: 'User Registerd'});
});

const loginUser = asyncHandler(async  (req, res )=> {
    const {email, password} = req.body
    const user = await User.findOne({email});
    //1st one is req body password second is db paswword
    if(user && (await bcrypt.compare(password, user.password))) {
       res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.id),
       })
    }else{
        res.status(400);
        throw new Error('Invalid credential')
    }
})

const getMe = asyncHandler(async  (req, res )=> {

  //send respose
  res.status(200).json(req.user);
});

//JWT
const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}