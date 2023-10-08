"use client"


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const getData = createAsyncThunk("data/getData" , async ()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
})




const initialState = {
    post : [] ,
    products : [],
    loading : true , 
    error : null ,
}

const Slice = createSlice({
    name : "data" , 
    initialState,
    reducers : {
        AddToCart : (state , action) =>{
            let isInCart = state.products.some(el=>el.id===action.payload.id);
            let findInd = state.products.find(el=>el.id === action.payload.id)

            if(isInCart){
                state.products.map(el=>{
                    if(el.id===action.payload.id){
                        el.quantity = Number(el.quantity) + 1;
                        
                    }
                    return el
                })
            }else{
                state.products.push(action.payload)
            }
        }
    },
    extraReducers:{
        [getData.fulfilled] : (state , action) =>{
            state.post = action.payload;
            state.loading = false;
            state.error = null;
        } ,
        [getData.pending] : (state , action)=>{
            state.loading = true;
            state.error = null;
        } , 
        [getData.rejected] : (state , action) =>{
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const {AddToCart} = Slice.actions;
export default Slice.reducer;