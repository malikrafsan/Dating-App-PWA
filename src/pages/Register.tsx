import React, { useState, useEffect, MouseEventHandler } from "react";
import { BaseLayout } from "../layouts";
import { FullPageError, FullPageLoading, InputField, DropdownField } from "../components/";
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
import university from "../api/university";

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc2FzEBFwfUOsfzLrO677LBvitz1UBOOmQmQH4khSJQTBCjng/viewform";

const Register = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    university: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [universityData, setUniversityData] = useState<any>([]);

  const [options, setOptions] = useState<string[]>();

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
    if (options && !options?.includes(formValues.university)) {
      console.log("formValues.university",formValues.university);
      console.log("options",options);
      setErrorMessage("Please select a valid university");
      return;
    }

    const university = universityData.find((item: any) => item.name === formValues.university).slug;

    register(formValues.email, formValues.username, formValues.password, university)
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
      setErrorMessagePassword("");
    } else {
      setErrorMessagePassword("Password does not match");
    }
  }, [formValues.password, formValues.confirmPassword]);

  const getUniversityData = async () => {
    setIsLoading(true);
    try {
      const res = await university.getUniversities();
      setUniversityData(res.data.universities);
      setOptions(res.data.universities.map((item: any) => item.name));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUniversityData();
  }, []);

  if (isLoading) {
    return <FullPageLoading />;
  } else if (!isLoading && !options) {
    return <FullPageError message="Something went wrong. Please try again later." />;
  }

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
            id="email-input"
          />
          <InputField
            type="text"
            label="Username"
            value={formValues.username}
            id="username-input"
            setValue={(val) => handleChange(val, "username")}
          />
          <InputField
            type="password"
            label="Password"
            id="password-input"
            value={formValues.password}
            setValue={(val) => handleChange(val, "password")}
          />
          <InputField
            type="password"
            label="Confirm Password"
            id="confirm-password-input"
            value={formValues.confirmPassword}
            setValue={(val) => handleChange(val, "confirmPassword")}
            errorMessage={errorMessagePassword}
          />
          <DropdownField
            value={formValues.university}
            onChange={(val) => {
              if (!val) {
                handleChange("", "university");
                return;
              }

              handleChange(val.value, "university");
            }}
            id="university-input"
            onCreateOption={() => {
              window.open(formUrl, "_blank");
            }}
            label="University"
            options={options}
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