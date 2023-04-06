import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { host, internalservererror } = require("../constant");
export const ShowSingleUserFunction = createAsyncThunk(
    'showuser',async(username)=>{
        const config = {
            method:'GET',
            credentials:'include'
        }

        const response = await fetch(`${host}/request/${username}`,config)
        const data = await response.json()

        return data;
    }
)


const ShowSingleUserReducer = createSlice({
    name:'showuser',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ShowSingleUserFunction.fulfilled,(state,action)=>{
            state.loading=false
            state.message = action.payload.message
            state.success = action.payload.success
            state.user = action.payload.user
        })
        .addCase(ShowSingleUserFunction.pending,(state,action)=>{
            state.loading=true
            state.message = 'Loading'
            state.success = false
        })
        .addCase(ShowSingleUserFunction.rejected,(state,action)=>{
            state.loading=false
            state.message = internalservererror
            state.success =false
        })
    }
})

export default ShowSingleUserReducer.reducer