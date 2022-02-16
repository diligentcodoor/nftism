import { fetchQL } from "./fetchJson";

export type Post = {
  slug: string;
  title: string;
  media: string;
  date: string;
  content?: string;
};

export const fetchBlogPosts = async (): Promise<Post[]> => {
  const {
    data: {
      posts: { nodes: posts },
    },
  } = (await fetchQL(
    `
    query AllPosts {
      posts (first: 20, where: { orderby: { field: DATE, order: DESC }}) {
        nodes {
          date
          title
          slug
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    `
  )) as { data: { posts: { nodes: any[] } } };
  return posts
    .filter((post) => !!post.featuredImage)
    .map(
      ({
        slug,
        title,
        featuredImage: {
          node: { mediaItemUrl: media },
        },
        date,
      }) => ({
        slug,
        title,
        date,
        media,
      })
    );
};

export const fetchBlogPost = async (
  slug: string
): Promise<Post | undefined> => {
  const {
    data: { post: post },
  } = (await fetchQL(
    `
    query Post($id: ID!) {
      post(id: $id, idType: SLUG) {
        date
        content
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
    `,
    { variables: { id: slug } }
  )) as { data: { post: any } };

  if (!post) return undefined;

  const {
    date,
    content,
    title,
    featuredImage: {
      node: { mediaItemUrl: media },
    },
  } = post;

  return { date, content, title, media, slug } as Post;
};
