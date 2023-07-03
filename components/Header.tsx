import Link from "next/link";
import { getCategory, ICategory } from "../services";
import { useEffect, useState } from "react";

const Header = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCategory()
            .then((newCate) => {
                setCategories(newCate);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
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
                <div className="hidden md:float-left md:contents">
                    {categories.map((cate, idx) => (
                        <Link key={idx} href={`/cate/${cate.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
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
