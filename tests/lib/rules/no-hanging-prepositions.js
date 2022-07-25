"use strict";

const rule = require("../../../lib/rules/no-hanging-prepositions"),
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

ruleTester.run("no-hanging-prepositions", rule, {
    valid: [
        {
            code: "var foo = 'елки палки'"
        },
        {
            code: "var foo = 'елки и палки'"
        },
        {
            code: "var foo = `елки и палки`"
        },
        {
            code: "var foo = 'елки и палки без леса'"
        },
        {
            code: "var int = 100;"
        },
        {
            code: "var foo = 'елки и палки'",
            options: [{
                prepositions: ["в", "по"]
            }]
        }
    ],

    invalid: [
        {
            code: "var foo = 'елки и палки'",
            output: "var foo = 'елки и палки'",
            errors: [{ message: "\" и \" should be followed with \\u00A0(nbsp) symbol" }]
        },
        {
            code: "var foo = `елки и палки`",
            output: "var foo = `елки и палки`",
            errors: [{ message: "\" и \" should be followed with \\u00A0(nbsp) symbol" }]
        },
        {
            code: "var foo = 'елки и палки без леса'",
            output: "var foo = 'елки и палки без леса'",
            errors: [{ message: "\" и \" should be followed with \\u00A0(nbsp) symbol" }]
        },
        {
            code: `
            class Component extends React.PureComponent {
                render() {
                    return (<span>елки и палки</span>);       
                }
            }
            `,
            output: `
            class Component extends React.PureComponent {
                render() {
                    return (<span>елки и палки</span>);       
                }
            }
            `,
            errors: [{ message: "\" и \" should be followed with \\u00A0(nbsp) symbol" }]
        },
        {
            code: `
            class Component extends React.PureComponent {
                render() {
                    return (
                        <p>
                            <span>елки и палки</span>    
                        </p>
                    );       
                }
            }
            `,
            output: `
            class Component extends React.PureComponent {
                render() {
                    return (
                        <p>
                            <span>елки и палки</span>    
                        </p>
                    );       
                }
            }
            `,
            errors: [{ message: "\" и \" should be followed with \\u00A0(nbsp) symbol" }]
        }
    ]
});
