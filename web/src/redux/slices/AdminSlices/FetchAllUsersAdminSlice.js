import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, internalservererror } from "../constant";

export const FetchAllUsersAdmin = createAsyncThunk(
    'fetchallusersadmin', async () => {
        const config = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type':'application/json',
                'token':localStorage.getItem('token')
            }
        }

        const response = await fetch(`${host}/web/admin/fetchallusers`, config)
        const data = await response.json()

        return data
    }
)

const FetchAllUserAdminReducer = createSlice({
    name: 'fetchallusersadmin',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FetchAllUsersAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
            state.users = action.payload.users
        })
            .addCase(FetchAllUsersAdmin.pending, (state, action) => {
                state.loading = true
                state.message = 'Loading'
                state.success = false
            })
            .addCase(FetchAllUsersAdmin.rejected, (state, action) => {
                state.loading = false
                state.message = internalservererror
                state.success = false
            })
    }
})

export default FetchAllUserAdminReducer.reducer