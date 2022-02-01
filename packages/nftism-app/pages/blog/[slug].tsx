import { useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
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
import { humanReadableDate, parseDiviContent } from "@lib/utils";

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
        {/* <Image src={post.media} alt={post.title} height="fill" /> */}
        <Heading>{post.title}</Heading>
        <Text>{humanDate}</Text>
        {parseDiviContent(post.content!)}
      </Flex>
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, params }) => {
    if (!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }
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
