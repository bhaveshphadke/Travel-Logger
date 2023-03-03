import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host } from '../constant'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const LoginUser = createAsyncThunk(
    'loginuser', async (userdata) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(userdata)
        }
        console.log(1);
        const response = await fetch(`${host}/mobile/login`, config);
        console.log(`${host}/mobile/login`);
        const data = await response.json()
        console.log(1);
        if(data.success){
            await AsyncStorage.setItem('token',data.token || null)
        }
        return data;
    }
)

const LoginReducer = createSlice({
    name: "LoginUser",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
            state.token = action.payload.token || ""
        })
            .addCase(LoginUser.pending, (state, action) => {
                state.loading = true
                state.message = 'Loading'
                state.success = false
            })
            .addCase(LoginUser.rejected, (state, action) => {

                state.loading = false
                state.message = "Internal Server Error"
                state.success = false
            })
    }
})

export default LoginReducer.reducer