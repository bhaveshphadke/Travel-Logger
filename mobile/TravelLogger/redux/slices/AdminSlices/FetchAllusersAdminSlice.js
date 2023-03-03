import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, InternalServerError, LoadingText } from "../constant";

export const FetchAllusersAdmin = createAsyncThunk(
    'fetchalluser',async()=>{
        const token = await AsyncStorage.getItem('token')
        
        const config = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'token':token
            }
        }
        const response = await fetch(`${host}/mobile/admin/fetchallusers`,config)
        console.log(`${host}/admin/mobile/fetchallusers`);
        const data = await response.json()
        console.log(data);
        return data;
    }
)

const FetchAlluserAdminReducer = createSlice({
    name:"fetchallusersadmin",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FetchAllusersAdmin.fulfilled,(state,action)=>{
            console.log(action);
            state.loading=false
            state.message = action.payload.message
            state.success = action.payload.success
            state.users = action.payload.users
        })
        .addCase(FetchAllusersAdmin.pending,(state,action)=>{
            state.loading=true
            state.message = LoadingText
            state.success = false
        })
        .addCase(FetchAllusersAdmin.rejected,(state,action)=>{
            state.loading=false
            state.message = InternalServerError
            state.success = false
        })
    }
})

export default FetchAlluserAdminReducer.reducer