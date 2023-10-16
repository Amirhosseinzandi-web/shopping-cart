"use client";

import Image from "next/image";
import { useSelector } from "react-redux";





const Footer = () => {
    const { loading, error , sum , tax , AllTotal , products} = useSelector(state => state.app);
    return (
        <footer className={`pb-16 mt-[-30px] ${loading || error ? "hidden" : ""}`}>

            <section className="container mx-auto px-16">

                <div className="w-full flex">

                    <section className="w-[50%] flex flex-col items-start">

                        <p>Accepted payment options</p>
                        <div className="flex gap-1 my-2">

                            <figure>
                                <Image priority={true} src="/visa.png" alt="visa" width={50} height={50} />
                            </figure>

                            <figure>
                                <Image priority={true} src="/master-card.png" alt="master-card" width={50} height={50} />
                            </figure>

                            <figure>
                                <Image priority={true} src="/american-express.png" alt="american-express" width={50} height={50} />
                            </figure>

                            <figure>
                                <Image priority={true} src="/discover.png" alt="discover" width={50} height={50} />
                            </figure>

                        </div>
                        <button className="px-7 py-3 my-10 rounded-sm continue-shopping-btn">Continue Shopping</button>

                    </section>

                    <section className="w-[50%] flex justify-end summary">

                        <div className="w-[60%]">   

                            <div className="flex">
                                <div className="w-[50%]">
                                    <p className="summary-title">Subtotal:</p>
                                </div>

                                <div className="w-[50%]">
                                    <p className="text-end summary-price">{products && products.length > 0 ? sum : "0.0"} $</p>
                                </div>

                            </div>

                            <div className="flex my-5">
                                <div className="w-[50%]">
                                    <p className="summary-title">Tax:</p>
                                </div>

                                <div className="w-[50%]">
                                    <p className="text-end summary-price">{tax} $</p>
                                </div>

                            </div>

                            <div className="flex">
                                <div className="w-[50%]">
                                    <p className="summary-title">Total:</p>
                                </div>

                                <div className="w-[50%]">
                                    <p className="text-end summary-price">{AllTotal && AllTotal.toFixed(2) || 0} $</p>
                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </section>

        </footer>
    );
}

export default Footer;