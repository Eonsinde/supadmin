import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './modal.css';


const CustomModal = ({ children, showCloseBtn, handleClose, closeBtnStyles }) => {
    const handleClick = e => {
        if (e.target.classList.contains('backdrop')){
            handleClose();
        }
    }

    return <motion.div className='backdrop z-10 lg:z-0' 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClick}
        >
            {
                showCloseBtn 
                ?
                <button 
                    className={`absolute z-10 top-4 right-4 p-3 ${closeBtnStyles ? closeBtnStyles : 'bg-orange-600 text-white'}`} 
                    onClick={() => handleClose()}
                >
                    <FaTimes />
                </button>
                :
                <></>
            }
            {children}
    </motion.div>
}
 
export default CustomModal;