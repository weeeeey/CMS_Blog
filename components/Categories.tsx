import { ICategory } from "../services/index";
interface CategoryProps {
    cate: ICategory;
}

const Categories = ({ cate }: CategoryProps) => {
    return (
        <div className="mb-6 w-full space-x-3 flex items-center font-medium">
            {cate.name}
        </div>
    );
};

export default Categories;
