import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host } from "../constant";

export const ForgetPassword = createAsyncThunk(
    'forgetpassword',async({username})=>{
        const token = await AsyncStorage.getItem('token');
        const config = {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'token':token
            },
            credentials:'include',
            body:JSON.stringify({username})
        }

        const response = await fetch(`${host}/mobile/forgetpassword`,config)
        const data = await response.json()
        return data;
    }
)

const ForgetPasswordReducer = createSlice({
    name:"foregetpassword",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ForgetPassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.message = action.payload.message
            state.success = action.payload.success
        })
        .addCase(ForgetPassword.pending,(state,action)=>{
            state.loading=true,
            state.message = 'Loading'
            state.success = false
        })
        .addCase(ForgetPassword.rejected,(state,action)=>{
            state.loading=false,
            state.message = 'Internal Server Error'
            state.success = false
        })
    }
})

export default ForgetPasswordReducer.reducer