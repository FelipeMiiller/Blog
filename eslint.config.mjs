import { defineConfig, globalIgnores } from "eslint/config"
import nextTs from "eslint-config-next/typescript"
import nextVitals from "eslint-config-next/core-web-vitals"
import prettier from "eslint-config-prettier/flat"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "coverage/**"]),
])
