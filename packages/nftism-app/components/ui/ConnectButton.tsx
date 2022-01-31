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
import { useAccount, useConnect } from "wagmi";

const ConnectorButtons: React.FC = () => {
  const [{ data, error }, connect] = useConnect();
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
          onClick={() => connect(connector)}
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

  return (
    <>
      <Button
        variant={"outline"}
        colorScheme={"blackAlpha"}
        size="md"
        mr={4}
        isLoading={connectLoading || accountLoading}
        onClick={
          connectData.connected
            ? () => {
                disconnect();
                onClose();
              }
            : onOpen
        }
      >
        {connectData.connected ? "Disconnect" : "Connect"}
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
