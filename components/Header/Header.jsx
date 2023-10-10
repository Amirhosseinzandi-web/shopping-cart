"use client"


import { useSelector } from "react-redux";



const Header = () => {
    const { products } = useSelector(state => state.app);
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