import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import darkSvg from "../assets/dark-endless-constellation.svg";
import lightSvg from "../assets/light-endless-constellation.svg";


const AuthLayout = () => {
    const { theme } = useSelector(state => state.ui);

    return (<>
        <section style={{height: '100vh', width: '100vw'}} className="relative bg-neutral-200/70 dark:bg-slate-800 flex flex-col justify-center items-center">
            <img className="absolute z-0 h-full w-full bg-cover object-fill" src={theme === "light" ? lightSvg : darkSvg} alt="" />
            <div className="z-10 w-full">
                <Outlet />
            </div>
            <div className='z-10 mt-5'>
                <p className='text-black dark:text-neutral-200'>Copyright <AiOutlineCopyrightCircle className='inline-block mx-1' /> {new Date().getFullYear()}; Supadmin</p>
            </div>
        </section>
    </>);
}
 
export default AuthLayout;