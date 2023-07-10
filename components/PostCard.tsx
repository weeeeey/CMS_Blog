import { Edge } from "../services";
import Image from "next/legacy/image";
import Link from "next/link";

interface Post {
    post: Edge;
}
// 타이틀 옆에 코멘트
const PostCard = ({ post }: Post) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 w-full">
            <div className="relative z-0 shadow-md pb-96 mb-6 w-full h-full">
                <Image
                    alt={post.node.title}
                    layout="fill"
                    src={post.node.featuredImage.url}
                    className="shadow-lg rounded-t-lg lg:rounded-lg"
                    loading="lazy"
                />
            </div>
            <div className="transition duration-500 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold overflow-hidden">
                <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
            </div>
            <div className="flex flex-col text-center items-center justify-center mb-8 w-full">
                <div className="flex items-center justify-center mb-3 w-full lg:w-auto">
                    <Image
                        unoptimized
                        alt={post.node.author.name}
                        height={40}
                        width={40}
                        src={post.node.author.photo.url}
                        className="align-middle rounded-full"
                        loading="lazy"
                    />
                    <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                        {post.node.author.name}
                    </p>
                </div>

                <div className="font-medium text-gray-700 mb-2 flex justify-center space-x-2 items-center ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline text-pink-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="align-middle ">
                        {new Date(post.node.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </span>
                </div>
                <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 my-4">
                    {post.node.excerpt}
                </p>
                <div className="text-center">
                    <Link href={`/post/${post.node.slug}`}>
                        <span className="bg-pink-500 hover:bg-pink-600 rounded-full text-lg  cursor-pointer font-medium py-3 px-8 text-white inline-block hover:-translate-y-2 ease transition duration-500">
                            Continue Reading
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
//
export default PostCard;
