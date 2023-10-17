"use client"

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";



const ShoppingBag = () => {
    const { products } = useSelector(state => state.app)
    const dispatch = useDispatch()


    return (
        <section className="shopping-bag p-5">
            <div className="px-5">
            <p className={`product-items-style ${ products && products.length<1 ? ("block") : ("hidden")}`}>Nothing to show ...</p>
                {
                    products && products.map((item) => (
                        <div key={item.id} className="py-3">
                            <figure>
                                <Image priority={true} width={50} height={50} alt={item.id} src={item.src} />
                            </figure>
                            <p className="product-items-style">name : {item.name}</p>
                            <p className="product-items-style">Quantity : {item.quantity}</p>
                            <p className="product-items-style">price : {item.price} $</p>                           
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default ShoppingBag;