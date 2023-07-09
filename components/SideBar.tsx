import { useState, useEffect } from "react";
import {
    getCategory,
    ICategory,
    getRecentPosts,
    RecentPost,
} from "../services";
import Link from "next/link";

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
                <div className="w-full z-10 lg:hidden fixed h-screen">
                    {toggle === false ? (
                        <button
                            onClick={changeToggle}
                            className="w-10 bg-black h-10 rounded-full mx-3"
                        ></button>
                    ) : (
                        <div className="flex-col flex min-h-screen max-w-full bg-slate-500">
                            <button
                                onClick={changeToggle}
                                className="bg-white w-10 h-10 rounded-full mx-3"
                            >
                                X
                            </button>
                            <h2 className="mt-8 text-3xl font-semibold border-b-2">
                                Category
                            </h2>
                            {data.categories.map((c) => (
                                <Link href={`/post/${c.slug}`} key={c.slug}>
                                    <span className="text-xl font-light mt-4 ml-6 border border-white hover:border-b-black inline-block ">
                                        {c.name}
                                    </span>
                                </Link>
                            ))}
                            <h2 className="mt-8 text-3xl font-semibold border-b-2">
                                Recent Posts
                            </h2>
                            {data.posts.map((c) => (
                                <Link href={`/post/${c.slug}`} key={c.slug}>
                                    <div className="text-xl font-light truncate max-w-xl block h-8 mt-4 ml-6 pb-16 relative group">
                                        <span className="border border-white hover:border-b-black ">
                                            {c.title}
                                        </span>
                                        {/*  inset-0 z-20 absolute text-sm bg-black border border-gray-300 px-2 py-1 mt-2 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 */}
                                        <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                                            {c.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SideBar;
