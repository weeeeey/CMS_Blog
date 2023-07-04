import { useEffect, useState } from "react";
import { ICategory, getCategory } from "../services/index";
import Link from "next/link";

const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>();
    useEffect(() => {
        (async () => {
            const cs = await getCategory();
            setCategories(cs);
        })();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Category
            </h3>
            {categories?.map((cate) => (
                <Link key={cate.slug} href={`/category/${cate.slug}`}>
                    <span className="hover:cursor-pointer mb-6 w-full space-x-3 flex items-center font-medium">
                        {cate.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
