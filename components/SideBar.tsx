import { useState, useEffect } from "react";
import {
    getCategory,
    ICategory,
    getRecentPosts,
    RecentPost,
} from "../services";
import Link from "next/link";
import Image from "next/legacy/image";

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
                setToggle(false);
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
                <div className={`w-full z-10 lg:hidden fixed h-screen`}>
                    <button
                        onClick={changeToggle}
                        className={`absolute w-10 h-10 mx-3 `}
                    >
                        <svg
                            fill="#000000"
                            height="20px"
                            width="20px"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 150 150"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g id="XMLID_240_">
                                    {" "}
                                    <path
                                        id="XMLID_241_"
                                        d="M15,30h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.716,0,0,6.716,0,15S6.716,30,15,30z"
                                    ></path>{" "}
                                    <path
                                        id="XMLID_242_"
                                        d="M135,60H15C6.716,60,0,66.716,0,75s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,60,135,60z"
                                    ></path>{" "}
                                    <path
                                        id="XMLID_243_"
                                        d="M135,120H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S143.284,120,135,120z"
                                    ></path>{" "}
                                </g>{" "}
                            </g>
                        </svg>
                    </button>
                    <aside
                        className={`duration-300 ${
                            toggle ? "translate-y-0" : "-translate-y-full"
                        } flex-col flex min-h-screen w-full bg-white `}
                    >
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
                                <div className="text-xl font-light mt-4 ml-6 hover:text-pink-300 duration-200">
                                    {c.name}
                                </div>
                            </Link>
                        ))}
                        <h2 className="mt-8 text-3xl font-semibold border-b-2">
                            Recent Posts
                        </h2>
                        {data.posts.map((c) => (
                            <Link href={`/post/${c.slug}`} key={c.slug}>
                                <div className="rounded-lg text-xl font-light max-w-xl flex items-center mt-4 ml-6 py-4 shadow-lg hover:text-pink-300 duration-200">
                                    <Image
                                        src={c.featuredImage.url}
                                        width={100}
                                        height={100}
                                        alt={c.title}
                                        className="rounded-lg"
                                    ></Image>
                                    <div className="flex flex-col w-4/5 pl-2">
                                        <div className="truncate font-light  ">
                                            {c.title}
                                        </div>
                                        <div className="text-base text-black ">
                                            {new Date(
                                                c.createdAt
                                            ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </aside>
                </div>
            )}
        </>
    );
};

export default SideBar;
