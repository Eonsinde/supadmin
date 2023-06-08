import { useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { getProducts } from "../requests";
import Product from "../components/product/Product";
import CustomerLoader from "../components/customer/CustomerLoader";
import CustomModal from "../components/modal/Modal";
import ModalProduct from "../components/product/ModalProduct";


const Customers = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, isLoading } = useQuery('all-customers', () => getProducts());

    return (
    <>
        <header className="">
            <h1 className="text-black dark:text-white font-bold text-lg md:text-xl">Customers</h1>
            <p className="text-neutral-700 dark:text-neutral-300">List of customers</p>
        </header>
        <section className="flex-grow overflow-hidden">
            {!isLoading ?
            <div className="h-full overflow-y-auto scrollbar-hide py-2">
                <CustomerLoader />
            </div>
            :  
            <div className="h-full py-2 overflow-y-auto scrollbar-hide">
                {data?.products?.length <= 0
                ?
                <p className="text-black dark:text-white">No customers added yet</p>
                : 
                <> 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data?.products?.map(product => (
                            <Product key={product._id} data={product} setSelectedProduct={setSelectedProduct} />
                        ))}
                    </div>
                </>}
            </div>} 
        </section>
        {selectedProduct && (<CustomModal showCloseBtn handleClose={() => setSelectedProduct(null)}>
            <AnimatePresence>
                <ModalProduct data={selectedProduct} />
            </AnimatePresence>
        </CustomModal>)}       
    </>);
}
 
export default Customers;