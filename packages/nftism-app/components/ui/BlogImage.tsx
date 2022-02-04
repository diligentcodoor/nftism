import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface Props {
  src: string;
  alt?: string;
}

const BlogImage: React.FC<Props> = ({ src, alt }) => (
  <Box alignSelf="center" position="relative" boxSize="xl" my="10px">
    <Image src={src} alt={alt || src} layout="fill" objectFit="contain" />
  </Box>
);

export default BlogImage;
