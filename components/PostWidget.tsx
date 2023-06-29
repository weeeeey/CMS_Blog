import { useState } from "react";
import { getRecentPosts, RecentPost } from "../services/index";

const PostWidget = (post: RecentPost) => {
    const [relatePosts, setRelatePosts] = useState();
    return <div>{post.title} </div>;
};

export default PostWidget;
