import {
  Flex,
  VStack,
  Heading,
  Image,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { BaseLayout } from "../layouts";
import React from "react";
import { InputField } from "../components/Form/InputField";

const Login = () => {
  const [formValues, setFormValues] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("formValues", formValues);
  };
  return (
    <BaseLayout>
      <VStack h="100vh" gap={16} py={16}>
        <Image px={16} src="images/logo/logo-loves.png" alt="logo" />
        <Heading>Ready, Set, Love!</Heading>
        <VStack gap={8} w="80%">
          <InputField
            type="text"
            label="Username"
            value={formValues.username}
            setValue={(val) => setFormValues({ ...formValues, username: val })}
          />
          <InputField
            type="text"
            label="Password"
            value={formValues.password}
            setValue={(val) => setFormValues({ ...formValues, password: val })}
          />
        </VStack>
        <Button onClick={handleLogin} w="60%" variant="solidPink">
          Sign In
        </Button>
        <Text>
          Trying to find love?{" "}
          <Link href="/register" color="pink.primary">
            Sign Up
          </Link>{" "}
          here!
        </Text>
      </VStack>
    </BaseLayout>
  );
};

export default Login;
