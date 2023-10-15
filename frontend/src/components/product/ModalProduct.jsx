import { motion } from "framer-motion"
import { Rating } from 'primereact/rating';


const ModalProduct = ({ data }) => {

    return (
        <motion.div 
            layoutId={data._id}
            className="max-w-[30em] bg-white dark:bg-slate-900 border-2 border-neutral-300 dark:border-white/30 p-3 shadow-md" 
        >
            <div className="max-h-[30em] flex flex-col space-y-4 overflow-y-auto scrollbar-hide">
                <div className="flex-grow flex flex-col space-y-4">
                    <p className="text-neutral-600 dark:text-neutral-400">{data.category}</p>
                    <div>
                        <h1 className="text-xl font-bold text-black dark:text-white">{data.name}</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">{data.price}</p>
                    </div>
                    <div>
                        <Rating 
                            className="mb-2"
                            value={data.rating} 
                            readOnly
                            cancel={false} 
                        />
                        <p className="text-neutral-700 dark:text-neutral-300">{data.description}</p>
                    </div>
                </div>
                <div 
                    className=""
                >
                    <p className="text-black dark:text-white">Supply Left: {data.supply}</p>
                    <p className="text-black dark:text-white">Sales This Year: {data.stat[0].yearlySalesTotal}</p>
                    <p className="text-black dark:text-white">Units Sold This Year: {data.stat[0].yearlyTotalSoldUnits}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default ModalProduct
