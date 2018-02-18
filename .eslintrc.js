// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // extends: 'standard',
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "indent": ["error", 4],
        "eol-last": 0,
        "space-before-function-paren": ["error", "never"],
        "no-multiple-empty-lines": 0,
        "padded-blocks": 0,
        "no-multi-str": 0,
        "space-before-function-paren": 0,
        "linebreak-style": 0,
        "prefer-destructuring": 0,
        "comma-dangle": 0,
        "semi": 0,
        "no-param-reassign": 0,
        "no-console ": 0,
        "no-mixed-operators": 0,
        "import/first": 0,
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "import/newline-after-import": 0
    }
}
