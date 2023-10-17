"use client"

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/createSlice";
import { useEffect } from "react";
import Image from "next/image";
import { AddToCart, removeItem } from "../Redux/createSlice";




const FetchData = () => {
    const { post, loading, products, error } = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [])


    

    const QuantityHandler = (e, item, op) => {
        const parentElement = e.currentTarget.parentElement.parentElement.parentElement.parentElement
        const _newData = {
            name : parentElement.querySelector(".item-name").innerText ,
            id: item.id,
            quantity: Number(parentElement.querySelector(".first-val").value),
            operation: op,
            price: parentElement.querySelector(".price").innerText,
            total: Number(parentElement.querySelector(".price").innerText) * Number(parentElement.querySelector(".first-val").value),
            IsYetInCart: true , 
            src : parentElement.querySelector("figure>img").src
        }
        dispatch(AddToCart(_newData))
    }





    if (loading) {
        return <h2>loading...</h2>
    }
    if (error) {
        return <h2>an error occured</h2>
    }

    return (
        <section className="product-items">
            {
                post.map((item) => (
                    <div key={item.id} id={item.id} className="flex my-6 py-3">
                        <div className="w-[45%] flex">
                            <div className="w-[70%] flex">
                                <div className=" w-[25%] flex items-center">
                                    <figure>
                                        <Image priority={true} width={75} height={75} alt={item.title} src={item.image} />
                                    </figure>
                                </div>

                                <div className=" w-[70%] flex items-center">
                                    <section className="product-description">
                                        <p className="capitalize item-name">{item.category}</p>
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
                                <div>
                                    <button className={`minusBtn ${products.find((product) => product.id === item.id)?.IsYetInCart ? "" : "pointer-events-none"}`} onClick={(e) => QuantityHandler(e, item, -1)}>-</button>
                                </div>
                                <p className="product-items-style mx-3 count">
                                    {products.find((product) => product.id === item.id)?.quantity || 0}
                                </p>
                                <input type="text" className="hidden first-val" defaultValue="1" />
                                <div>
                                    <button
                                        className="plusBtn"
                                        onClick={(e) => QuantityHandler(e, item, 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="ml-3">
                                    <button onClick={() => dispatch(removeItem(item))}>
                                        <i className="bi bi-x-lg text-black"></i>
                                    </button>
                                </div>

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