import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {host} from '../constant'
export const SignupUser = createAsyncThunk(
    'signup', async (userdata) => {
        const config = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({...userdata})
        }
        const response = await fetch(`${host}/web/signup`,config)
        const data = await response.json()
        return data
    }
)

const SignupReducer = createSlice({
    name: "signup",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SignupUser.fulfilled, (state, action) => {
                if(action.payload.success===true){
                    localStorage.setItem('token',JSON.stringify(action.payload.token))
                }
                state.loading = false
                state.success=action.payload.success
                state.message=action.payload.message
            })
            .addCase(SignupUser.pending, (state, action) => {
                state.loading = true
                state.success = false
                state.message = "Loading"

            })
            .addCase(SignupUser.rejected, (state, action) => {
                state.loading = false
                state.message = "Internal Sever Error"
                state.success =  false

            })
    }
})

export default SignupReducer.reducer;