import { useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

import LandingLayout from "@components/layouts/LandingLayout";
import { BlogPost, fetchBlogPost } from "@lib/api/fetchBlog";
import { sessionOptions } from "@lib/session";
import { humanReadableDate } from "@lib/utils";
import { parseDiviContent } from "@lib/diviParser";
import BlogImage from "@components/ui/BlogImage";
type BlogProps = {
  post: BlogPost;
};

const BlogPage: NextPage<BlogProps> = ({ post }) => {
  const humanDate = useMemo(() => humanReadableDate(post.date), [post.date]);
  return (
    <LandingLayout>
      <Flex
        direction="column"
        width={{ base: "90%", sm: "80%", md: "70%", lg: "50%" }}
      >
        <Heading
          fontWeight="normal"
          color="#333"
          textAlign="left"
          as="h1"
          size="lg"
        >
          {post.title}
        </Heading>
        <Text fontSize="sm" py="3px" color="red.300" align="left">
          {humanDate}
        </Text>
        <BlogImage src={post.media} alt={post.title} />
        <Flex direction="column">{parseDiviContent(post.content!)}</Flex>
      </Flex>
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
