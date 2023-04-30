import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const EditProfileAdmin = createAsyncThunk(
    'EditProfileadmin',async({...userdata})=>{
        const config = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':localStorage.getItem('token')
            },
            credentials:'include',
            body:JSON.stringify({...userdata})
        }

        const response = await fetch(`${host}/web/admin/editprofile`,config)
        const data = await response.json()

        return data;
    }
)


const EditProfileAdminReducer = createSlice({
    name:'ceditprofileadmin',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(EditProfileAdmin.fulfilled,(state,action)=>{
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
        })
        .addCase(EditProfileAdmin.pending,(state,action)=>{
            state.loading = true
            state.message = 'Loading'
            state.success = false
        })
        .addCase(EditProfileAdmin.rejected,(state,action)=>{
            state.loading = false
            state.message = internalservererror
            state.success = false
        })
    }
})

export default EditProfileAdminReducer.reducer