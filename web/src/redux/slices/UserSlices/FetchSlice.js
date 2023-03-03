import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {host} from '../constant'
export const FetchUser = createAsyncThunk(
    'fetchuser',async()=>{
        const response = await fetch(`${host}/web/fetchuser`,{
            credentials:'include'
        });
        const data = await response.json()
        return data;
    }
)

const FetchUserReducer = createSlice({
    name:"FetchUser",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchUser.fulfilled,(state,action)=>{
            state.loading=false
            state.message='Logged IN'
            state.success=action.payload.success
            state.user = action.payload.user
        })
        .addCase(FetchUser.pending,(state,action)=>{
            state.loading=true
            state.message='Loading'
            state.success=false
        })
        .addCase(FetchUser.rejected,(state,action)=>{
            state.loading=false
            state.message="Internal Server Error"
            state.success = false
        })
    }
})

export default FetchUserReducer.reducer