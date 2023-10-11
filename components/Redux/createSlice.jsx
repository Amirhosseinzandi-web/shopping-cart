"use client"



const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const getData = createAsyncThunk("data/getData", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
})




const initialState = {
    post: [],
    products: [],
    loading: true,
    error: false,
    sum: [] , 
}

const Slice = createSlice({
    name: "data",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            let isInCart = state.products.some(el => el.id === action.payload.id);
            
            const { id, operation } = action.payload;
            const productToUpdate = state.products.find(el => el.id === id);

            // state.isYetInCart = isInCart;

            if (isInCart) {
                productToUpdate.operation = operation;
                productToUpdate.quantity += Number(operation);
                productToUpdate.total = productToUpdate.price * productToUpdate.quantity;
                productToUpdate.hast = true
               
                

                if (productToUpdate.quantity === 0) {
                    productToUpdate.hast = false;
                    let index = state.products.findIndex(el => el.id === id);
                    state.products.splice(index, 1);
                    
                }

               

            } else {
                state.products.push(action.payload);
            }

            let sum = state.products.reduce((acc, el) => acc + el.total, 0);
            state.sum = sum.toFixed(2);
        }
    },
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
            state.post = action.payload;
            state.loading = false;
            state.error = false;
        },
        [getData.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getData.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        }
    }
})


export const { AddToCart } = Slice.actions;
export default Slice.reducer;