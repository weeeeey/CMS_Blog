import { useRouter } from "next/router";
import { Post as IPost, getPost } from "../../services";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { PostWidget, Categories } from "../../components";
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
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 ">
                        <div className="relative overflow-hidden shadow-md pb-96 mb-6 w-full h-full">
                            <Image
                                alt={post.title}
                                layout="fill"
                                src={post.featuredImage.url}
                                className="absolute shadow-lg rounded-t-lg lg:rounded-lg"
                                loading="lazy"
                            />
                        </div>
                        <div className="text-gray-700 font-medium space-x-2 flex items-center lg:justify-start justify-center  text-sm mb-3 lg:mb-0 w-full lg:w-auto mr-8">
                            <Image
                                unoptimized
                                alt={post.author.name}
                                height={40}
                                width={40}
                                src={post.author.photo.url}
                                className="align-middle rounded-full flex-shrink-0"
                                loading="lazy"
                            />
                            <p className="inline align-middle ">
                                {post.author.name}
                            </p>
                            <span className="mb-2 font-bold">.</span>
                            <div className=" flex flex-col items-center">
                                <span className="align-middle ">
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        <h1 className="mt-4 mb-8  text-3xl font-semibold">
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
            </div>
        </div>
    ) : (
        "Loading..."
    );
};

export default PostDetail;
