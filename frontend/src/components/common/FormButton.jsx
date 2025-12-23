// src/components/common/FormButton.jsx
import { Button } from "@chakra-ui/react";

export default function FormButton({
  children,
  onClick,
  type = "button",
  isLoading = false,
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      isLoading={isLoading}
      colorScheme="teal"
      width="full"
    >
      {children}
    </Button>
  );
}
