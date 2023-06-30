import { Categories, PostCard, PostWidget } from "../components";
import {
    getPosts,
    getRecentPosts,
    getCategory,
    Edge,
    RecentPost,
    ICategory,
} from "../services";

interface HomeProps {
    posts: Edge[];
    recentPosts: RecentPost[];
    categories: ICategory[];
}

const Home = ({ posts, recentPosts, categories }: HomeProps) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className=" lg:sticky relative top-8">
                        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                                Recent Posts
                            </h3>
                            {recentPosts.map((p: RecentPost, index) => (
                                <PostWidget post={p} key={index} />
                            ))}
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                                Category
                            </h3>
                            {categories.map((p: ICategory, idx) => (
                                <Categories cate={p} key={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const posts: Edge[] = (await getPosts()) || [];
    const recentPosts: RecentPost[] = (await getRecentPosts()) || [];
    const categories: ICategory[] = (await getCategory()) || [];
    return {
        props: { posts, recentPosts, categories },
    };
}

export default Home;
