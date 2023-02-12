import { extendTheme, grid } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { InputStyles as Input } from "./components/inputStyles";

const theme = extendTheme({
    colors: {
        blue : {
            "primary" : "#3E3684",
            "secondary" : "#BFDBFF",
            "light" : "#FBFBFF",
            "dark" : "#312B67",
        },
        pink : {
            "primary" : "#FF60AF",
            "secondary" : "#FFC1E3",
            "light" : "#FFFBFD",
            "dark" : "#EB3F94",
        }
    },
    fonts: {
        heading: "Poppins",
        body: "Poppins",

    },
    styles: {
        global: {
            body: {
                bg: "blue.light",
                color: "blue.dark",
            },
            "#app" : {
                maxWidth: "30em",
                margin: "0 auto",
            }
        },
    },

    components: {
        Button,
        Input,
    }

});

export default theme;