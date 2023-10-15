import { CgSpinner } from "react-icons/cg"


const PageLoader = () => {
    return (  
        <div className="relative flex-grow overflow-hidden">
            <div className="h-full w-full flex items-center justify-center">
                <CgSpinner className="text-orange-400 text-6xl animate-spin" />
            </div>
        </div>
    );
}
 
export default PageLoader;