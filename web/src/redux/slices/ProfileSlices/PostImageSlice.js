import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host,internalservererror } from "../constant";

export const PostImageFunction = createAsyncThunk(
    'postimage', async ({ image, title, description }) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            credentials: 'include',
            body: JSON.stringify({ image,title,description})
        }

        const response = await fetch(`${host}/request/post`, config)
        const data = await response.json()
        return data
    }
)

const PostImageReducer = createSlice({
    name: 'postimage',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PostImageFunction.fulfilled, (state, action) => {
                state.loading = false
                // state.message = action.payload.message
                state.success = action.payload.success
            })
            .addCase(PostImageFunction.pending, (state, action) => {
                state.loading = true
                state.message = 'Loading'
                state.success = false
            }).addCase(PostImageFunction.rejected, (state, action) => {
                state.loading = false
                state.message = internalservererror
                state.success = false
            })
    }
})



export default PostImageReducer.reducer