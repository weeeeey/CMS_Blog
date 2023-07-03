import { useRouter } from "next/router";
import { Post as IPost, getPost } from "../../services";
import { useState, useEffect } from "react";

const Post = () => {
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

    return <div>{post?.featuredImage.url}</div>;
};

export default Post;
