"use strict";

const rule = require("../../../lib/rules/no-hanging-hyphens"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    }
});

ruleTester.run("no-hanging-hyphens", rule, {
    valid: [
        {
            code: "var foo = 'елки\u00A0- палки'"
        },
        {
            code: "var foo = 'елки\u00A0– палки'"
        },
        {
            code: "var foo = 'елки - палки'",
            options: [{
                hyphens: ["_"]
            }]
        }
    ],

    invalid: [
        {
            code: "var foo = 'елки - палки'",
            output: "var foo = 'елки\u00A0- палки'",
            errors: [{ message: "\" - \" should be preceded with \\u00A0(nbsp) symbol" }]
        },
        {
            code: "var foo = 'елки – палки'",
            output: "var foo = 'елки\u00A0– палки'",
            errors: [{ message: "\" – \" should be preceded with \\u00A0(nbsp) symbol" }]
        },
        {
            code: `
            class Component extends React.PureComponent {
                render() {
                    return (<span>елки – палки</span>);       
                }
            }
            `,
            output: `
            class Component extends React.PureComponent {
                render() {
                    return (<span>елки\u00A0– палки</span>);       
                }
            }
            `,
            errors: [{ message: "\" – \" should be preceded with \\u00A0(nbsp) symbol" }]
        }
    ]
});
