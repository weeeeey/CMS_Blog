import { graphql } from "graphql";
import { Edge } from "../services";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

interface Post {
    post: Edge;
}
//
const PostCard = ({ post }: Post) => {
    console.log(post);
    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md pb-80 mb-6">
                <img
                    src={post.node.featuredImage.url}
                    alt={post.node.title}
                    className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
                />
            </div>
            <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
            </h1>
            <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                    <Image
                        unoptimized
                        alt={post.node.author.name}
                        height={50}
                        width={50}
                        src={post.node.author.photo.url}
                        className="align-middle rounded-full"
                        loading="lazy"
                    />
                    <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                        {post.node.author.name}
                    </p>
                </div>
                <div className="font-medium text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline mr-2 text-pink-500"
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
                    <span className="align-middle">
                        {moment(post.node.createdAt).format("MMM DD, YYYY")}
                    </span>
                </div>
                <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
                    {post.node.excerpt}
                </p>
                <div className="text-center">
                    <Link href={`/post/${post.node.slug}`}>
                        <span className="bg-pink-600 rounded-full text-lg  cursor-pointer font-medium py-3 px-8 text-white inline-block hover:-translate-y-2 ease transition duration-500">
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
