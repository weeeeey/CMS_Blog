import { useState } from 'react';
import { RecentPost } from '../services/index';

interface Post {
    post: RecentPost;
}

const PostWidget = ({ post }: Post) => {
    const [relatePosts, setRelatePosts] = useState();
    return <div className="bg-slate-400">{post.title} </div>;
};

export default PostWidget;
