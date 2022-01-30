import fetchJson from "./fetchJson";

export type BlogPost = {
  slug: string;
  title: string;
  media: string;
  date: string;
  excerpt: string;
  content: string;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: any[] = await fetchJson(
    "https://www.kennyschachter.art/wp-json/wp/v2/posts?per_page=1",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(typeof posts[0].content.rendered);
  return posts.map(
    ({
      slug,
      title,
      jetpack_featured_media_url: media,
      date,
      excerpt,
      content,
    }) => ({
      slug,
      title: title.rendered,
      media,
      date: date,
      excerpt: excerpt.rendered,
      content: content.rendered,
    })
  );
};
