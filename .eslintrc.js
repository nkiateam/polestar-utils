module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "max-len": [1, 120, 2, {"ignoreComments": true}],
    "indent": [1, 4, { "SwitchCase": 1 }],
    "arrow-body-style": "off", // ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
    "arrow-parens": "off", // Incompatible with prettier
    // "no-useless-constructor": "off",
    "linebreak-style": 'off', // Don't play nicely with Windows.
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/forbid-prop-types": "off",
    "react/require-default-props": "off", // airbnb use error
    "react/default-props-match-prop-types": "off",
    "jsx-a11y/href-no-hash": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error"],
    "no-plusplus": "off"
  }
}
