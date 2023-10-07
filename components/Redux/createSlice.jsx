"use client"


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const getData = createAsyncThunk("data/getData" , async ()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
})




const initialState = {
    post : [] ,
    status : ""
}

const Slice = createSlice({
    name : "data" , 
    initialState,
    extraReducers:{
        [getData.fulfilled] : (state , action) =>{
            state.status = "fullfield" ; 
            state.post = action.payload;
        } ,
        [getData.pending] : (state , action)=>{
            state.status = "pending"
        } , 
        [getData.rejected] : (state , action) =>{
            state.status = "rejected";
        }
    }
})


export const {increament , decreament} = Slice.actions;
export default Slice.reducer;