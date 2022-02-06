import { useAccount, useConnect } from "wagmi";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import useLogin from "@lib/hooks/useLogin";
import useUser from "@lib/hooks/useUser";

const ConnectorButtons: React.FC = () => {
  const [{ data, error }, connect] = useConnect();
  const { login } = useLogin();

  return (
    <Flex spacing="1em" direction="column">
      {data.connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          variant={"outline"}
          colorScheme={"blackAlpha"}
          size="md"
          my="0.15em"
          border="none"
          onClick={async () => {
            await connect(connector);
            await login();
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
        </Button>
      ))}

      {error && <div>{error?.message ?? "Failed to connect"}</div>}
    </Flex>
  );
};

export const ConnectButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: connectData, error: connectError, loading: connectLoading }] =
    useConnect();
  const [
    { data: accountData, error: accountError, loading: accountLoading },
    disconnect,
  ] = useAccount();
  const { user } = useUser();
  const { login, logout } = useLogin();

  return (
    <>
      <Button
        variant={"outline"}
        colorScheme={"red"}
        _hover={{ bg: "red.500", color: "white" }}
        size="md"
        mr={4}
        isLoading={connectLoading || accountLoading}
        onClick={
          connectData.connected
            ? user?.isLoggedIn
              ? async () => {
                  await logout();
                  disconnect();
                  onClose();
                }
              : async () => {
                  await login();
                }
            : onOpen
        }
      >
        {connectData.connected
          ? user?.isLoggedIn
            ? "Logout"
            : "Sign in"
          : "Connect"}
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen && !connectData.connected}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConnectorButtons />
          </ModalBody>
          <ModalFooter>
            <Button
              variant={"ghost"}
              colorScheme={"blackAlpha"}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
