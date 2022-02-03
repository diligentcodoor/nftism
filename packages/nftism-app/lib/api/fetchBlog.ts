import { fetchQL } from "./fetchJson";

export type BlogPost = {
  slug: string;
  title: string;
  media: string;
  date: string;
  excerpt?: string;
  content?: string;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const {
    data: {
      posts: { nodes: posts },
    },
  } = (await fetchQL(
    `
    query AllPosts {
      posts (first: 20, where: { orderby: { field: DATE, order: DESC }, categoryNotIn: "345", categoryIn: "340"}) {
        nodes {
          excerpt
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
  return posts.map(
    ({
      slug,
      title,
      featuredImage: {
        node: { mediaItemUrl: media },
      },
      date,
      excerpt,
    }) => ({
      slug,
      title,
      date,
      excerpt,
      media,
    })
  );
};

export const fetchBlogPost = async (
  slug: string
): Promise<BlogPost | undefined> => {
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

  return { date, content, title, media, slug } as BlogPost;
};
