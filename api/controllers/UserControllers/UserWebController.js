const { CatchAsyncError } = require('../../middlewares/CatchAsyncErrors')
const User = require('../../models/UserModel')

exports.SignupWeb =CatchAsyncError(async(req,res,next)=>{
    res.status(200).cookie('token',req.token).json({
        success:true,
        token:req.token,
        message:"User created Successfully!!"
    })
})
exports.LoginWeb =CatchAsyncError(async(req,res,next)=>{
    res.status(200).cookie('token',req.token).json({
        success:true,
        token:req.token,
        message:"Logged In Successfully!!"
    })
})