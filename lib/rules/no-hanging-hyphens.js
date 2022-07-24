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

        return {
            Literal(node) {
                const nodeValue = node.value;

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
                            const rangeIgnoringQuotes = [
                                node.range[0] + 1,
                                node.range[1] - 1
                            ];

                            const newDescription = node.value.replace(regexp, replaceFirstSymbolWithNbsp);

                            return [
                                fixer.replaceTextRange(rangeIgnoringQuotes, newDescription)
                            ];
                        }
                    });
                }
            }
        };
    }
};
