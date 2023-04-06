const { CatchAsyncError } = require("../../middlewares/CatchAsyncErrors");
const User = require('../../models/UserModel')
const { ErrorHandler } = require('../../utils/ErrorHandler')
exports.ShowUsersList = CatchAsyncError(async (req, res, next) => {
    let users;
    if (req.params.username === '*') {
        users = await User.find().select('username');
    }
    else {
        users = await User.find({ username: { $regex: req.params.username } }).select('username');
    }
    res.status(200).json({
        success: true,
        message: "Loaded Successfully!!",
        users
    })
})


exports.fetchUserForUser = CatchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.username })

    if (!user) {
        return next(ErrorHandler(404, "User Not Found!!"))
    }

    res.status(200).json({
        success: true,
        message: "success",
        user
    })
})


exports.FollowController = CatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.body.id);
    if (!user) {
        return next(ErrorHandler(404, "User Not Found!!"));

    }
    let users 
    let me = await User.findById(req.userID);
    let filteredUser = me.following.user.filter((item) => {
        return item.userID == user.id
    })
    
    if (filteredUser.length === 0) {
        me.following.user.push({ userID: user.id })
    } 
    else {
        users = me.following.user.filter((item) =>{
            return  item.userID != user.id
        });
        me.following.user = users;
    }
    me.save();
    res.status(200).json({
        success: true,
        message: 'success',
    })
})