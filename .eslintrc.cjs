module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb', 'plugin:react/recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
    settings: {
        'import/resolver': {
            alias: [['@', './src']],
        },
    },

    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'eslint-disable no-return-assign': 'off',
        'eslint-disable react/button-has-type': 'off',
        'linebreak-style': 'off',
        'no-alert': 'off',
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/heading-has-content': 'off',
        'no-return-assign': 'off',
        'react/button-has-type': 'off',
        'no-plusplus': 'off',
        'default-param-last': 'off',
        'no-nested-ternary': 'off',
    },
};
