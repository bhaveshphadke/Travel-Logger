const User = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { CatchAsyncError } = require('../../middlewares/CatchAsyncErrors')
const { ErrorHandler } = require('../../utils/ErrorHandler')
const { sendMail } = require('../../utils/SendEmail')
const cloudinary = require('cloudinary')

//Declarations
JWT_SECRETE = process.env.JWT_SECRETE
EMAIL_SECRETE = process.env.EMAIL_SECRETE

//Signup
exports.Signup = CatchAsyncError(async (req, res, next) => {
    console.log(1);

    const { username, email, password, avatar } = req.body;
    let user = await User.findOne({ username })
    if (user) {
        return next(ErrorHandler(404, 'User Already Exists!!'))
    }
    const hashPassword = await bcrypt.hash(password, 10)
    // let avatarOutput;
    // if(avatar){

    let avatarOutput = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'a'
    })
    // }
    console.log(1);
    user = await User.create({
        username, email, password: hashPassword, avatar: {
            public_id: avatarOutput.public_id,
            secure_url: avatarOutput.secure_url
        }
    })
    //Request entity too large
    // IF not created??

    const data = {
        id: user._id
    }
    const token = await jwt.sign(data, JWT_SECRETE)
    req.token = token
    next()
})

//Login
exports.Login = CatchAsyncError(async (req, res, next) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username })
    if (!user) {
        return next(ErrorHandler(404, "User Not Found"));
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return next(ErrorHandler(403, "Username or password incorrect"))
    }

    const data = {
        id: user._id
    }
    const token = await jwt.sign(data, JWT_SECRETE)
    req.token = token
    next()
})

//Fetch User
exports.FetchUser = CatchAsyncError(async (req, res, next) => {

    let userID = req.userID
    const user = await User.findById(userID)
    if (!user) {
        return next(ErrorHandler(403, "Not Authorised!!"));
    }
    res.status(200).json({
        success: true,
        user
    })
})

//Forget Password
exports.ForgetPassword = CatchAsyncError(async (req, res, next) => {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return next(ErrorHandler(403, "Not Exists"));
    }
    token = await jwt.sign({ id: user._id }, EMAIL_SECRETE)
    sendMail({
        email: user.email,
        subject: "Forget Password",
        message: `https://travel-log-api.onrender.com/forgetpassword/${token}`
    })
    user.passwordRecoveryExpire = false
    user.save()
    res.status(200).json({
        success: true,
        message: "Email has been sent on registered email!!",
        token
    })
})


//Change Forget Password
exports.ChangeForgetPassword = CatchAsyncError(async (req, res, next) => {
    const { token } = req.params
    if (token === undefined || token === null || token === "") {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }

    const data = await jwt.verify(token, EMAIL_SECRETE)

    if (!data) {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }

    const user = await User.findOne({ id: data.id })
    if (!user) {
        return next(ErrorHandler(403, "Not Authorised!!"));
    }
    if (user.passwordRecoveryExpire === false) {
        user.password = bcrypt.hashSync(req.body.password, 10)
        user.passwordRecoveryExpire = true
    } else {
        return next(ErrorHandler(403, "Not Authorised!!"));
    }
    user.save()

    res.status(200).json({
        success: true,
        message: "Password changed successfully!!"
    })
})


//Change Password
exports.ChangePassword = CatchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body

    let user = await User.findById(req.userID);
    if (!user) {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }
    // const passCompare = await bcrypt.compare(oldPassword, user.password)
    // if (!passCompare) {
    //     return next(ErrorHandler(403, 'Not Authorised!!'))
    // }

    user.password = bcrypt.hashSync(newPassword, 10)
    user.save()

    res.status(200).json({
        success: true,
        message: "Password Updated Successfully!!"
    })

})

// Change Username
exports.ChangeUsername = CatchAsyncError(async (req, res, next) => {
    const { oldUsername, newUsername } = req.body
    let user = await User.findOne({ username: oldUsername, _id: req.userID })
    if (!user) {
        return next(ErrorHandler(403, "Not Authorised!!"))
    }
    // console.log(2);

    newUser = await User.findOne({ username: newUsername })
    if (newUser) {
        return next(ErrorHandler(404, "Username Already Taken"))
    }

    user.username = newUsername;
    user.save()

    res.status(200).json({
        success: true,
        message: "Username changed Successfully!!"
    })
})

// Change BIO
exports.ChangeBio = CatchAsyncError(async (req, res, next) => {
    const { description, link } = req.body
    const user = await User.findById(req.userID)

    if (!user) {
        return next(ErrorHandler(401, 'Invalid User!!'))
    }
    if (description) {
        user.bio.description = description
    }
    if (link) {
        user.bio.link = link
    }
    user.save()
    res.status(200).json({
        success: true,
        message: `${description ? "bio updated succesfully" : "link updated successfully"}`
    })
})


// Logout
exports.LogoutUser = CatchAsyncError(async (req, res, next) => {
    res.status(200).cookie('token', '').json({
        success: true,
        message: "Logout Successfull"
    })
})


// Fetch All Users -- ADMIN
exports.FetchAllUsers = CatchAsyncError(async (req, res, next) => {
    let users = await User.find().select('-password')
    res.status(200).json({
        success: true,
        message: "All users are fetched!!",
        users
    })
})

// Change Username -- ADMIN
exports.EditProfileAdmin = CatchAsyncError(async (req, res, next) => {
    const { id, username, email, isAdmin } = req.body;

    //Checking user already exists or not with its id
    let user = await User.findById(id)
    if (!user) {
        return next(ErrorHandler(403, 'Not Exists!!'));
    }

    //Checking if new username is already taken or not
    newUser = await User.findOne({ username })
    if (newUser && user.username !== username) {
        return next(ErrorHandler(403, `${username} Username already exists!!`))
    }

    // saving data
    user.username = username;
    user.email = email;
    user.isAdmin = isAdmin;
    user.save()

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully!!"
    })
})


exports.DeleteUserAdmin = CatchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.body.id)
    if (!user) {
        return next(ErrorHandler(403, "User doesn't Exists"))
    }
    res.status(200).json({
        success: true,
        message: "User deleted Successfully!!",
        user
    })
})