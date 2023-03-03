const { CatchAsyncError } = require('../../middlewares/CatchAsyncErrors')
const User = require('../../models/UserModel')

exports.SignupMobile = CatchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"User created Successfully!!",
        token:req.token
    })
})
exports.LoginMobile = CatchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"Logged In Successfully!!",
        token:req.token
    })
})