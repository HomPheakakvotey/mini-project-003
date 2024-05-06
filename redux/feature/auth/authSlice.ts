import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

const initialState = {
    token: null as string | null,
};

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:({
        setAccessToken(state,action:PayloadAction<string>)
        {
           state.token=action.payload;
        }
    })
});
export const {setAccessToken} = authSlice.actions;
export const selectToken= ((state:RootState)=>state.auth.token)
export default authSlice.reducer;