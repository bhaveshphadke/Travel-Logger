import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const ChangePassword = createAsyncThunk(
    'changepassword',async({password})=>{
        const config = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({newPassword:password})
        }

        const response = await fetch(`${host}/web/changepassword`,config)
        const data = await response.json()
        return data
    }
)

const ChangePasswordReducer = createSlice({
    name:'ChangePassword',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ChangePassword.fulfilled,(state,action)=>{
            state.loading=false
            state.message= action.payload.message
            state.success= action.payload.success
        })
        .addCase(ChangePassword.pending,(state,action)=>{
            state.loading=true
            state.message= 'Loading'
            state.success= false
        }).addCase(ChangePassword.rejected,(state,action)=>{
            state.loading=false
            state.message= internalservererror
            state.success= false
        })
    }
})

export default ChangePasswordReducer.reducer