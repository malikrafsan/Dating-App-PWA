import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Button } from "@chakra-ui/react";

import { BaseLayout } from "../layouts";
import styles from "../styles/Home.module.css";
import { ThemeContextProvider } from "../context-providers";

const { ThemeContext } = ThemeContextProvider;

const Home = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const router = useNavigate();

  const { theme } = useContext(ThemeContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      router(`/hi/${name}`);
    }
  };

  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router(`/login`);
  };

  return (
    <BaseLayout>
      <div className="Home">
        <div>Theme: {theme}</div>
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className={styles.button}
        >
          count is: {count}
        </button>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            aria-label="What's your name?"
            placeholder="What's your name?"
          />
          <button type="submit">GO</button>
        </form>
        <a href="/about">About</a>
        <Button variant="solidBlue" borderRadius="full">
          Hello World
        </Button>
        <Button variant="solidPink" borderRadius="sm">
          Hello World
        </Button>
        <Button variant="outlineBlue" borderRadius="lg">
          Hello World
        </Button>
        <Button variant="outlinePink" borderRadius="md">
          Hello World
        </Button>
        <div>Deployed Automatically</div>
      </div>
      <Button variant="ghostBlue" borderRadius="xl" onClick={handleLogin}>
        Login
      </Button>
    </BaseLayout>
  );
};

export default Home;
