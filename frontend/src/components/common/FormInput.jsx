// src/components/common/FormInput.jsx
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  size = "md",
  helperText,
  ...props
}) {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const getBorderColor = () => {
    if (error && isTouched) return "red.300";
    if (isTouched && value) return "green.300";
    return "gray.200";
  };

  return (
    <FormControl
      isRequired={required}
      isInvalid={!!error && isTouched}
      position="relative"
    >
      <Box mb={1}>
        <FormLabel
          fontWeight="medium"
          color="gray.700"
          fontSize={size === "lg" ? "md" : "sm"}
          mb={1}
        >
          {label}
          {required && (
            <Text as="span" color="red.400" ml={1}>
              *
            </Text>
          )}
        </FormLabel>
        {helperText && (
          <Text fontSize="xs" color="gray.500" mb={1}>
            {helperText}
          </Text>
        )}
      </Box>

      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        focusBorderColor={error && isTouched ? "red.400" : "teal.400"}
        borderColor={getBorderColor()}
        bg="white"
        size={size}
        _hover={{
          borderColor: "gray.300",
        }}
        transition="border-color 0.2s"
        {...props}
      />

      {error && isTouched && (
        <FormErrorMessage fontSize="sm" mt={1}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
