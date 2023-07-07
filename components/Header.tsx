import Link from "next/link";
import { SideBar } from "../components";
import { getCategory, ICategory } from "../services";
import { useEffect, useState } from "react";

const Header = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        (async () => {
            const cs = await getCategory();
            setCategories(cs);
        })();
    }, []);

    return (
        <div className={`container mx-auto px-10 mb-8 `}>
            <div className="flex justify-between w-full border-b border-blue-400 py-8 ">
                <Link href="/">
                    <span className="cursor-pointer font-bold text-4xl text-white">
                        BLOG
                    </span>
                </Link>
                <div>
                    <div>
                        {categories.map((cate) => (
                            <Link
                                key={cate.slug}
                                href={`/category/${cate.slug}`}
                            >
                                <span className="hover:ring hover:ring-offset-2 p-2 rounded-full md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                    {cate.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
