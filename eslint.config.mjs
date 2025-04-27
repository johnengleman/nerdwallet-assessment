// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const rules = [
  {
    ignores: ["node_modules/**", "src/app/generated/prisma/**"],
  },

  // your normal Next.js + TS rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default rules;
