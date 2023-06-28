interface Post {
    title: string;
    excerpt: string;
}

const PostCard = (post: Post) => {
    return (
        <div>
            {post.title}
            {post.excerpt}
        </div>
    );
};

export default PostCard;
