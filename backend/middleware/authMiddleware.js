//auth start 2 video 30 second
//our routes producted using jwt token so this middleware created

const jwt = require('jsonwebtoken'); 
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

//we are creating middleware
//req res naduvla exicute akura files(function) is middleware


const protect = asyncHandler(async (req,res,next) => {
    //initializ token
     let token;
    //autherzation will start in jwt bearer "hints ! "
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
          }catch (error){
              console.log(error);
              res.status(401)
              throw new Error('not authorized')
          }
     }
     //in try token is not throw the error;  
     if(!token) {
        res.status(401)
        throw new Error('not authorized,No Token');
     }
});

module.exports = {
    protect,
}