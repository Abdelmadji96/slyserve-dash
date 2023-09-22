import { createTheme } from "@material-ui/core/styles";
import { enUS } from "@material-ui/core/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#ff0000",
      },
      secondary: {
        main: "#00b300",
      },
    },
    typography: {
      fontFamily: "inherit",
    },
  },
  enUS
);

export default theme;
