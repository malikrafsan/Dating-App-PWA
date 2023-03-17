import {
  VStack,
  Heading,
  Image,
  Button,
  Text,
  Link,
  Center,
} from "@chakra-ui/react";
import { BaseLayout } from "../layouts";
import React, { useState, MouseEventHandler } from "react";
import { InputField } from "../components/";
import { useAuth } from "../context-providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (val: string, key: string) => {
    setFormValues({ ...formValues, [key]: val });
    setErrorMessage("");
  };

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    login(formValues.username, formValues.password)
      .then((_) => {
        navigate("/profile");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        }
      });
  };
  return (
    <BaseLayout>
      <Center h="100%" py={8} flexDir="column" justifyContent="space-evenly">
        <Image px={24} py={8} src="images/logo/logo-loves.png" alt="logo" />
        {/* FIXME: Import Poppins Font */}
        <Heading>Ready, Set, Love!</Heading>
        <VStack mt={8} w="80%" h="100%" gap={2}>
          <InputField
            type="text"
            label="Username"
            value={formValues.username}
            setValue={(val) => handleChange(val, "username")}
          />
          <InputField
            type="password"
            label="Password"
            value={formValues.password}
            setValue={(val) => handleChange(val, "password")}
            errorMessage={errorMessage}
          />
        </VStack>
        <Button onClick={handleLogin} w="60%" variant="solidPink">
          Sign In
        </Button>
        <Text mt={4}>
          Trying to find love?&nbsp;
          <Link href="/register" color="pink.primary">
            Sign Up
          </Link>
          &nbsp;here!
        </Text>
      </Center>
    </BaseLayout>
  );
};

export default Login;
