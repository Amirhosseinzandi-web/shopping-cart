"use client"


import FetchData from "../FetchData/FetchData";


const clickHandler = () =>{
    window.scrollTo({
        top: document.querySelector("footer").offsetTop,
        behavior: 'smooth',
    });
}


const Content = () => {
    return (
        <main>
            <section className="container mx-auto px-16 py-14">
                <div className="flex justify-between">
                    <h1>Your Shopping Bag</h1>
                    <button onClick={clickHandler} className="px-7 py-3 rounded-sm continue-shopping-btn">Continue Shopping</button>
                </div>


                <div className="shopping-table mt-10">
                    <div className="shopping-table-title flex ">

                        <div className="w-[45%] flex">
                            <div className="w-[70%]">
                                <p>Item</p>
                            </div>

                            <div className="w-[30%]">
                                <p>Shipped from</p>
                            </div>
                        </div>


                        <div className="w-[55%] flex">
                            <div className="w-[25%]">
                                <p>Attributes</p>
                            </div>

                            <div className="w-[25%]">
                                <p>Quantity</p>
                            </div>

                            <div className="w-[25%] text-center">
                                <p>Shipping cost</p>
                            </div>

                            <div className="w-[25%] text-end">
                                <p>Price</p>
                            </div>

                        </div>

                    </div>
                    <FetchData/>
                </div>

            </section>
        </main>
    );
}

export default Content;