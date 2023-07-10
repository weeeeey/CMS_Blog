import { Categories, PostCard, PostWidget, SideBar } from "../components";
import { getPosts, Edge } from "../services";

import Carousel from "react-multi-carousel";

interface HomeProps {
    posts: Edge[];
}
const Home = ({ posts }: HomeProps) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                    ))}
                </div>

                <div className="lg:col-span-4 col-span-1">
                    <div className="hidden lg:block lg:sticky relative top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const posts: Edge[] = (await getPosts()) || [];

    return {
        props: { posts },
    };
}

export default Home;
