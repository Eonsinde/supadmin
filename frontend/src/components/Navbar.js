import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "slices/auth/authSlice";
import { useLogoutMutation } from "slices/auth/userApiSlice";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";


const Navbar = ({ setMobileViewOpen }) => {
    const { userInfo: user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className='flex items-center justify-between space-x-2 md:space-x-0'>
            <div className="basis-full md:basis-auto flex items-center space-x-2 md:space-x-0">
                {/* menu-toggler for mobile scrs */}
                <button 
                    onClick={() => setMobileViewOpen(true)}
                    className="block md:hidden bg-white dark:bg-slate-900 text-black dark:text-white p-1 md:p-[5px] text-3xl outline-none"
                >
                    <HiOutlineBars3BottomRight />
                </button>
                {/*  search form */}
                <form className='flex-grow bg-white dark:bg-slate-900'>
                    <div className="basis-auto form-sect flex items-center space-x-2 py-1 md:py-[5px] px-4">
                        <BiSearch className='text-base text-black dark:text-white' />
                        <input type="text" className="bg-transparent text-black dark:text-white py-1 outline-none flex-grow text-base" placeholder='Search' />
                    </div>
                </form>
            </div>
            {/* drop down button */}
            <button 
                className='bg-white dark:bg-slate-900 basis-auto hidden md:flex md:justify-center lg:justify-start items-center md:space-x-0 lg:space-x-3 md:py-2 lg:py-1 px-4'
                onClick={logoutHandler}
            >
                <div className='h-7 w-7 border-2 border-app-porange flex items-center justify-center rounded-full'>
                    {user
                    ?
                        user.image
                        ?
                        <image src={`${user && user.image ? user.image : "/avatar.jpg"}`} className='rounded-full' height={'30'} width={'30'} alt={`user avatar`} />
                        :
                        <IoPerson className="text-sm text-black dark:text-white" />
                    :
                    <></>
                    }
                </div>
                <div className="flex flex-col justify-start text-black dark:text-white">
                    <span className='whitespace-nowrap hidden lg:block text-sm text-left font-bold capitalize'>{user ? user.username : "Loading..."}</span>
                    <span className='whitespace-nowrap hidden lg:block text-xs text-left capitalize'>{user ? "Super Admin" : "Loading..."}</span>
                </div>
            </button>
        </nav>
    );
}
 
export default Navbar;