const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { host, internalservererror } = require("../constant");

export const ShowListFucntion = createAsyncThunk(
    'showlist',async(query)=>{
        const config = {
            method:'GET',
            credentials:'include'
        }

        const response = await fetch(`${host}/request/list/${query}`,config)
        const data = await response.json()
        return data;
    }
)


const ShowListReducer= createSlice({
    name:"showlist",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ShowListFucntion.fulfilled,(state,action)=>{
            state.loading=false
            state.message = action.payload.message
            state.success = action.payload.success
            state.users = action.payload.users
        })
        .addCase(ShowListFucntion.pending,(state,action)=>{
            state.loading=true
            state.message = 'Loading'
            state.success = false
        })
        .addCase(ShowListFucntion.rejected,(state,action)=>{
            state.loading=false
            state.message = internalservererror
            state.success =false
        })
    }
})


export default ShowListReducer.reducer;