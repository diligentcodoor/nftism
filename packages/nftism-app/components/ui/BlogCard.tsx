import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { Post } from "@lib/api/fetchBlog";
import { humanReadableDate } from "@lib/utils";

const BlogCard: React.FC<Post> = ({ title, media, date, slug }) => {
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

export default BlogCard;
