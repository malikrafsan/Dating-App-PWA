import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";

import {
    Button,
    Input,
    Box,
    Text,
} from "@chakra-ui/react";

import { InputField } from "../components/Form/InputField";

import { BaseLayout } from "../layouts";
import styles from "../styles/Home.module.css";
import { ThemeContextProvider } from "../context-providers";

const { ThemeContext } = ThemeContextProvider;

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
            <InputField type="email" label="Email" value={email} setValue={setEmail}/>
            <InputField type="text" label="Username" value={username} setValue={setUsername} />
            <InputField type="password" label="Enter Pasword" value={password} setValue={setPassword} />
            <InputField type="password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
        </BaseLayout>
    );
}


export default Register