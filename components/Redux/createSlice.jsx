"use client"


const { createSlice } = require("@reduxjs/toolkit");



const initialState = {
    num : 0
}

const Slice = createSlice({
    name : "counter" , 
    initialState,
    reducers : {
        increament : (state , action) =>{
            state.num++
        } ,
        decreament : (state , action) =>{
            state.num--
        }
    }
})


export const {increament , decreament} = Slice.actions;
export default Slice.reducer;