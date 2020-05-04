module.exports = {
  theme: {
    colors: {
      pink: {
        pure: "#F4DBD8",
        light: "#FDF8F7",
      },
      "pink-2": {
        pure: "#FDAFA6",
        light: "#F7EAEB",
      },
      "pink-coral": {
        pure: "#F9C4BE",
        light: "#F7EEF0",
      },
      black: {
        pure: "#032437",
        light: "#C5CED5",
        dark: "#021520",
      },
      error: {
        pure: "#F77849",
        light: "#FCDFDF",
      },
      success: {
        pure: "#5DCE8D",
        light: "#DFF5E8",
      },
      border: {
        pure: "#E8E9EF",
        light: "#FAFBFC",
      },
      grey: {
        pure: "#657794",
        light: "#E0E4EA",
      },
      type: {
        base: "#032437",
        light: "#657794",
        lighter: "#A7B2C2",
        lightest: "#A4A8AD",
      },
      white: "#fff",
      "true-black": "#000",
      transparent: "transparent",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1080px",
      xl: "1280px",
    },
    fontFamily: {
      sans: [
        "Montserrat",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sf: [
        "SF Text",
        "SF Pro Text",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      spacing: {
        "2px": "2px",
        "72": "18rem",
      },
      screens: {
        sm: "768px",
        md: "896px",
        lg: "1280px",
        xl: "1440px",
      },
      lineHeight: {
        "12": "3rem",
      },
      fontSize: {
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      maxWidth: {
        "screen-md-gutter": "calc(912px + 1.5rem * 2)",
        "screen-lg-gutter": "calc(1080px + 1.5rem * 2)",
        "screen-xl-gutter": "calc(1280px + 1.5rem * 2)",
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: true,
    content: ["./components/**/*.js", "./pages/**/*.js", "./views/**/*.js"],
  },
  corePlugins: {
    float: false,
    container: false,
  },
};
