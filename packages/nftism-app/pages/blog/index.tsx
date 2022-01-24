import type { GetServerSideProps, NextPage } from "next";

import LandingLayout from "@components/layouts/LandingLayout";
import { BlogPost, fetchBlogPosts } from "@lib/api/fetchBlog";
import { Text } from "@chakra-ui/react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@lib/session";

type BlogProps = {
  posts: BlogPost[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <LandingLayout>
      <Text>{posts.map((post) => post.title)}</Text>
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    if (!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }

    const posts = await fetchBlogPosts();
    return { props: { posts } };
  },
  sessionOptions
);

export default Blog;
