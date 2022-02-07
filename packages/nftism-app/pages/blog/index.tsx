import type { GetServerSideProps, NextPage } from "next";

import { withIronSessionSsr } from "iron-session/next";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

import LandingLayout from "@components/layouts/LandingLayout";
import { Post, fetchBlogPosts } from "@lib/api/fetchBlog";
import { sessionOptions } from "@lib/session";
import BlogCard from "@components/ui/BlogCard";

type BlogProps = {
  posts: Post[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }, "base");
  const columns: Post[][] = Array(columnCount)
    .fill(0)
    .map(() => []);
  for (const [i, post] of posts.entries()) {
    columns[i % columnCount!].push(post);
  }

  return (
    <LandingLayout>
      <Flex>
        {columns.map((columnPosts, i) => (
          <Flex key={i} direction="column">
            {columnPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </Flex>
        ))}
      </Flex>
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    if (!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate"
    );

    const posts = await fetchBlogPosts();
    return { props: { posts } };
  },
  sessionOptions
);

export default Blog;
