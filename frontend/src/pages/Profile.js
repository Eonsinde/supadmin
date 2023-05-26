import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";


const Profile = () => {
    const [user, setUser] = useState(null);    

    useEffect(() => {
        document.title = "Supadmin | Dashboard | Profile";
    }, []);

    useEffect(() => {
        // make request to get profile information
        (async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_API_URL}api/users/me`, {
                    withCredentials: true
                });
                console.log(resp);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <section className="">
            <h1 className="text-black dark:text-white text-3xl font-bold">Manage Profile</h1>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="mb-2 text-black dark:text-white">Username</p>
                    <div className="bg-white dark:bg-slate-900 flex justify-between items-center py-2 px-3">
                        <p className="text-neutral-700 dark:text-white">Eonsinde</p>
                        <button className="text-lg p-2 bg-neutral-200/70 dark:bg-slate-800 text-black dark:text-white">
                            <AiOutlineEdit />
                        </button>
                    </div>
                </div>
                <div>
                    <p className="mb-2 text-black dark:text-white">Email</p>
                    <div className="bg-white dark:bg-slate-900 flex justify-between items-center py-2 px-3">
                        <p className="text-neutral-700 dark:text-white">eosninde@gmail.com</p>
                        <button className="text-lg p-2 bg-neutral-200/70 dark:bg-slate-800 text-black dark:text-white">
                            <AiOutlineEdit />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Profile;