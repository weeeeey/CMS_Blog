import Link from "next/link";
import { useState, useEffect } from "react";
import { RecentPost, getRecentPosts } from "../services";
import Image from "next/image";

interface Post {
    post: RecentPost;
}

const PostWidget = () => {
    const [recentPosts, secentatePosts] = useState<RecentPost[]>();
    useEffect(() => {
        (async () => {
            const res = await getRecentPosts();
            secentatePosts(res);
        })();
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Recent Posts
            </h3>
            {recentPosts?.map((post, idx) => (
                <div
                    key={idx}
                    className="mb-6 w-full space-x-3 flex items-center"
                >
                    <Link
                        href={`/post/${post.slug}`}
                        className="text-md"
                        key={post.createdAt}
                    >
                        <Image
                            alt={post.title}
                            src={post.featuredImage.url}
                            width={100}
                            height={100}
                            className="align-middle rounded-lg"
                        ></Image>
                    </Link>
                    <div className="flex flex-col">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-md"
                            key={post.createdAt}
                        >
                            {post.title.length > 15
                                ? post.title.slice(0, 16) + "..."
                                : post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
