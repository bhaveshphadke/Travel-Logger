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
        ChangeBioReducer
    }
})

export default store;