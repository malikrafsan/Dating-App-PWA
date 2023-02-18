import React, { useState } from "react";

import {
  Button,
  Box,
  Text,
  Grid,
  Image,
} from "@chakra-ui/react";

import { InputField } from "../components/Form/InputField";

import { BaseLayout } from "../layouts";


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("email", email);
  console.log("username", username);
  console.log("password", password);
  console.log("confirmPassword", confirmPassword);

  return (
    <BaseLayout>
      <Grid>
        <Box backgroundImage="url('/images/vstock/Vector 5.png')" backgroundSize="100% 100%" backgroundPosition="center" backgroundRepeat="no-repeat" height="40vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Image src={"/images/logo/logo-white.png"} alt="logo" height="150px" />
        </Box>
      </Grid>
      <Grid gap={4}>
        <Grid textAlign="center">
          <Text fontSize="xl" fontWeight="bold">Create an Account</Text>
        </Grid>
        <Grid templateColumns="repeat(1, 1fr)" gap={0} px={10} py={0}>
          <InputField type="email" label="Email" value={email} setValue={setEmail}/>
          <InputField type="text" label="Username" value={username} setValue={setUsername} />
          <InputField type="password" label="Enter Pasword" value={password} setValue={setPassword} />
          <InputField type="password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
        </Grid>
        <Grid alignItems="center" justifyContent="center">
          <Button variant="solidBlue">
                        Sign Up
          </Button>
        </Grid>
        <Grid alignItems="center" justifyContent="center">
          <Text fontSize="sm" color="gray.400">Already have an account? <Text as="span" color="blue.dark">Sign In</Text> here!</Text>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};


export default Register;