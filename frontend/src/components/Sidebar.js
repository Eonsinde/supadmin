import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "slices/uiSlice";
// icons import
import { HiOutlineBars3BottomRight } from "react-icons/hi2"
import { SlPeople } from "react-icons/sl";
import { CgInsights } from "react-icons/cg";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { BsCalendar2Date, BsCart } from "react-icons/bs";
import { MdOutlineEventNote, MdOutlineDateRange, MdOutlineAdminPanelSettings, MdClose } from "react-icons/md"
import { FaRegMoon, FaMoon } from "react-icons/fa";


const Sidebar = ({ reduceWidth, setReduceWidth, mobileViewOpen, setMobileViewOpen }) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.ui.theme);

    const user = {
        username: "eonsinde",
        image: null
    }

    return ( 
        <aside 
            className={`z-10 bg-white dark:bg-slate-900 fixed h-screen ${reduceWidth ? 'w-[80px]' : 'w-[300px]'} ${mobileViewOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} shadow-lg md:shadow-none transition-all duration-100 ease-in-out`}
        >
            <div className="h-full flex flex-col">
                <header className={`flex items-center  py-4 px-4 ${reduceWidth ? 'justify-center' : 'justify-between'}`}>
                    <h3 className={`${reduceWidth ? 'hidden' : 'block'} whitespace-nowrap text-black dark:text-white tracking-[0.005em] text-xl m-0 font-bold transition-all duration-200 ease-in-out`}>SUPADMIN</h3>
                    <button 
                        onClick={() => setReduceWidth(prevValue => !prevValue)}
                        className="hidden md:block text-black dark:text-white text-3xl outline-none"
                    >
                        <HiOutlineBars3BottomRight />
                    </button>
                    {/* this button appears in the aside */}
                    <button 
                        onClick={() => setMobileViewOpen(false)}
                        className="block md:hidden text-black dark:text-white text-2xl outline-none"
                    >
                        <MdClose />
                    </button>
                </header>
                <div className={`${reduceWidth ? 'mb-4' : 'mb-4'}`}>
                    <hr className="border-0 h-[0.5px] bg-neutral-200 dark:bg-neutral-200/5" />
                </div>
                <main className="flex-grow pb-4 overflow-x-hidden overflow-y-auto flex flex-col space-y-4 scrollbar-hide">
                    <section className="flex flex-col">
                        <NavLink 
                            to="/dashboard/home" 
                            onClick={() => setMobileViewOpen(false)} 
                            className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                        >
                            <>
                                <GoHome className='text-2xl' />
                                <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Dashboard</span>
                            </>
                        </NavLink>
                    </section>
                    <section>
                        <div className={`${reduceWidth ? 'mb-4' : 'mb-2'}`}>
                            <hr className="border-0 h-[0.5px] bg-neutral-200 dark:bg-neutral-200/5" />
                            {!reduceWidth && <p className="text-black dark:text-white px-4 mt-2 lg:mt-4 text-[1rem] font-semibold">Client Facing</p>}
                        </div>
                        <div className={`flex flex-col ${reduceWidth ? "space-y-3" : ""}`}>
                            <NavLink 
                                to="/dashboard/products" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <BsCart className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Products</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/dashboard/customers" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <SlPeople className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Customers</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/dashboard/transactions" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <AiOutlineTransaction className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Transactions</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/dashboard/geography" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <GiWorld className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Geography</span>
                                </>
                            </NavLink>
                        </div>
                    </section>
                    <section>
                        <div className={`${reduceWidth ? 'mb-4' : 'mb-2'}`}>
                            <hr className="border-0 h-[0.5px] bg-neutral-200 dark:bg-neutral-200/5" />
                            {!reduceWidth && <p className="text-black dark:text-white px-4 mt-2 lg:mt-4 text-[1rem] font-semibold">Sales</p>}
                        </div>
                        <div className={`flex flex-col ${reduceWidth ? "space-y-3" : ""}`}>
                            <NavLink 
                                to="/sales/overview" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <CgInsights className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Overview</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/sales/daily" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <BsCalendar2Date className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Daily</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/sales/monthly" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <MdOutlineDateRange className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Monthly</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/sales/breakdown" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <MdOutlineEventNote className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Breakdown</span>
                                </>
                            </NavLink>
                        </div>
                    </section>
                    <section>
                        <div className={`${reduceWidth ? 'mb-4' : 'mb-2'}`}>
                            <hr className="border-0 h-[0.5px] bg-neutral-200 dark:bg-neutral-200/5" />
                            {!reduceWidth && <p className="text-black dark:text-white px-4 mt-2 lg:mt-4 text-[1rem] font-semibold">Management</p>}
                        </div>
                        <div className={`flex flex-col ${reduceWidth ? "space-y-3" : ""}`}>
                            <NavLink 
                                to="/products" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <MdOutlineAdminPanelSettings className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Admin</span>
                                </>
                            </NavLink>
                            <NavLink 
                                to="/customers" 
                                onClick={() => setMobileViewOpen(false)} 
                                className={({ isActive, isPending }) => (`${isActive ? "bg-orange-400 text-white" : "text-black hover:bg-neutral-100 dark:hover:bg-slate-800"} py-3 px-4 dark:text-white flex items-center ${reduceWidth ? 'mx-auto rounded-md' : 'space-x-2'}`)}
                            >
                                <>
                                    <HiArrowTrendingUp className='text-2xl' />
                                    <span className={`text-md ${reduceWidth ? 'hidden' : 'block'}`}>Performance</span>
                                </>
                            </NavLink>
                        </div>
                    </section>
                </main>
                {/* theme settings */}
                <div className="">
                    <hr className="border-0 h-[0.5px] bg-neutral-200 dark:bg-neutral-200/5" />
                    <div className={`flex ${reduceWidth ? "justify-center" : "justify-between"}  items-center py-4 px-4`}>
                        <p className={`${reduceWidth ? "hidden" : "block"} font-bold capitalize text-black dark:text-white`}>{currentTheme} Mode</p>
                        <button 
                            className="bg-neutral-200 dark:bg-slate-800 text-black dark:text-white basis-auto flex md:justify-center lg:justify-start items-center md:space-x-0 lg:space-x-3 p-3 rounded-full"
                            onClick={() => dispatch(changeTheme())}
                        >
                            {currentTheme === "light"
                            ? 
                            <FaRegMoon />
                            :
                            <FaMoon />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
 
export default Sidebar;