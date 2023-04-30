import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const ChangeProfilePicture = createAsyncThunk(
    'ChangeProfilePicture', async (avatar) => {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'token':localStorage.getItem('token')
            },
            credentials: 'include',
            body: JSON.stringify({ avatar })
        }
        const response = await fetch(`${host}/web/changeprofilepicture`, config)
        const data = await response.json()
        return data
    }
)

const ChangeProfilePictureReducer = createSlice({
    name: "ChangeProfilePicture",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ChangeProfilePicture.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.message = action.payload.message
        })
            .addCase(ChangeProfilePicture.pending, (state, action) => {
                state.loading = true
                state.success = false
                state.message = 'Loading'
            })
            .addCase(ChangeProfilePicture.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.message = internalservererror
            })
    }
})

export default ChangeProfilePictureReducer.reducer