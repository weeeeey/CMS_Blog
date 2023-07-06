import Link from "next/link";
import { getCategory, ICategory } from "../services";
import { useEffect, useState } from "react";

const Header = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
        (async () => {
            const cs = await getCategory();
            setCategories(cs.reverse());
            console.log(cs);
        })();
    }, []);
    return (
        <div className="container mx-auto px-10 mb-8 ">
            <div className="w-full border-b border-blue-400 py-8 inline-block">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            BLOG
                        </span>
                    </Link>
                </div>
                <div className="md:float-right md:contents">
                    {categories.map((cate) => (
                        <Link key={cate.slug} href={`/category/${cate.slug}`}>
                            <span className="hover:ring hover:ring-offset-2 p-2 rounded-full md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                {cate.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
