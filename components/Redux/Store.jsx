"use client"


const { configureStore } = require("@reduxjs/toolkit");
import Slice from "../Redux/createSlice"



const Store = configureStore({
    reducer:{
        app : Slice
    }
})


export default Store