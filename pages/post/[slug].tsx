import { useRouter } from "next/router";
import { Post as IPost, getPost } from "../../services";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import {
    PostWidget,
    Categories,
    CommentsForm,
    Comments,
} from "../../components";

const PostDetail = () => {
    const [post, setPost] = useState<IPost>();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (router.query.slug) {
                const fetchedPost = await getPost(router.query.slug + "");
                setPost(fetchedPost);
            }
        })();
    }, [router.query.slug]);

    return post ? (
        <div className="container mx-auto px-10 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 col-span-1">
                <div className="bg-white shadow-lg rounded-lg p-8 pb-12 ">
                    <div className="relative overflow-hidden shadow-md pb-96 mb-8 w-full h-full">
                        <Image
                            alt={post.title}
                            layout="fill"
                            src={post.featuredImage.url}
                            className="absolute shadow-lg rounded-t-lg lg:rounded-lg"
                            loading="lazy"
                        />
                    </div>
                    <div className=" text-gray-700 font-medium space-x-2 flex items-center lg:justify-start justify-center  text-sm mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <Image
                            alt={post.author.name}
                            height={32}
                            width={32}
                            src={post.author.photo.url}
                            className="align-middle rounded-full flex-shrink-0"
                            loading="lazy"
                        />
                        <p className="inline align-middle ">
                            {post.author.name}
                        </p>
                        <span className="mb-2 font-bold">.</span>
                        <div className=" flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 inline text-pink-500 mr-2"
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
                                {new Date(post.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>
                    </div>

                    <h1 className="my-8 text-3xl font-semibold border-b-4 pb-4">
                        {post.title}
                    </h1>
                    <div className="block lg:flex items-center justify-center mb-8 w-full">
                        <p
                            className=" text-lg text-gray-700 font-normal px-4 lg:px-10 lg:mb-0 mb-8"
                            dangerouslySetInnerHTML={{
                                __html: post.content.html,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 col-span-1">
                <div className=" lg:sticky relative top-8">
                    <PostWidget />
                    <Categories />
                </div>
            </div>
            <div className="lg:col-span-8 col-span-1">
                <Comments />
                <CommentsForm />
            </div>
        </div>
    ) : (
        "Loading..."
    );
};

export default PostDetail;
