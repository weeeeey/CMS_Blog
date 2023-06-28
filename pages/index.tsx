import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts, Edge } from "../services";

const Home = ({ posts }: { posts: Edge[] }) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post) => (
                        <PostCard post={post} key={post.node.title} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
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
