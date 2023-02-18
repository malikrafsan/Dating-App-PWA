import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { InputStyles as Input } from "./components/inputStyles";
import { LinkStyles as Link } from "./components/linkStyles";

const theme = extendTheme({
  colors: {
    blue: {
      "primary": "#3E3684",
      "secondary": "#BFDBFF",
      "light": "#FBFBFF",
      "dark": "#312B67",
    },
    pink: {
      "primary": "#FF60AF",
      "secondary": "#FFC1E3",
      "light": "#FFFBFD",
      "dark": "#EB3F94",
    }
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "blue.dark",
      },
      "#app": {
        maxWidth: "30em",
        margin: "0 auto",
        bg: "blue.light",
        minHeight: "100vh",
      }
    },
  },

  components: {
    Button,
    Input,
    Link,
  }

});

export default theme;