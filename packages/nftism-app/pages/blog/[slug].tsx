import type { GetServerSideProps, NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";

import LandingLayout from "@components/layouts/LandingLayout";
import { Post, fetchBlogPost } from "@lib/api/fetchBlog";
import { getRoleProps, sessionOptions } from "@lib/session";
import BlogPost from "@components/ui/BlogPost";
import Error from "next/error";

type BlogProps = {
  post: Post;
  errorCode: number;
  errorMsg: string;
};

const BlogPage: NextPage<BlogProps> = ({ post, errorCode, errorMsg }) => {
  return (
    <LandingLayout>
      {errorCode > 0 ? (
        <Error statusCode={errorCode} title={errorMsg} />
      ) : (
        <BlogPost {...post} />
      )}
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    res.setHeader(
      "Cache-Control",
      "private, s-maxage=3600, stale-while-revalidate"
    );

    return await getRoleProps(
      req.session.user,
      {
        post: async () => await fetchBlogPost(params!.slug as string),
      },
      { post: {} }
    );
  },
  sessionOptions
);

export default BlogPage;
