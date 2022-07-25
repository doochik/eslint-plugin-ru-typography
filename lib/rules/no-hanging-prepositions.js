"use strict";

const DEFAULT_PREPOSITIONS = require("../prepositions");

/**
 * Replaces last symbol in string with nbsp
 * @param {string} match String to replace
 * @returns {string} Result string
 */
function replaceLastSymbolWithNbsp(match) {
    return match.slice(0, -1) + String.fromCharCode(160);
}

/**
 * Create regexp from options
 * @param {Object} [options] rule options
 * @returns {RegExp} regexp
 */
function createPrepositionsRegexp(options = {}) {
    const prepositions = options.prepositions || DEFAULT_PREPOSITIONS;

    return new RegExp(prepositions.map(item => ` ${item} `).join("|"), "giu");
}

module.exports = {
    meta: {
        docs: {
            description: "Forbid hanging prepositions"
        },
        fixable: "code",
        schema: [{
            type: "object",
            properties: {
                prepositions: { type: "array" }
            }
        }]
    },
    create(context) {
        const prepositionsRe = createPrepositionsRegexp(context.options[0]);

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

            const prepositionMatch = nodeValue.match(prepositionsRe);

            if (prepositionMatch) {
                context.report({
                    message: "\"{{ preposition }}\" should be followed with \\u00A0(nbsp) symbol",
                    data: { preposition: prepositionMatch[0] },
                    node,
                    fix(fixer) {
                        const newDescription = nodeValue.replace(prepositionsRe, replaceLastSymbolWithNbsp);

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
