import Link from "next/link";
import { useState } from "react";
import { RecentPost } from "../services/index";
import Image from "next/image";
interface Post {
    post: RecentPost;
}

const PostWidget = ({ post }: Post) => {
    const [relatePosts, setRelatePosts] = useState();
    return (
        <div className="mb-6 w-full space-x-3 flex items-center">
            <Link
                href={`/post/${post.slug}`}
                className="text-md"
                key={post.createdAt}
            >
                <Image
                    alt={post.title}
                    src={post.featuredImage.url}
                    width={50}
                    height={50}
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
    );
};

export default PostWidget;
