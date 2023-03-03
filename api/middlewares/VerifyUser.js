const { ErrorHandler } = require("../utils/ErrorHandler");
const { CatchAsyncError } = require("./CatchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
//Declarations
JWT_SECRETE = process.env.JWT_SECRETE

exports.VerifyUser = CatchAsyncError(async (req, res, next) => {
    const token = req.header('token') || req.cookies.token
    if (token === undefined || token === null || token === "") {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }
    const data = await jwt.verify(token, JWT_SECRETE)
    if (!data) {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }
    
    req.userID = data.id
    next()
})


exports.isAdmin = CatchAsyncError(async(req,res,next)=>{
    let userID = req.userID;
    let user = await User.findById(userID)
    console.log(user);
    if(!user.isAdmin || user.isAdmin==="" ||user.isAdmin===undefined ||user.isAdmin===null){
        next(ErrorHandler(403,'You have not this priviledge!!'))
    }
    next()
})