"use client"

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/createSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AddToCart } from "../Redux/createSlice";





const FetchData = () => {
    const [state, setState] = useState([]);
    const { post, loading , products} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [])


    const QuantityHandler = (e,item) => {
        const _newData = {
            id : item.id ,
            quantity: e.currentTarget.parentElement.parentElement.querySelector("p").innerText
        }
        dispatch(AddToCart(_newData))
        console.log(products);
    }





    if (loading) {
        return <h2>loading...</h2>
    }

    return (
        <section className="product-items">
            {
                post.map((item) => (
                    <div key={item.id} className="flex my-6">
                        <div className="w-[45%] flex">
                            <div className="w-[70%] flex">
                                <div className=" w-[25%] flex items-center">
                                    <figure>
                                        <Image priority={true} width={75} height={75} alt={item.title} src={item.image} />
                                    </figure>
                                </div>

                                <div className=" w-[70%] flex items-center">
                                    <section className="product-description">
                                        <p className="capitalize">{item.category}</p>
                                        <p className="my-2">{item.title}</p>
                                        <p>{item.description}</p>
                                    </section>
                                </div>
                            </div>

                            <div className="w-[30%] flex items-center">
                                <p className="product-items-style">{item.category}</p>
                            </div>
                        </div>


                        <div className="w-[55%] flex">
                            <div className="w-[25%] flex items-center">
                                <p className="product-items-style">{item.rating.rate}</p>
                            </div>

                            <div className="w-[25%] flex items-center quantity-tab">
                                <div><button onClick={(e)=>QuantityHandler(e,item)}>-</button></div>
                                <p className="product-items-style mx-3">0</p>
                                <div><button onClick={(e)=>QuantityHandler(e,item)}>+</button></div>
                            </div>

                            <div className="w-[25%] text-center flex items-center justify-center">
                                <p className="product-items-style">Free shipping</p>
                            </div>

                            <div className="w-[25%] flex items-center justify-end">
                                <p className="product-items-style">{item.price}</p>
                            </div>

                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default FetchData;