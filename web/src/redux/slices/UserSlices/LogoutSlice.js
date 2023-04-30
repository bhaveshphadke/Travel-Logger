import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {host} from '../constant'
export const LogoutUser = createAsyncThunk(
    'logoutuser',async()=>{
        const response = await fetch(`${host}/web/logout`,{
            credentials:'include'
        });
        const data = await response.json()
        return data;
    }
)

const LogoutUserReducer = createSlice({
    name:"LogoutUser",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(LogoutUser.fulfilled,(state,action)=>{
            if(action.payload.success===true){
                localStorage.removeItem('token')
            }
            state.loading=false
            state.message='Logged OUT'
            state.success=action.payload.success
        })
        .addCase(LogoutUser.pending,(state,action)=>{
            state.loading=true
            state.message='Loading'
            state.success=false
        })
        .addCase(LogoutUser.rejected,(state,action)=>{
            state.loading=false
            state.message="Internal Server Error"
            state.success = false
        })
    }
})

export default LogoutUserReducer.reducer