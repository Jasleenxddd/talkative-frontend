// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    teal: {
      50: '#E3F8FF',
      100: '#B3ECFF',
      200: '#81DEFD',
      300: '#5ED0FA',
      400: '#40C3F7',
      500: '#2BB0ED',
      600: '#1992D4',
      700: '#127FBF',
      800: '#0B69A3',
      900: '#035388',
      1000: '#5fc1ba', // Custom color added here
    },
    customPink: {
        50: '#FFE3E7',
        100: '#FFB3C1',
        200: '#FF81A2',
        300: '#FF5E8C',
        400: '#FF4078',
        500: '#FF2B69',
        600: '#D41958',
        700: '#BF1250',
        800: '#A30B46',
        900: '#880339',
        1000: '#e8808f', // Custom pink color
      },
  },
});

export default theme;
