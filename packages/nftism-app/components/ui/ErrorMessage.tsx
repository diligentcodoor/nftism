import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <Alert
    status="error"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
  >
    <AlertIcon />
    <AlertTitle mr={2}>Error Accessing NFTism</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
    <CloseButton position="absolute" right="8px" top="8px" />
  </Alert>
);
export default ErrorMessage;
