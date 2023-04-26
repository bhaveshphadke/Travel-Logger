const { CatchAsyncError } = require("../../middlewares/CatchAsyncErrors");
const User = require('../../models/UserModel')
const { ErrorHandler } = require('../../utils/ErrorHandler')
const cloudinary = require('cloudinary')

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
    let user = await User.findOne({ username: req.params.username }).populate(
        {
            path: 'following.user.userID followers.user.userID',
            model: 'user',
            select: 'username'
        });
    console.log(user.following.user);
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
        user.followers.user.push({ userID: me.id })
    }
    else {
        users = me.following.user.filter((item) => {
            return item.userID != user.id
        });
        me.following.user = users;

        users = user.followers.user.filter((item) => {
            return item.userID != me.id;
        })

        user.followers = users;
    }
    me.save();
    user.save()
    res.status(200).json({
        success: true,
        message: 'success',
    })
})


exports.PostTravel = CatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.userID);
    if (!user) {
        return next(ErrorHandler(404, 'User Not Found!!'));
    }

    const { image, description, title } = req.body;

    const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'a'
    })
    let post = {
        image: [
            {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
        ],
        title,
        description
    }
    user.posts = [...user.posts,post];

    // user.posts.push(title)
    // user.posts.push(description)
    user.save()

    res.status(200).json({
        success: true,
        posts: user.posts
    })
})