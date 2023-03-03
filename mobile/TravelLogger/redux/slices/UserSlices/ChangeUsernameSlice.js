import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, InternalServerError, LoadingText } from "../constant";

export const ChangeUsername = createAsyncThunk(
    'changeusername',async({username,oldUsername})=>{
        const token = await AsyncStorage.getItem('token')
        const config = {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body:JSON.stringify({newUsername:username,oldUsername})
        }
        const response =await fetch(`${host}/mobile/changeusername`,config)
        console.log(1);
        const data = await response.json()

        return data;
    }
)

const ChangeUsernameReducer = createSlice({
    name:'changeusername',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ChangeUsername.fulfilled,(state,action)=>{
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
        })
        .addCase(ChangeUsername.pending,(state,action)=>{
            state.loading = true
            state.message = LoadingText
            state.success = false
        })
        .addCase(ChangeUsername.rejected,(state,action)=>{
            state.loading = false
            state.message = InternalServerError
            state.success = false
        })
    }
})

export default ChangeUsernameReducer.reducer