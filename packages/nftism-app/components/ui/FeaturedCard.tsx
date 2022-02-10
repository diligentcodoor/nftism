import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

type BaseProps = {
  artist: string;
  title: string;
  imgSrc: string;
};

type SingleLinkProps = BaseProps & { type: "single"; href: string };
type MultiLinkProps = BaseProps & {
  type: "multi";
  hrefs: { title: string; link: string }[];
};

export type Props = SingleLinkProps | MultiLinkProps;

const FeaturedCard: React.FC<Props> = (props: Props) => (
  <LinkBox>
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${props.imgSrc})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={props.imgSrc}
            alt={props.title}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"red.300"} fontSize={"sm"} textTransform={"uppercase"}>
            {props.artist}
          </Text>
          {props.type === "single" ? (
            <LinkOverlay href={props.href}>
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                {props.title}
              </Heading>
            </LinkOverlay>
          ) : (
            <Menu placement="top" flip={false} size="sm" colorScheme="red">
              <MenuButton
                as={Button}
                rightIcon={<ChevronUpIcon />}
                variant="outline"
                colorScheme="blue"
                size="sm"
              >
                {props.title}
              </MenuButton>
              <MenuList>
                {props.hrefs.map((href, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => window.open(href.link, "_blank")}
                    color="gray.900"
                    fontSize={"md"}
                  >
                    {href.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Box>
    </Center>
  </LinkBox>
);

export default FeaturedCard;
