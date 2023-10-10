"use client"

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/createSlice";
import { useEffect } from "react";
import Image from "next/image";
import { AddToCart } from "../Redux/createSlice";





const FetchData = () => {
    const { post, loading , products } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [])


    const QuantityHandler = (e,item,op) => {
        
        const _newData = {
            id : item.id ,
            quantity: Number(e.currentTarget.parentElement.parentElement.querySelector(".first-val").value),
            operation : op ,
            price : e.currentTarget.parentElement.parentElement.parentElement.querySelector(".price").innerText,
            total : Number(e.currentTarget.parentElement.parentElement.parentElement.querySelector(".price").innerText) * Number(e.currentTarget.parentElement.parentElement.querySelector(".first-val").value)
        }
        dispatch(AddToCart(_newData))

        let _count = e.currentTarget.parentElement.parentElement.querySelector(".count")


        if(e.currentTarget.innerText === "+"){
            _count.innerText = Number(_count.innerText) + 1;
            e.currentTarget.parentElement.parentElement.querySelector(".minusBtn").classList.remove("pointer-events-none")
        }
        if(e.currentTarget.innerText === "-"){
            _count.innerText = Number(_count.innerText) - 1
            if(_count.innerText < 1){
                e.currentTarget.parentElement.parentElement.querySelectorAll(".minusBtn").forEach(item=>{
                    item.classList.remove("pointer-events-none")
                })
               e.currentTarget.classList.add("pointer-events-none")
            }
        }

    }




    if (loading) {
        return <h2>loading...</h2>
    }

    return (
        <section className="product-items">
            {
                post.map((item) => (
                    <div key={item.id} id={item.id} className="flex my-6">
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
                                <div><button className="minusBtn pointer-events-none" onClick={(e)=>QuantityHandler(e,item,-1)}>-</button></div>
                                <p className="product-items-style mx-3 count">0</p>
                                <input type="text" className="hidden first-val" value="1" />
                                <div><button className="plusBtn" onClick={(e)=>QuantityHandler(e,item,1)}>+</button></div>
                            </div>

                            <div className="w-[25%] text-center flex items-center justify-center">
                                <p className="product-items-style">Free shipping</p>
                            </div>

                            <div className="w-[25%] flex items-center justify-end">
                                <p className="product-items-style price">{item.price}</p>
                            </div>

                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default FetchData;