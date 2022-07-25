"use strict";

const SYMBOLS = require("../hyphens");

/**
 * Replaces last symbol in string with nbsp
 * @param {string} match String to replace
 * @returns {string} Result string
 */
function replaceFirstSymbolWithNbsp(match) {
    return String.fromCharCode(160) + match.slice(1);
}

/**
 * Create regexp from options
 * @param {Object} [options] rule options
 * @returns {RegExp} regexp
 */
function createRegexp(options = {}) {
    const prepositions = options.hyphens || SYMBOLS;

    return new RegExp(prepositions.map(item => ` ${item} `).join("|"), "giu");
}

module.exports = {
    meta: {
        docs: {
            description: "Forbid hanging hyphens"
        },
        fixable: "code",
        schema: [{
            type: "object",
            properties: {
                hyphens: { type: "array" }
            }
        }]
    },
    create(context) {
        const regexp = createRegexp(context.options[0]);

        /**
         * Check string node value
         * @param {ASTNode} node A node to check
         * @returns {void}
         */
        function check(node) {
            const nodeValue = node.type === "TemplateElement" ? node.value.raw : node.value;

            if (typeof nodeValue !== "string") {

                // accept only strings
                return;
            }

            const prepositionMatch = nodeValue.match(regexp);

            if (prepositionMatch) {
                context.report({
                    message: "\"{{ hyphen }}\" should be preceded with \\u00A0(nbsp) symbol",
                    data: { hyphen: prepositionMatch[0] },
                    node,
                    fix(fixer) {
                        const newDescription = nodeValue.replace(regexp, replaceFirstSymbolWithNbsp);

                        if (node.type === "JSXText") {
                            return [
                                fixer.replaceTextRange([
                                    node.range[0],
                                    node.range[1]
                                ], newDescription)
                            ];
                        }
                        return [
                            fixer.replaceTextRange([
                                node.range[0] + 1,
                                node.range[1] - 1
                            ], newDescription)
                        ];
                    }
                });
            }
        }

        return {
            JSXText: check,
            Literal: check,
            TemplateElement: check
        };
    }
};
