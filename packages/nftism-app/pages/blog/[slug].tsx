import type { GetServerSideProps, NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";

import LandingLayout from "@components/layouts/LandingLayout";
import { Post, fetchBlogPost } from "@lib/api/fetchBlog";
import { sessionOptions } from "@lib/session";
import BlogPost from "@components/ui/BlogPost";

type BlogProps = {
  post: Post;
};

const BlogPage: NextPage<BlogProps> = ({ post }) => {
  return (
    <LandingLayout>
      <BlogPost {...post} />
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, params }) => {
    if (!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate"
    );
    const slug = params!.slug as string;

    const post = await fetchBlogPost(slug);
    if (!post) {
      return { notFound: true };
    }

    return { props: { post } };
  },
  sessionOptions
);

export default BlogPage;
