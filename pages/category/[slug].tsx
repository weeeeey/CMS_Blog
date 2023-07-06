import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCategoryPosts, Edge } from "../../services";
import { PostCard, Categories } from "../../components";

const Category = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Edge[]>();
    useEffect(() => {
        (async () => {
            await getCategoryPosts(router.query.slug + "").then((res) => {
                setPosts(res);
            });
        })();
    }, [router]);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8 ">
                    {posts
                        ? posts.map((post) => (
                              <PostCard post={post} key={post.node.createdAt} />
                          ))
                        : "Loading"}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <Categories />
                </div>
            </div>
        </div>
    );
};

export default Category;
