import { useMemo } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

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
import { BlogPost, fetchBlogPosts } from "@lib/api/fetchBlog";
import { sessionOptions } from "@lib/session";
import { humanReadableDate } from "@lib/utils";

type BlogProps = {
  posts: BlogPost[];
};

const BlogCard: React.FC<BlogPost> = ({ title, media, date, slug }) => {
  const humanDate = useMemo(() => humanReadableDate(date), [date]);

  return (
    <Link href={`/blog/${slug}`} passHref>
      <Center py={6}>
        <Box
          maxW={"345px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          p={3}
          overflow={"hidden"}
          border="1px solid white"
          _hover={{
            cursor: "pointer",
            boxShadow: "inset 0px 0px 5px #c1c1c1",
            border: "1px solid",
            borderColor: "red.300",
          }}
        >
          <Box h={"210px"} bg={"gray.100"} mb={6} pos={"relative"}>
            <Image
              src={media}
              layout="fill"
              objectFit="cover"
              alt={`Thumbnail Image for "${title}"`}
            />
          </Box>
          <Stack>
            <Heading
              fontWeight="light"
              color="#333"
              textAlign="left"
              as="h1"
              size="md"
            >
              {title}
            </Heading>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>Kenny Schachter</Text>
              <Text color={"red.300"}>{humanDate}</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 }, "base");
  const columns: BlogPost[][] = Array(columnCount)
    .fill(0)
    .map(() => []);
  for (const [i, post] of posts.entries()) {
    columns[i % columnCount!].push(post);
  }

  return (
    <LandingLayout>
      <Flex>
        {columns.map((columnPosts, i) => (
          <Flex px="0px" key={i} direction="column">
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
    res.setHeader("Cache-Control", `s-maxage=3600, stale-while-revalidate`);

    const posts = await fetchBlogPosts();
    return { props: { posts } };
  },
  sessionOptions
);

export default Blog;
