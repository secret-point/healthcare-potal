module.exports = {
	root: true,
	extends: [
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:prettier/recommended",
		"airbnb-typescript",
		"airbnb/hooks",
		"plugin:jest/recommended"
	],
	env: {
		browser: true,
		es6: true,
		jest: true
	},
	plugins: ["react", "react-hooks", "@typescript-eslint", "jest"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.json"
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/destructuring-assignment": "off",
		"react/require-default-props": "off",
		"react/jsx-props-no-spreading": "off",
		"consistent-return": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-param-reassign": "off",
		"no-await-in-loop": "off",
		"no-restricted-syntax": "off",
		// disable this in root repo
		"react/prop-types": "off",
		"import/no-extraneous-dependencies": "off",
		"no-restricted-globals": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"import/no-cycle": "off",
		"@typescript-eslint/lines-between-class-members": "off",
		"react/no-array-index-key": "off",
		"jsx-a11y/alt-text": "off",
		"jsx-a11y/click-events-have-key-events": "off",
		"jsx-a11y/no-noninteractive-element-interactions": "off",
		"react/no-danger": "off",
		"jest/valid-expect": "off",
		"jest/no-conditional-expect": "off",
		// disable this in root repo
		"jest/expect-expect": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"no-prototype-builtins": "off",
		"import/no-mutable-exports": "off",
		"@typescript-eslint/return-await": "off",
		// disable this in root repo
		"no-debugger": "warn",
		// disable this in root repo
		"@typescript-eslint/no-empty-interface": "off",
		"linebreak-style": "off",
		"@typescript-eslint/camelcase": "off",
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": ["error"],
		"import/prefer-default-export": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"import/first": "off",
		"import/order": "off",
		"import/no-unresolved": "off",
		"prefer-destructuring": "off",
		"@typescript-eslint/no-shadow": "off",
		"@typescript-eslint/ban-types": "off",
		"no-empty-pattern": "off",
		"@typescript-eslint/naming-convention": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"no-nested-ternary": "off",
		"no-console": "warn",
		"no-debugger": "warn",
		radix: "off",
		"no-implicit-coercion": [
			2,
			{
				boolean: true,
				number: true,
				string: true,
				allow: []
			}
		],
		"prettier/prettier": [
			"error",
			{
				trailingComma: "es5"
			}
		]
	}
};
