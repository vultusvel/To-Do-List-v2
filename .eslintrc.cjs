module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
    },
    "settings": {
      'import/resolver': {
        typescript: {},  
      },
    },
    "parser": "@typescript-eslint/parser",
    "extends": [
      "eslint:recommended",
      "airbnb",
      "airbnb/hooks",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jsx-a11y/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "extraFileExtensions" : [".css"],
      "project": './tsconfig.json',
      "ecmaVersion": 11,
      "sourceType": "module"
  },
  "settings": {
      "react": {
          "version": "detect"
      }
  },
  "plugins": [
      "react",
      "react-hooks",
      "@typescript-eslint"
  ],
  "rules": {
      "react/react-in-jsx-scope": "off",
      "import/no-extraneous-dependencies": "off",
      "react/jsx-filename-extension": [
          1,
          {
              "extensions": [
                  ".ts",
                  ".tsx"
              ]
          }
      ],
      "react/display-name": 1
  }
};
