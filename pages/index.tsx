import Head from 'next/head';
import { Categories, PostCard, PostWidget } from '../components';
import { getPosts, Edge, RecentPosts, getRecentPosts } from '../services';

interface HomeProps {
    posts: Edge[];
    recentPosts: RecentPosts;
}

const Home = ({ posts, recentPosts }: HomeProps) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        {recentPosts.posts.map((post, index) => (
                            <PostWidget post={post} key={index} />
                        ))}

                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const posts: Edge[] = (await getPosts()) || [];
    const recentPosts: RecentPosts = (await getRecentPosts()) || [];
    console.log(recentPosts);
    return {
        props: { posts, recentPosts },
    };
}

export default Home;
