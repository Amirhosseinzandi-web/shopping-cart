"use client"

import { Provider } from 'react-redux';
import Store from './Store';
import { useEffect, useState } from 'react';


const Providers = ({children}) =>{
    return(
        <Provider store={Store}>
            {children}
        </Provider>
    )
}


export default Providers;