import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host } from "../constant";

export const SignupUser = createAsyncThunk(
    'signupuser', async ({ username, email, password, avatar }) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password, avatar })
        }

        const response = await fetch(`${host}/mobile/signup`, config)

        const data = await response.json()
        if(data.success){
            await AsyncStorage.setItem('token',data.token)
        }
        return data;
    }
)

const SignupUserReducer = createSlice({
    name: "signupuser",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SignupUser.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
            state.token = action.payload.token
        })
            .addCase(SignupUser.pending, (state, action) => {
                state.loading = true
                state.message = 'Loading'
                state.success = false
            })
            .addCase(SignupUser.rejected, (state, action) => {
                state.loading = false
                state.message = 'Internal server Error'
                state.success = false
            })
    }
})

export default SignupUserReducer.reducer