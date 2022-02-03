import { AspectRatio } from "@chakra-ui/react";

interface Props {
  src: string;
}

const BlogVideo: React.FC<Props> = ({ src }) => (
  <AspectRatio maxW="100%">
    <iframe
      title=""
      src={src}
      loading="lazy"
      allow="autoplay; fullscreen; picture-in-picture"
      name="fitvid0"
      frameBorder="0"
    />
  </AspectRatio>
);

export default BlogVideo;
