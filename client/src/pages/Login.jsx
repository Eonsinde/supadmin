import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useLoginMutation } from '../slices/auth/userApiSlice';
import { setCredentials } from '../slices/auth/authSlice';
import { toast } from 'react-toastify';



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();
    const { userInfo } = useSelector(state => state.auth);
    const { theme } = useSelector(state => state.ui);

    let [showPassword, setShowPassword] = useState(false);
    let [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const { register:RegisterField, handleSubmit:SubmitForm, formState: { errors } } = useForm(); // form validation

    // for our show password button
    const showPasswordInput = useRef(null);

    useEffect(() => {
        document.title = `Supadmin | Accounts | Login`;
    }, []);

    useEffect(() => {
        if (userInfo) {
            navigate("/dashboard/home");
        }
    }, [navigate, userInfo]);

    const handleShowPassword = (show) => {
        // change show password value and alter the tick on the checkbox input
        setShowPassword(show);
        showPasswordInput.current.checked = show;
    }

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
 
    const handleSubmit = async () => {
        try {
            const res = await login(formData).unwrap();
            dispatch(setCredentials(res.data));
        } catch (error) {
            // console.log(error);
            
            if (String(error?.message).includes("Network")) {
                toast.error("No internet connection", {
                    theme: `${(theme === "" || theme === "light") ? "light" : "dark"}`,
                    position: "bottom-center",
                    style: {
                        backgroundColor: `${!(theme === "" || theme === "light") ? "#0f172a" : "#EDEDED"}`
                    }
                });
            }else if (String(error?.error).includes("fetch")) {
                toast.error("Failed to fetch from server", {
                    theme: `${(theme === "" || theme === "light") ? "light" : "dark"}`,
                    position: "bottom-center",
                    style: {
                        backgroundColor: `${!(theme === "" || theme === "light") ? "#0f172a" : "#EDEDED"}`
                    }
                });
            } else { // get error from server
                toast.error(error?.data?.message || error.error, {
                    theme: `${(theme === "" || theme === "light") ? "light" : "dark"}`,
                    position: "bottom-center",
                    style: {
                        backgroundColor: `${!(theme === "" || theme === "light") ? "#0f172a" : "#EDEDED"}`
                    }
                });
            }
        }
    }

    return ( 
        <>
            <div className='w-4/6 md:w-2/4 mx-auto p-3 text-center'>
                <h1 className='text-black dark:text-white font-semibold text-3xl sm:text-4xl md:text-5xl mb-1'>Supadmin</h1>
                <div className="my-2 flex items-center justify-center space-x-2">
                    <hr className="bg-orange-500 h-[2px] w-[40px] border-0" />
                    <p className="text-black dark:text-neutral-200">Admin Portal</p>
                    <hr className="bg-orange-500 h-[2px] w-[40px] border-0" />
                </div>
            </div>
            <form 
                onSubmit={SubmitForm(handleSubmit)} 
                className='bg-white dark:bg-slate-900 relative flex flex-col py-20 px-5 sm:px-8 md:px-16 w-11/12 sm:w-9/12 md:w-9/12 lg:w-4/12 mx-auto border-0 rounded-md shadow-md'
            > 
                <div className='form-sect mb-4 md:mb-3 lg:mb-5'>
                    <input 
                        type='text' 
                        {...RegisterField("identifier", {required: true, maxLength: 50})} 
                        onChange={handleChange} 
                        className={`text-black dark:text-white p-3 w-full border-solid border-2 border-neutral-300 rounded-md shadow-sm 
                                focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-100/10 outline-none   
                                ${errors.identifier?.type === 'required' ? 'focus:border-red-300 focus:ring-red-200/50 dark:focus:ring-red-200/50' : '' } 
                                transition ease-in-out delay-150 bg-transparent`} 
                        placeholder='Username'  
                    />
                </div>
                <div className='form-sect mb-4 md:mb-3 lg:mb-5'>
                    <input 
                        type={`${showPassword ? 'text' : 'password'}`} 
                        {...RegisterField("password", { required: true, maxLength: 255 })} 
                        onChange={handleChange} 
                        className={`text-black dark:text-white p-3 w-full border-solid border-2 border-neutral-300 rounded-md shadow-sm 
                                focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-100/10 outline-none  
                                ${errors.password?.type === 'required' ? 'focus:border-red-300 focus:ring-red-200/50 dark:focus:ring-red-200/50' : '' } 
                                transition ease-in-out delay-150 bg-transparent`} 
                        placeholder='Password'
                    />
                </div>
                <div className='form-sect mb-4 md:mb-3 lg:mb-5 flex justify-start items-center space-x-3'>
                    <input type='checkbox' ref={showPasswordInput} onClick={() => handleShowPassword(!showPassword)} />
                    <Link to='#' className='flex justify-start items-center space-x-3 text-black dark:text-white hover:text-black dark:hover:text-white' onClick={() => handleShowPassword(!showPassword)}>
                        <p>Reveal Password</p>
                    </Link>
                </div>
                <button 
                    disabled={isLoading ? true : false}
                    type='submit' 
                    className={`${!isLoading ? 'bg-orange-500' : 'bg-orange-500/70 animate-pulse'} border-none text-white p-3 rounded-md shadow-sm focus:ring-4 focus:ring-red-200 transition ease-in-out delay-150`}
                >
                    {isLoading ? 'Submitting' : 'Login'}
                </button>
            </form>
        </>
    );
}
 
export default Login;