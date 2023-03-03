import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host } from "../constant";

export const FetchUser = createAsyncThunk(
    'fetchuser', async () => {
            const token = await AsyncStorage.getItem('token')
            const config = {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            }
            const response = await fetch(`${host}/mobile/fetchuser`, config)
            const data = await response.json()
            return data


    }
)

const FetchUserReducer = createSlice({
    name: "FetchUser",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.message = action.payload.message
            state.user = action.payload.user || undefined
        })
            .addCase(FetchUser.pending, (state, action) => {
                state.loading = true
                state.success = false
                state.message = 'Loading'
            })
            .addCase(FetchUser.rejected, (state, action) => {
                state.laoding = false
                state.message = "Internal server Error"
                state.success = false
            })
    }
})

export default FetchUserReducer.reducer