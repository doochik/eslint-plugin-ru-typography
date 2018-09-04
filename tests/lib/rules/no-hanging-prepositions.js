"use strict";

const rule = require("../../../lib/rules/no-hanging-prepositions"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("no-hanging-prepositions", rule, {
    valid: [
        {
            code: "var foo = 'елки палки'"
        },
        {
            code: "var foo = 'елки и палки'"
        },
        {
            code: "var foo = 'елки и палки без леса'"
        },
        {
            code: "var int = 100;"
        }
    ],

    invalid: [
        {
            code: "var foo = 'елки и палки'",
            output: "var foo = 'елки и палки'",
            errors: [{ message: "\" и \" should be followed with \\x00A0(nbsp) symbol" }]
        },
        {
            code: "var foo = 'елки и палки без леса'",
            output: "var foo = 'елки и палки без леса'",
            errors: [{ message: "\" и \" should be followed with \\x00A0(nbsp) symbol" }]
        }
    ]
});
