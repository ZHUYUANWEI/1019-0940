import { defineConfig } from "windicss/helpers"
import colors from "windicss/colors"
import plugin from "windicss/plugin"

const defaultSizes = {
  header: "48px",
}

export default defineConfig({
  darkMode: "class", // or 'media'
  attributify: true,
  preflight: false,
  theme: {
    // 覆盖配置，未提供的任何键都将从默认主题继承
    fontSize: {
      body: "14px",
      "12px": "12px",
      "14px": "14px",
      "16px": "16px",
      "22px": "22px",
      xs: ["12px", "18px"],
      sm: ["13px", "19px"],
      base: ["14px", "20px"],
      md: ["14px", "20px"],
      lg: ["16px", "24px"],
      xl: ["20px", "28px"],
      xxl: ["24px", "32px"],
      xxxl: ["30px", "36px"],
    },

    // 补充拓展 保留默认选项，添加新值
    extend: {
      // 自定义后缀header  例如 h-header mt-header pt-header
      height: defaultSizes,
      margin: defaultSizes,
      padding: defaultSizes,
      boxShadow: {
        blue: "0 2px 16px 0 rgba(72, 95, 234, 0.1), 0 0px 4px 0 rgba(72, 95, 234, 0.1)",
      },
      borderRadius: {
        "8px": "8px",
      },
      screens: {
        xlg: "992px",
      },
      textColor: {
        "999": "#999999",
        "666": "#666666",
        "333": "#333333",
        fff: "#fff",
      },
      colors: {
        primary: "#1672FD",
        success: "#31C989",
        warning: "#E6A23C",
        danger: "#FF4D4F",
        info: "#909399",
        "999": "#999999",
        "666": "#666666",
        "333": "#333333",
      },
      fontFamily: {
        main: ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "SimSun", "sans-serif"],
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },

      // eslint-disable-next-line no-unused-vars
      backgroundImage: (theme) => ({
        // 使用示例：<div class="bg-login" />
        login: "url('@/assets/images/bg_login.jpg')",
      }),
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".skew-10deg": {
          transform: "skewY(-10deg)",
        },
        ".skew-15deg": {
          transform: "skewY(-15deg)",
        },
      }
      addUtilities(newUtilities)
    }),
    plugin(({ addComponents }) => {
      const buttons = {
        ".btn": {
          padding: ".5rem 1rem",
          borderRadius: ".25rem",
          fontWeight: "600",
        },
        ".btn-blue": {
          backgroundColor: "#3490dc",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2779bd",
          },
        },
        ".btn-red": {
          backgroundColor: "#e3342f",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#cc1f1a",
          },
        },
      }
      addComponents(buttons)
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic(
        "skew",
        ({ Utility, Style }) => {
          return Utility.handler
            .handleStatic(Style("skew"))
            .handleNumber(0, 360, "int", (number) => `skewY(-${number}deg)`)
            .createProperty("transform")
        },
        variants("skew"),
      )
    }),
    require("windicss/plugin/filters"),
    require("windicss/plugin/forms"),
    require("windicss/plugin/aspect-ratio"),
    require("windicss/plugin/line-clamp"),
    // require('windicss/plugin/typography')({
    //     modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
    // }),
  ],
})
