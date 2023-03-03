import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, InternalServerError, LoadingText } from "../constant";

export const ChangePassword = createAsyncThunk(
    'changepassword', async ({password}) => {
        const token = await AsyncStorage.getItem('token')
        const config = {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ newPassword: password })
        }
        console.log(password);
        const response = await fetch(`${host}/mobile/changepassword`, config)

        const data = await response.json()

        return data;
    }
)

const ChangePasswordReducer = createSlice({
    name: 'changepassword',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ChangePassword.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
        })
            .addCase(ChangePassword.pending, (state, action) => {
                state.loading = true
                state.message = LoadingText
                state.success = false
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.loading = false
                state.message = InternalServerError
                state.success = false
            })
    }
})

export default ChangePasswordReducer.reducer