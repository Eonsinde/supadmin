import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { useSelector } from "react-redux";
import darkSvg from "../assets/dark-endless-constellation.svg";
import lightSvg from "../assets/light-endless-constellation.svg";


export default function ErrorPage() {
    const error = useRouteError();
    const { theme } = useSelector(state => state.ui);

    useEffect(() => {
        document.title = `Supadmin | Error | ${error.message || error.statusText}`;
    }, [error.message]);

    return (
        <div className="relative bg-neutral-200/70 dark:bg-slate-800 h-screen w-screen flex flex-col justify-center items-center space-y-4">
            <img className="absolute z-0 h-full w-full bg-cover object-fill" src={theme === "light" ? lightSvg : darkSvg} alt="" />
            <div className="z-10 flex flex-col space-y-4">
                <h1 className="text-4xl font-bold text-black dark:text-white">Oops!</h1>
                <p className="text-xl text-black dark:text-neutral-200">Sorry, an unexpected error has occurred.</p>
                <p className="text-lg text-black dark:text-neutral-200">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}