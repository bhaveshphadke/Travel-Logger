import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host } from "../constant";

export const ChangeBio = createAsyncThunk(
    'changebio', async({description,link})=>{
        console.log(description);
        console.log(link);
         
        const token = await AsyncStorage.getItem('token')
        const config = {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'token':token
            },
            body:JSON.stringify({description,link})
        }

        const response = await fetch(`${host}/mobile/changebio`,config)
        const data = await response.json()

        return data;

    }
)


const ChangeBioReducer = createSlice({
    name:'ChangeBio',
    initialState:{},
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ChangeBio.fulfilled,(state,action)=>{
            state.loading=false
            state.message  = action.payload.message
            state.success = action.payload.success
        })
        .addCase(ChangeBio.pending,(state,action)=>{
            state.loading=true
            state.message  = 'Loading'
            state.success = false
        })
        .addCase(ChangeBio.rejected,(state,action)=>{
            state.loading=false
            state.message  = InternalServerError
            state.success = false
        })
    }
})

export default ChangeBioReducer.reducer