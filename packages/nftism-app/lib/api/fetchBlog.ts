import { fetchQL } from "./fetchJson";

export type BlogPost = {
  slug: string;
  title: string;
  media: string;
  date: string;
  excerpt: string;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const {
    data: {
      posts: { nodes: posts },
    },
  } = (await fetchQL(
    `
    query AllPosts {
      posts (first: 20, where: { orderby: { field: DATE, order: DESC }, categoryNotIn: "345"}) {
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
