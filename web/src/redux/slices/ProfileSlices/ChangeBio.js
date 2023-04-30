import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const ChangeBio = createAsyncThunk(
    'changebio', async ({description, link}) => {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'token':localStorage.getItem('token')
            },
            credentials: 'include',
            body: JSON.stringify({ description, link })
        }
console.log(link);
        const response = await fetch(`${host}/web/changebio`,config)
        const data = await response.json()
        return data
    }
)

const ChangeBioReducer = createSlice({
    name: "changebio",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ChangeBio.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
            state.message = action.payload.message
        })
        .addCase(ChangeBio.pending,(state,action)=>{
            state.loading = true
            state.success = false
            state.message = 'Loading'
        })
        .addCase(ChangeBio.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.message = internalservererror
        })
    }
})

export default ChangeBioReducer.reducer