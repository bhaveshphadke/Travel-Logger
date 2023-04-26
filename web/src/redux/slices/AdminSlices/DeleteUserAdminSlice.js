import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const DeleteUserAdmin = createAsyncThunk(
    'deleteuseradmin', async(id)=>{
        const config = {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'token': localStorage.getItem('token')
            },
            credentials:'include',
            body:JSON.stringify({id})
        }

        const response = await fetch(`${host}/web/admin/deleteuser`,config)
        const data = await response.json()
        console.log(data);
        return data
    }
)

const DeleteUserAdminReducer = createSlice({
    name:"DeleteUser",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(DeleteUserAdmin.fulfilled,(state,action)=>{
            state.loading=false
            state.message = action.payload.message
            state.success = action.payload.success
        })
        .addCase(DeleteUserAdmin.pending,(state,action)=>{
            state.loading=true
            state.message = "Loading"
            state.success = false
        })
        .addCase(DeleteUserAdmin.rejected,(state,action)=>{
            state.loading=false
            state.message = internalservererror
            state.success = false
        })
    }
})

export default DeleteUserAdminReducer.reducer;