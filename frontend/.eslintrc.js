// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        "eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        "no-console": "warn",
        "react/prop-types": 0,
        "linebreak-style": ["error", "unix"]
    }
}
