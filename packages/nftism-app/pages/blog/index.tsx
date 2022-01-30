import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import parse from "html-react-parser";

import { withIronSessionSsr } from "iron-session/next";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

import LandingLayout from "@components/layouts/LandingLayout";
import { BlogPost, fetchBlogPosts } from "@lib/api/fetchBlog";
import { sessionOptions } from "@lib/session";
import { useMemo } from "react";

type BlogProps = {
  posts: BlogPost[];
};

const BlogCard: React.FC<BlogPost> = ({
  title,
  media,
  date,
  excerpt,
  content,
}) => {
  const humanDate = useMemo(() => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" } as {
      year: "numeric";
      month: "long";
      day: "numeric";
    };
    return new Date(date).toLocaleDateString(undefined, dateOptions);
  }, [date]);

  console.log(content);
  return (
    <Center py={6}>
      <Box
        maxW={"345px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        p={3}
        overflow={"hidden"}
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
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          {parse(excerpt)}
          {parse(content)}
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Kenny Schachter</Text>
            <Text color={"gray.500"}>{humanDate}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
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
    if (!!req.session.user?.isLoggedIn) {
      return { notFound: true };
    }

    const posts = await fetchBlogPosts();
    return { props: { posts } };
  },
  sessionOptions
);

export default Blog;
