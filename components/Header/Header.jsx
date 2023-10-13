"use client"


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const Header = () => {
    const { products } = useSelector(state => state.app);
    const [state, setState] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let windowScroll = document.documentElement.scrollTop;
            let header = document.querySelector("header");
            let headerHeight = header.offsetHeight;

           
                header.classList.toggle("sticky-header" , windowScroll > Number(headerHeight) + 50);
            
        });
    }, [state]);


    return (
        <header>
            <section className="container mx-auto px-16 py-7">
                <div className="flex justify-between">
                    <h2>TEMPLATE</h2>
                    <h2>SHOPPING BAG (<span>{products.length}</span>)</h2>
                </div>
            </section>
        </header>
    );
}

export default Header;