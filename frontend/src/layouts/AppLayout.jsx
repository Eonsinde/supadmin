import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ProtectedView } from "../context/AppContext";


const AppLayout = () => {
    const [reduceWidth, setReduceWidth] = useState(false)
    const [mobileViewOpen, setMobileViewOpen] = useState(false)

    useEffect(() => {
        document.title = "Supadmin | Dashboard"
    }, []);

    return (
        <ProtectedView>
            <section className="">
                <Sidebar 
                    reduceWidth={reduceWidth} 
                    setReduceWidth={setReduceWidth}
                    mobileViewOpen={mobileViewOpen}
                    setMobileViewOpen={setMobileViewOpen}
                />
                <main className={`relative ${reduceWidth ? 'ml-0 md:ml-[80px]' : 'ml-0 md:ml-[300px]'} h-screen py-2 px-4 md:px-6 bg-neutral-200/70 dark:bg-slate-800 overflow-hidden transition-all duration-100 ease-in-out`}>
                    <section className=' h-full w-full flex flex-col space-y-4 md:space-y-5'>
                        <Navbar setMobileViewOpen={setMobileViewOpen} />
                        <Outlet />
                    </section>
                </main>
            </section>
        </ProtectedView>
    );
}
 
export default AppLayout;