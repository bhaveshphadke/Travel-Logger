import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {host} from '../constant'
export const ForgetPasswordFunc = createAsyncThunk(
    'forgetpasswordfunc', async (username) => {
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            credentials: 'include',
            body: JSON.stringify({ username })
        }

        const response = await fetch(`${host}/web/forgetpassword`, config)

        const data = await response.json()
        return data
    }

)

export const SetForgottenPsswordFunc = createAsyncThunk(
    'setforgottenpasswordfunc', async({password,token})=>{
        const config = {
            method:"PUT",
            headers:{
               'Content-Type': 'application/json'
            },
            credentials:'include',
            body:JSON.stringify({password,token})
        }
        console.log(1);

        const response = await fetch(`${host}/web/forgetpassword/${token}`,config)
        console.log(1);
        const data = await response.json()
        return data;
    }
)
const ForgetPasswordReducer = createSlice({
    name: 'forgetpassword',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ForgetPasswordFunc.fulfilled,(state,action)=>{
            state.success= action.payload.success
            state.message= action.payload.message
            state.loading= false
        })
        .addCase(ForgetPasswordFunc.pending,(state,action)=>{
            state.success= false
            state.message= "Loading"
            state.loading= true
        })
        .addCase(ForgetPasswordFunc.rejected,(state,action)=>{
            state.success= false
            state.message= "Internal Server Error!!"
            state.loading= false
        })
        .addCase(SetForgottenPsswordFunc.fulfilled,(state,action)=>{
            console.log(action.payload.message);
            state.success= action.payload.success
            state.message= action.payload.message
            state.loading= false
        })
        .addCase(SetForgottenPsswordFunc.pending,(state,action)=>{
            state.success= false
            state.message= "Loading"
            state.loading= true
        })
        .addCase(SetForgottenPsswordFunc.rejected,(state,action)=>{
            state.success= false
            state.message= "Internal Server Error!!"
            state.loading= false
        })
    }
})

export default ForgetPasswordReducer.reducer