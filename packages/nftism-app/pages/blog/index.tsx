import type { GetServerSideProps, NextPage } from "next";

import { withIronSessionSsr } from "iron-session/next";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

import LandingLayout from "@components/layouts/LandingLayout";
import { Post, fetchBlogPosts } from "@lib/api/fetchBlog";
import { getRoleProps, sessionOptions } from "@lib/session";
import BlogCard from "@components/ui/BlogCard";
import Error from "next/error";

type BlogProps = {
  posts: Post[];
  errorCode: number;
  errorMsg: string;
};

const Blog: NextPage<BlogProps> = ({ posts, errorCode, errorMsg }) => {
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }, "base");
  const columns: Post[][] = Array(columnCount)
    .fill(0)
    .map(() => []);
  for (const [i, post] of posts.entries()) {
    columns[i % columnCount!].push(post);
  }

  return (
    <LandingLayout>
      {errorCode > 0 ? (
        <Error statusCode={errorCode} title={errorMsg} />
      ) : (
        <Flex>
          {columns.map((columnPosts, i) => (
            <Flex key={i} direction="column">
              {columnPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </Flex>
          ))}
        </Flex>
      )}
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    res.setHeader(
      "Cache-Control",
      "private, s-maxage=3600, stale-while-revalidate"
    );

    return await getRoleProps(
      req.session.user,
      { posts: async () => await fetchBlogPosts() },
      { posts: [] }
    );
  },
  sessionOptions
);

export default Blog;
