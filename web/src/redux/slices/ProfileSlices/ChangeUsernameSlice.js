import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const ChangeUsername = createAsyncThunk(
    'ChangeUsername',async({username,oldUsername})=>{
        const config = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':JSON.parse(localStorage.getItem('token'))
            },
            credentials:'include',
            body:JSON.stringify({newUsername:username,oldUsername})
        }

        const response = await fetch(`${host}/web/changeusername`,config)
        const data = await response.json()
        return data
    }
)

const ChangeUsernameReducer = createSlice({
    name:'changeusername',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(ChangeUsername.fulfilled,(state,action)=>{
            state.loading=false
            state.message= action.payload.message
            state.success= action.payload.success
        })
        .addCase(ChangeUsername.pending,(state,action)=>{
            state.loading=true
            state.message= 'Loading'
            state.success= false
        }).addCase(ChangeUsername.rejected,(state,action)=>{
            state.loading=false
            state.message= internalservererror
            state.success= false
        })
    }
})



export default ChangeUsernameReducer.reducer