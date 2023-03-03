const express = require('express')
const { Signup, Login, FetchUser, ForgetPassword, ChangeForgetPassword, ChangePassword, ChangeUsername, LogoutUser, FetchAllUsers, EditProfileAdmin, DeleteUserAdmin } = require('../../controllers/UserControllers/CommonController')
const { SignupWeb, LoginWeb} = require('../../controllers/UserControllers/UserWebController')
const { VerifyUser, isAdmin } = require('../../middlewares/VerifyUser')

// Declarations 
const router = express.Router()

// WEB ROUTES
router.post('/signup',Signup,SignupWeb)
router.post('/login',Login,LoginWeb)
router.get('/fetchuser',VerifyUser,FetchUser)
router.post('/forgetpassword',ForgetPassword)
router.put('/forgetpassword/:token',ChangeForgetPassword)
router.get('/logout',LogoutUser)

router.put('/changepassword',VerifyUser,ChangePassword)
router.put('/changeusername',VerifyUser,ChangeUsername)
router.get('/admin/fetchallusers',VerifyUser,isAdmin,FetchAllUsers)
router.put('/admin/editprofile',VerifyUser,isAdmin,EditProfileAdmin)
router.delete('/admin/deleteuser',VerifyUser,isAdmin,DeleteUserAdmin)




module.exports = router