import { useState } from "react";
import Categories from "./Categories";

const SideBar = () => {
    const [toggle, setToggle] = useState(false);
    const changeToggle = () => {
        setToggle((p) => !p);
        console.log(toggle);
    };

    return (
        <div className="lg:hidden fixed -left-1 ml-7 mt-10 w-screen z-50">
            {toggle === false ? (
                <button
                    onClick={changeToggle}
                    className="w-10 bg-black h-10 rounded-full"
                ></button>
            ) : (
                <div className="min-h-screen w-1/3 bg-black rounded-lg ">
                    <Categories />
                </div>
            )}
        </div>
    );
};

export default SideBar;
