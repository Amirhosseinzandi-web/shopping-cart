"use client"

import { document } from "postcss";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export const getData = createAsyncThunk("data/getData", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
})




const initialState = {
    post: [],
    products: [],
    loading: true,
    error: null,
    sum: []
}

const Slice = createSlice({
    name: "data",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            let isInCart = state.products.some(el => el.id === action.payload.id);
            const { id, operation } = action.payload;
            const productToUpdate = state.products.find(el => el.id === id);

            if (isInCart) {
                productToUpdate.operation = operation;
                productToUpdate.quantity += Number(operation);
                // productToUpdate.total = productToUpdate.price * productToUpdate.quantity;

                if (productToUpdate.quantity === 0) {
                    let index = state.products.findIndex(el => el.id === id);
                    state.products.splice(index, 1);
                }

               

            } else {
                state.products.push(action.payload);
                
            }
        }
    },
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
            state.post = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getData.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export const { AddToCart } = Slice.actions;
export default Slice.reducer;