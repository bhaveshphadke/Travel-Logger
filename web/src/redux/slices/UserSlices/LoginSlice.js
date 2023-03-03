import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {host} from '../constant'
export const LoginUser = createAsyncThunk(
    'loginuser',async(userdata)=>{
        const config = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:"include",
            body:JSON.stringify(userdata)
        }
        console.log(1);
        console.log(userdata);
console.log();
        const response = await fetch(`${host}/web/login`,config);
        const data = await response.json()
        console.log(9);
        return data;
    }
)

const LoginReducer = createSlice({
    name:"LoginUser",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(LoginUser.fulfilled,(state,action)=>{
            console.log(action);
            state.loading=false
            state.message=action.payload.message
            state.success=action.payload.success
        })
        .addCase(LoginUser.pending,(state,action)=>{
            state.loading=true
            state.message='Loading'
            state.success=false
        })
        .addCase(LoginUser.rejected,(state,action)=>{
            state.loading=false
            state.message="Internal Server Error"
            state.success = false
        })
    }
})

export default LoginReducer.reducer