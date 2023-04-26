import { configureStore } from '@reduxjs/toolkit';
import SignupReducer from './slices/UserSlices/SignupSlice'
import LoginReducer from './slices/UserSlices/LoginSlice'
import FetchUserReducer from './slices/UserSlices/FetchSlice'
import LogoutUserReducer from './slices/UserSlices/LogoutSlice'
import ForgetPasswordReducer from './slices/UserSlices/ForgetPasswordSlice'
import ChangeUsernameReducer from './slices/ProfileSlices/ChangeUsernameSlice'
import ChangePasswordReducer from './slices/ProfileSlices/ChangePasswordSlice'
import FetchAllUserAdminReducer from './slices/AdminSlices/FetchAllUsersAdminSlice'
import EditProfileAdminReducer from './slices/AdminSlices/EditProfileSlice'
import DeleteUserAdminReducer from './slices/AdminSlices/DeleteUserAdminSlice'
import ChangeBioReducer from './slices/ProfileSlices/ChangeBio'
import ShowListReducer from './slices/RequestSlices/ShowList'
import ShowSingleUserReducer from './slices/RequestSlices/ShowSingleUserSlice'
import FollowReducer from './slices/RequestSlices/FollowSlice'
import ChangeProfilePictureReducer from './slices/ProfileSlices/ChangeProfilePictureSlice'
import PostImageReducer from './slices/ProfileSlices/PostImageSlice'
const store = configureStore({
    reducer:{
        SignupReducer,
        LoginReducer,
        FetchUserReducer,
        LogoutUserReducer,
        ForgetPasswordReducer,
        ChangeUsernameReducer,
        ChangePasswordReducer,
        FetchAllUserAdminReducer,
        EditProfileAdminReducer,
        DeleteUserAdminReducer,
        ChangeBioReducer,
        ShowListReducer,
        ShowSingleUserReducer,
        FollowReducer,
        PostImageReducer,
        ChangeProfilePictureReducer,
        
    }
})

export default store;