import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useConnect } from "wagmi";
import { useWagmiModal } from "../../hooks/wagmi-provider";

const ConnectorButtons: React.FC = () => {
  const [{ data, error }, connect] = useConnect();
  return (
    <div>
      {data.connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
        </Button>
      ))}

      {error && <div>{error?.message ?? "Failed to connect"}</div>}
    </div>
  );
};

export const WagmiModal: React.FC = () => {
  const { isOpen, closeWagmiModal } = useWagmiModal();
  console.log(isOpen);

  return (
    <>
      <Modal onClose={closeWagmiModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConnectorButtons />
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeWagmiModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
