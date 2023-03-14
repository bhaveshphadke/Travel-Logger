import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './slices/UserSlices/LoginSlice'
import FetchUserReducer from './slices/UserSlices/FetchUserSlice'
import SignupUserReducer from './slices/UserSlices/SignupSlice'
import ForgetPasswordReducer from './slices/UserSlices/ForgetPasswordSlice'
import ChangePasswordReducer from './slices/UserSlices/ChangePasswordSlice'
import ChangeUsernameReducer from './slices/UserSlices/ChangeUsernameSlice'
import FetchAlluserAdminReducer from './slices/AdminSlices/FetchAllusersAdminSlice'
import ToastReducer from './slices/UtilsSlices/ToastReducer'
const store = configureStore({
    reducer:{
        LoginReducer,
        FetchUserReducer,
        SignupUserReducer,
        ForgetPasswordReducer,
        ChangePasswordReducer,
        ChangeUsernameReducer,
        FetchAlluserAdminReducer,
        ToastReducer
    }
})

export default store;