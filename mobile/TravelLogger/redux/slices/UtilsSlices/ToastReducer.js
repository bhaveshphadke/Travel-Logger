import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ToastReducer = createSlice({
    name: 'toastreducer',
    initialState: {
        message:''
    },
    reducers: {
        toast(state, action) {
            state.message = action.payload
        }
    }
})

export default ToastReducer.reducer
export const {toast} = ToastReducer.actions