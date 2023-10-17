"use client"


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingBag from "../ShoppingBag/ShoppingBag";



const Header = () => {
    const { products } = useSelector(state => state.app);
    const [showShopBag, setShowShopBag] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let windowScroll = document.documentElement.scrollTop;
            let header = document.querySelector("header");
            let headerHeight = header.offsetHeight;


            header.classList.toggle("sticky-header", windowScroll > Number(headerHeight) + 50);

        });
    }, []);


    useEffect(() => {
        window.addEventListener("click", () => {
            if (showShopBag) {
                setShowShopBag(false);
            }
        })

       const _shop = document.querySelector(".shopping-bag");
       if(_shop){
        _shop.addEventListener("click" , (e)=>{
            e.stopPropagation()
        })
       }

    }, [showShopBag])

    const showShoppHandler = (e) => {
        e.stopPropagation();
        setShowShopBag(!showShopBag);
    }


    return (
        <header>
            <section className="container mx-auto px-16 py-7">
                <div className="flex justify-between">
                    <h2>TEMPLATE</h2>
                    <h2 className="select-none cursor-pointer" onClick={showShoppHandler}>SHOPPING BAG (<span>{products && products.length}</span>)</h2>
                    {
                        showShopBag && <ShoppingBag />
                    }
                </div>
            </section>
        </header>
    );
}

export default Header;