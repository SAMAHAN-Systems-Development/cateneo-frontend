import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cateneo: {
          white: "#F1EDE2",
          darkbrown: "#83491B",
          lightbrown: "#BF7900",
          orange: "#E3981B",
          black: "#3A3A3A",
        },
        success: {
          one: "#D1F2EB",
          two: "#A3E4D7",
          three: "#76D7C4",
          four: "#48C9B0",
          five: "#1ABC9C",
        },
        error: {
          one: "#FADBD8",
          two: "#F5B7B1",
          three: "#F1948A",
          four: "#EC7063",
          five: "#E74C3C",
        },
        fontFamily: {
          playpen: ["Playpen Sans"],
          gaegu: ["Gaegu"],
        },
      },
    },
  },
  plugins: [],
};

export default config;
