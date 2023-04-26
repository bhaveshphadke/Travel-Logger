const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { host, internalservererror } = require("../constant");

export const FollowFucntion = createAsyncThunk(
    'follow',async(id)=>{
        const config = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({id})
        }

        const response = await fetch(`${host}/request/follow`,config)
        const data = await response.json()
        return data;
    }
)


const FollowReducer= createSlice({
    name:"follow",
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(FollowFucntion.fulfilled,(state,action)=>{
            state.loading=false
            state.message = action.payload.message
            state.success = action.payload.success
            state.user = action.payload.user
        })
        .addCase(FollowFucntion.pending,(state,action)=>{
            state.loading=true
            state.message = 'Loading'
            state.success = false
        })
        .addCase(FollowFucntion.rejected,(state,action)=>{
            state.loading=false
            state.message = internalservererror
            state.success =false
        })
    }
})


export default FollowReducer.reducer;