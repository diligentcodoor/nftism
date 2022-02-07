import { useMemo } from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";

import BlogImage from "@components/ui/BlogImage";
import { Post } from "@lib/api/fetchBlog";
import { humanReadableDate } from "@lib/utils";
import { parseDiviContent } from "@lib/diviParser";

const BlogPost: React.FC<Post> = ({ title, date, media, content }) => {
  const humanDate = useMemo(() => humanReadableDate(date), [date]);
  return (
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
        {title}
      </Heading>
      <Text fontSize="sm" py="3px" color="red.300" align="left">
        {humanDate}
      </Text>
      <BlogImage src={media} alt={title} />
      <Flex direction="column">{parseDiviContent(content!)}</Flex>
    </Flex>
  );
};

export default BlogPost;
