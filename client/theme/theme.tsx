import { createTheme } from "@mui/material/styles";

const fontStyles = `
/* Irish Grover */
@font-face {
  font-family: 'Irish Grover';
  src: url('../../public/fonts/IrishGrover/irishgrover-regular.woff2') format('woff2'),
       url('../../public/fonts/IrishGrover/irishgrover-regular.woff') format('woff'),
       url('../../public/fonts/IrishGrover/IrishGrover-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Katibeh */
@font-face {
  font-family: 'Katibeh';
  src: url('../../public/fonts/Katibeh/katibeh-regular.woff2') format('woff2'),
       url('../../public/fonts/Katibeh/katibeh-regular.woff') format('woff'),
       url('../../public/fonts/Katibeh/Katibeh-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

if (typeof window !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = fontStyles;
  document.head.appendChild(styleElement);
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FD8E53",
      light: "#FD8E53",
      dark: "rgb(79, 45, 16)",
    },
    background: {
      default: "#FDF7F5",
      paper: "#F6D8C8",
    },
    error: { main: "rgba(168, 0, 0, 1)" },
    text: {
      primary: "#FD8F53",
      secondary: "#FF7B6A",
      disabled: "#fcbf9eef",
      
    },
  },
  typography: {
    fontFamily: ["Katibeh"].join(","),
    h1: {
      fontSize: "80px",
      textTransform: "uppercase",
      fontWeight: 300,
      fontFamily: "Irish Grover",
      color: "#FD8E53",
    },
    h2: {
      fontSize: "48px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "Irish Grover",
      color: "#FD8E53",
    },
     h3: {
      fontSize: "30px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "Irish Grover",
      color: "#FF7B6A",
    },

    body1: {
      fontSize: "50px",
      fontWeight: 600,
      textTransform: "uppercase",
      color: "#FF7B6A",
      textAlign: "center",
    },
    body2: {
      fontSize: "24px",
      fontWeight: 400,
      color: "#FD8E53",
      textAlign: "justify",
    },
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "50px",
          background: "#FD8E53",
          textTransform: "uppercase",
          color: "#fff",
          fontWeight: 300,
          borderRadius: 15,
          cursor: "pointer",
          width: "230px",
          height: "60px",
          letterSpacing: "1px",
          border: "none",
          gap: theme.spacing(3),
          transition: "background 0.4s ease",
          "&:hover": {
            background: "#FF7B6A",
          },
        }),
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          width: "100px",
        }),
      },
    },
  },
});

export const globalStyles = {
  ":root": {
    "--active-color": "rgba(168, 0, 0, 1)",
    "--def-text-color": "#fff",
  },
};

export default theme;
