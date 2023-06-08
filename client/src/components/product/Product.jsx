import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Rating } from 'primereact/rating';


const Product = ({ data, setSelectedProduct }) => {
    const [showExtra, setShowExtra] = useState(false);

    return (
        <motion.div 
            layoutId={data._id}
            className="bg-white dark:bg-slate-900 flex flex-col space-y-4 p-3" 
            
        >
            <div className="flex-grow flex flex-col space-y-4">
                <small className="text-neutral-600 dark:text-neutral-400">{data.category}</small>
                <div>
                    <p className="text-black dark:text-white">{data.name}</p>
                    <small className="text-neutral-600 dark:text-neutral-400">{data.price}</small>
                </div>
                <div>
                    <Rating 
                        className="mb-2"
                        value={data.rating} 
                        readOnly
                        cancel={false} 
                    />
                    <small className="text-neutral-700 dark:text-neutral-300">{data.description}</small>
                </div>
            </div>
            <button 
                className="bg-orange-500 text-white text-sm p-2"
                onClick={() => setSelectedProduct(data)}
            >
                SEE MORE
            </button>
        </motion.div>
    )
}

export default Product
