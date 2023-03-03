import { configureStore } from '@reduxjs/toolkit';
import SignupReducer from './slices/UserSlices/SignupSlice'
import LoginReducer from './slices/UserSlices/LoginSlice'
import FetchUserReducer from './slices/UserSlices/FetchSlice'
import LogoutUserReducer from './slices/UserSlices/LogoutSlice'
import ForgetPasswordReducer from './slices/UserSlices/ForgetPasswordSlice'
import ChangeUsernameReducer from './slices/UserSlices/ChangeUsernameSlice'
import ChangePasswordReducer from './slices/UserSlices/ChangePasswordSlice'
import FetchAllUserAdminReducer from './slices/AdminSlices/FetchAllUsersAdminSlice'
import EditProfileAdminReducer from './slices/AdminSlices/EditProfileSlice'
import DeleteUserAdminReducer from './slices/AdminSlices/DeleteUserAdminSlice'
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
        DeleteUserAdminReducer
    }
})

export default store;