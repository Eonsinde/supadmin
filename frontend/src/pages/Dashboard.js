import { useEffect } from "react";
import { TbArrowBarToDown } from "react-icons/tb";


const Dashboard = () => {
    useEffect(() => {
        document.title = "Supadmin | Dashboard | Home"
    }, [])

    return (
    <>
    <header className="flex justify-between my-6">
        <div>
            <h1 className="text-black dark:text-white text-2xl font-semibold">DASHBOARD</h1>
            <p className="text-neutral-400">Welcome to your dashboard</p>
        </div>
        <div>
            <button className="bg-orange-400 text-slate-900 text-sm flex justify-between items-center space-x-2 p-3 rounded-md">
                <TbArrowBarToDown className="text-lg" />
                <span>DOWNLOAD REPORT</span>
            </button>
        </div>
    </header>
    <section className="relative flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide py-2">
            <main className="flex flex-col space-y-4">
                <section className="flex">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-400 h-40 w-60 rounded-md" />
                        <div className="bg-neutral-400 h-40 w-60 rounded-md" />
                        <div className="bg-neutral-400 h-40 w-60 rounded-md" />
                        <div className="bg-neutral-400 h-40 w-60 rounded-md" />
                    </div>
                    <div>

                    </div>
                </section>
                <section>
                    <div>

                    </div>
                    <div>

                    </div>
                </section>
            </main>
        </div>
    </section>
    </>
    );
}
 
export default Dashboard;