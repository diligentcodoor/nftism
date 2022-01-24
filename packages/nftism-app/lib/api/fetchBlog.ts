import fetchJson from "./fetchJson";

export type BlogPost = {
  slug: string;
  title: string;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: any[] = await fetchJson(
    "https://www.kennyschachter.art/wp-json/wp/v2/posts",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return posts.map(({ slug, title }) => ({ slug, title: title.rendered }));
};
