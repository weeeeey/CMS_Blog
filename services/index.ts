import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export interface Edge {
    node: {
        author: {
            bio: string;
            name: string;
            id: string;
            photo: {
                url: string;
            };
        };
        createdAt: string;
        slug: string;
        title: string;
        excerpt: string;
        featuredImage: {
            url: string;
        };
        categories: {
            name: string;
            slug: string;
        };
    };
}

export interface PostsConnection {
    postsConnection: { edges: Edge[] };
}

export interface RecentPost {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
}

export interface RecentPosts {
    posts: RecentPost[];
}

export const getPosts = async (): Promise<Edge[]> => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    const results = await request<PostsConnection>(graphqlAPI!, query);
    return results.postsConnection.edges;
};

export const getRecentPosts = async (): Promise<RecentPost[]> => {
    const query = gql`
        query MyQuery {
            posts(last: 3, orderBy: createdAt_ASC) {
                title
                slug
                createdAt
                featuredImage {
                    url
                }
            }
        }
    `;
    const results = await request<RecentPosts>(graphqlAPI!, query);
    return results.posts;
};

export interface ICategory {
    name: string;
    slug: string;
}
interface CategoriesData {
    categories: ICategory[];
}
export const getCategory = async (): Promise<ICategory[]> => {
    const query = gql`
        query MyQuery {
            categories {
                name
                slug
            }
        }
    `;
    const results = await request<CategoriesData>(graphqlAPI!, query);
    return results.categories;
};

export interface Post {
    author: {
        name: string;
    };
    featuredImage: {
        url: string;
    };
    createdAt: string;
    excerpt: string;
    slug: string;
    title: string;
    updatedAt: string;
}
interface GetPost {
    post: Post;
}
export const getPost = async (slug: string): Promise<Post> => {
    const query = gql`
        query MyQuery($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    name
                }
                featuredImage {
                    url
                }
                createdAt
                excerpt
                slug
                title
                updatedAt
            }
        }
    `;
    const results = await request<GetPost>(graphqlAPI!, query, { slug });
    return results.post;
};
