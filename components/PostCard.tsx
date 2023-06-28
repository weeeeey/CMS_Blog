import { Edge } from "../services";

interface Post {
    post: Edge;
}

const PostCard = ({ post }: Post) => {
    return (
        <div>
            {post.node.title}
            {post.node.excerpt}
        </div>
    );
};

export default PostCard;
