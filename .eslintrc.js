module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins:[
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this":"off", // Torna opcional o uso do this na class
    "no-param-reassign":"off",      // Permite a manipulação de um parâmetro
    "camelcase":"off",
    "no-unused-vars" :["error",{"argsIgnorePattern":"next"}], // Permite criar variáveis sem uso
  },
};
