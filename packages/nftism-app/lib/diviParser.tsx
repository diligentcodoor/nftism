import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from "html-react-parser";
import BlogVideo from "@components/ui/BlogVideo";
import BlogImage from "@components/ui/BlogImage";
import { Attributes } from "html-react-parser/lib/attributes-to-props";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { buildVideoLink, extractURL } from "./utils";
import BlogAudio from "@components/ui/BlogAudio";

type TextNode = {
  type: "text";
  data: string;
};

type TagNode = {
  type: "tag";
  attribs: Attributes;
  name: string;
  children: Array<TextNode | TagNode>;
};

export function parseDiviContent(
  content: string
): string | JSX.Element | JSX.Element[] {
  return parse(content, options);
}

const options: HTMLReactParserOptions = {
  replace: (_node: DOMNode): any => {
    const node = _node as TextNode | TagNode;
    if (node.type && node.type === "tag") {
      return parseTag(node);
    } else {
      return parseText(node);
    }
  },
};

function parseTag(node: TagNode): null | string | JSX.Element | JSX.Element[] {
  switch (node.name) {
    case "p": {
      return (
        <Text fontSize="md" align="left" py="5px">
          {domToReact(node.children as DOMNode[], options)}
        </Text>
      );
    }
    case "a": {
      return (
        <Link color={"red.300"} href={node.attribs.href} isExternal>
          {domToReact(node.children as DOMNode[], options)}
        </Link>
      );
    }
    case "h3": {
      return (
        <Heading
          as="h3"
          color="#666666"
          fontSize="sm"
          fontStyle="italic"
          fontWeight="thin"
          textAlign="center"
          paddingBottom="10px"
        >
          {domToReact(node.children as DOMNode[], options)}
        </Heading>
      );
    }
    case "blockquote": {
      return (
        <Box
          position="relative"
          borderLeft="5px solid"
          borderColor="red.300"
          alignContent="left"
          my="20px"
        >
          <Text paddingLeft="15px">
            {domToReact(node.children as DOMNode[], options)}
          </Text>
        </Box>
      );
    }
    case "div": {
      return <>{domToReact(node.children as DOMNode[], options)}</>;
    }
    default: {
      return null;
    }
  }
}

function parseText(
  node: TextNode
): null | string | JSX.Element | JSX.Element[] {
  const { data } = node;
  if (data.includes("et_pb")) {
    if (data.includes("et_pb_image")) {
      const src = extractURL(data);
      if (!src) return <></>;
      return <BlogImage src={src} />;
    } else if (data.includes("et_pb_video")) {
      const src = extractURL(data);
      if (!src) return null;
      return <BlogVideo src={buildVideoLink(src)} />;
    } else if (data.includes("et_pb_audio")) {
      const src = extractURL(data);
      if (!src) return null;
      return <BlogAudio src={src} />;
    } else {
      return <></>;
    }
  }
  return null;
}
