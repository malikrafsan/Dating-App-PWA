import React, { useState, useEffect, MouseEventHandler } from "react";
import { BaseLayout } from "../layouts";
import { InputField } from "../components/";
import { useAuth } from "../context-providers/AuthProvider";

import {
  Button,
  Box,
  Text,
  Image,
  VStack,
  Heading,
  Link,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleChange = (val: string, key: string) => {
    setFormValues({ ...formValues, [key]: val });
    setErrorMessage("");
  };

  const handleRegister :MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!formValues.email || !formValues.username || !formValues.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    if (!isValidEmail() || !isMatchPassword()) {
      return;
    }

    register(formValues.email, formValues.username, formValues.password)
      .then((_) => {
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        }
      });
  };

  const isValidEmail = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(formValues.email);
  };

  useEffect(() => {
    if (isValidEmail()) {
      setErrorMessageEmail("");
    } else {
      setErrorMessageEmail("Please enter a valid email");
    }
  }, [formValues.email]);


  const isMatchPassword = () => {
    return formValues.password === formValues.confirmPassword;
  };

  useEffect (() => {
    if (isMatchPassword()) {
      setErrorMessage("");
    } else {
      setErrorMessage("Password does not match");
    }
  }, [formValues.password, formValues.confirmPassword]);

  return (
    <BaseLayout>
      <Center h="100%" pb={8} flexDir="column" justifyContent="space-evenly">
        <Box backgroundImage="url('/images/vstock/Vector 5.png')" backgroundSize="100% 100%" backgroundRepeat="no-repeat" w="100%" h="60%" display="flex" alignItems="center" justifyContent="center" mb={8} >
          <Image src="images/logo/logo-white.png" alt="logo" w="40%" />
        </Box>
            
        <Heading>Create Your Account</Heading>
        <VStack mt={8} w="80%" h="100%" gap={2}>
          <InputField
            type="email"
            label="Email"
            value={formValues.email}
            setValue={(val) => handleChange(val, "email")}
            errorMessage={errorMessageEmail}
          />
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
          />
          <InputField
            type="password"
            label="Confirm Password"
            value={formValues.confirmPassword}
            setValue={(val) => handleChange(val, "confirmPassword")}
            errorMessage={errorMessage}
          />
        </VStack>
        <Button onClick={handleRegister} w="60%" variant="solidBlue">
                Sign Up
        </Button>
        <Text mt={4}>
                Already have an account?&nbsp;
          <Link href="/login" color="pink.primary">
                Sign In
          </Link>
                &nbsp;here!
        </Text>
      </Center>
    </BaseLayout>
  );
};


export default Register;