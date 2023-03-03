const express = require('express')
const { SignupMobile, LoginMobile} = require('../../controllers/UserControllers/UserMobileController')
const { Signup, Login, FetchUser, ForgetPassword, ChangePassword, ChangeUsername, FetchAllUsers, EditProfileAdmin } = require('../../controllers/UserControllers/CommonController')
const { VerifyUser, isAdmin } = require('../../middlewares/VerifyUser')

// Declarations 
const router = express.Router()

// MOBILE ROUTES
router.post('/signup',Signup,SignupMobile)
router.post('/login',Login,LoginMobile)
router.get('/fetchuser',VerifyUser,FetchUser)
router.post('/forgetpassword',ForgetPassword)

router.put('/changepassword',VerifyUser,ChangePassword)
router.put('/changeusername',VerifyUser,ChangeUsername)
router.get('/admin/fetchallusers',VerifyUser,isAdmin,FetchAllUsers)




module.exports = router