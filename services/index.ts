import { request, gql } from "graphql-request";

interface Author {
    bio: string;
    name: string;
    id: string;
    photo: {
        url: string;
    };
}

interface FeaturedImage {
    url: string;
}

interface Category {
    name: string;
    slug: string;
}

interface Node {
    author: Author;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: FeaturedImage;
    categories: Category[];
}

export interface Edge {
    node: Node;
}

export interface PostsConnection {
    edges: Edge[];
}

interface PostsConnectionResult {
    postsConnection: PostsConnection;
}

export interface RecentPost {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

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
    const results = await request<PostsConnectionResult>(graphqlAPI!, query);
    return results.postsConnection.edges;
};

export const getRecentPosts = async (): Promise<RecentPost[]> => {
    const query = gql`
        query MyQuery {
            posts(last: 10, orderBy: createdAt_ASC) {
                title
                slug
                createdAt
                featuredImage {
                    url
                }
            }
        }
    `;
    const results = await request<RecentPost[]>(graphqlAPI!, query);
    return results;
};
