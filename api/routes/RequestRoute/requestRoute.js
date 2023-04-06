const express  = require('express');
const { VerifyUser } = require('../../middlewares/VerifyUser');
const {ShowUsersList, fetchUserForUser, FollowController} = require('../../controllers/RequestController/RequestController')

const router = express.Router()

router.get('/list/:username',VerifyUser,ShowUsersList)
router.get('/:username',VerifyUser,fetchUserForUser)
router.post('/follow',VerifyUser,FollowController)

module.exports = router;