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
      "pink-3": {
        dark: "#C6A7A7",
        pure: "#F4998E",
        light: "#FCEDED",
        lighter: " #FCF7F7",
      },
      black: {
        pure: "#032437",
        light: "#C5CED5",
        dark: "#021520",
      },
      error: {
        dark: "#FA5856",
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
        footer: "#6d7278",
      },
      stat: {
        increase: "#5DCE8D",
        decrease: "#E9506B",
      },
      active: {
        pure: "#8872BC",
        light: "#EDEAF4",
      },
      passed: {
        pure: "#5DCE8D",
        light: "#DFF5E8",
      },
      failed: {
        pure: "#A7B2C2",
        light: "#EDF0F3",
      },
      against: {
        pure: "#EC6087",
      },
      alert: {
        error: "#E61744",
        loading: "#068DFE",
        pending: "#FE9F7C",
        success: "#5DCE8D",
      },
      white: "#fff",
      "true-black": "#000",
      transparent: "transparent",
      twitter: "#1DA1F2",
    },
    screens: {
      sm: "768px",
      md: "896px",
      lg: "1280px",
      xl: "1440px",
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
      mono: [
        "SFMono-Regular",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "monospace",
      ],
      inter: [
        "Inter",
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
      boxShadow: {
        "button-focus":
          "0 0 0 3px rgba(66, 153, 225, 0.5), 0px 8px 32px rgba(0, 0, 0, 0.13)",
        button: "0px 8px 32px rgba(0, 0, 0, 0.13)",
        card: "0px 5px 13px rgba(207, 192, 192, 0.25)",
        app: "-35px 1.16px 74px rgba(207, 192, 192, 0.16)",
        input: "0px 0px 12px rgba(19, 44, 106, 0.1)",
        smooth: `0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)`,
        "governance-nav": "0px 0px 8px #DEB9B9",
        "governance-stat": "0px 0px 16px #FBF4F4",
      },
      spacing: {
        "2px": "2px",
      },
      backgroundOpacity: {
        10: "0.1",
      },
      lineHeight: {
        12: "3rem",
      },
      fontSize: {
        "3xl": "2rem",
        "4xl": "2.5rem",
        "10xl": "10rem",
      },
      cursor: {
        inherit: "inherit",
        help: "help",
      },
      maxWidth: {
        "screen-md-gutter": "calc(912px + 1.5rem * 2)",
        "screen-lg-gutter": "calc(1080px + 1.5rem * 2)",
        "screen-xl-gutter": "calc(1280px + 1.5rem * 2)",
      },
      letterSpacing: {
        "inter-16": "-0.011em",
        "inter-18": "-0.014em",
        "inter-20": "-0.017em",
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
  },
  plugins: [],
  purge: [
    "./components/**/*.js",
    "./pages/**/*.js",
    "./views/**/*.js",
    "./svgs/**/*.js",
    "./text/**/*.js",
  ],
  corePlugins: {
    float: false,
    container: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    extendedSpacingScale: true,
  },
};
