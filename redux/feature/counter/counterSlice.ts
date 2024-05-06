import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
type CounterState = {
    value: number;
    };

 const initailState: CounterState = {
    value: 0,
 }   

export const counter = createSlice({
   name:'counter',
   initialState:initailState,
    reducers:{
         increment:(state)=>{
              state.value += 1;
         },
         decrement:(state)=>{
              state.value -= 1;
         },
         incrementByAmount:(state, action)=>{
              state.value += action.payload;
         }
    }
})

export const {increment, decrement, incrementByAmount} = counter.actions;

export default counter.reducer;

export const selectCount = (state:RootState) => state.counter.value;