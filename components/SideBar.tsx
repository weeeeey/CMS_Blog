import { useState, useEffect } from "react";
import {
    getCategory,
    ICategory,
    getRecentPosts,
    RecentPost,
} from "../services";

interface IProp {
    isOpen: boolean;
}
interface MenuProp {
    categories: ICategory[];
    posts: RecentPost[];
}

const SideBar = () => {
    const [toggle, setToggle] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [blur, setBlur] = useState(false);
    const [data, setData] = useState<MenuProp>({ categories: [], posts: [] });
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 112;
            if (scrollPosition > threshold) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        (async () => {
            await getCategory().then((cs) => {
                setData((p) => ({ ...p, categories: cs }));
            });
            await getRecentPosts().then((ps) => {
                setData((p) => ({ ...p, posts: ps }));
            });
        })();
    }, []);

    const changeToggle = () => {
        setToggle((p) => !p);
        setBlur((p) => !p);
        console.log(toggle);
    };

    return (
        <>
            {showBtn && (
                <div className="w-full z-50 lg:hidden fixed h-screen">
                    {toggle === false ? (
                        <button
                            onClick={changeToggle}
                            className="w-10 bg-black h-10 rounded-full -left-1 mt-8 ml-7"
                        ></button>
                    ) : (
                        <div className="flex-col flex min-h-screen rounded-lg ">
                            <button
                                onClick={changeToggle}
                                className="bg-blue-400 w-full h-10 rounded-full"
                            >
                                X
                            </button>
                            <h2 className="mt-8 text-3xl font-semibold border-b-2">
                                Category
                            </h2>
                            {data.categories.map((c) => (
                                <div key={c.slug} className="text-xl">
                                    {c.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SideBar;
