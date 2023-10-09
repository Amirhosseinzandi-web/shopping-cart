"use client"

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/createSlice";
import { useEffect } from "react";
import Image from "next/image";
import { AddToCart } from "../Redux/createSlice";





const FetchData = () => {
    const { post, loading , products , loc} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [])


    const QuantityHandler = (e,item,op) => {
        
        const _newData = {
            id : item.id ,
            quantity: 0 ,
            operation : op
        }
        dispatch(AddToCart(_newData))
        
        let MinusBtn = document.querySelector(".minusBtn");
        let PlusBtn = document.querySelector(".plusBtn");
        if(e.currentTarget === PlusBtn){
            MinusBtn.style.pointerEvents = "auto"
        }
        if(MinusBtn.parentElement.nextElementSibling.innerText<2){
            MinusBtn.style.pointerEvents = "none"
        }
    }




    useEffect(() => {
      if (loc) {
        const element = document.querySelector(`.product-items div[id="${loc.id}"] .count`);
        if (element) {
          element.innerText = loc.quantity;
        }
      } else {

        const element = document.querySelector(`.product-items .count`);
        if (element) {
          element.innerText = 0;
        }
      }
    }, [products, loc]);   


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
                                <div><button className="minusBtn" onClick={(e)=>QuantityHandler(e,item,-1)}>-</button></div>
                                <p className="product-items-style mx-3 count">0</p>
                                <div><button className="plusBtn" onClick={(e)=>QuantityHandler(e,item,1)}>+</button></div>
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