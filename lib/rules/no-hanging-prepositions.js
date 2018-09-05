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

    return new RegExp(prepositions.map(item => ` ${item} `).join("|"), "gi");
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

        return {
            Literal(node) {
                const nodeValue = node.value;

                if (typeof nodeValue !== "string") {

                    // accept only strings
                    return;
                }

                const prepositionMatch = nodeValue.match(prepositionsRe);

                if (prepositionMatch) {
                    context.report({
                        message: "\"{{ preposition }}\" should be followed with \\x00A0(nbsp) symbol",
                        data: { preposition: prepositionMatch[0] },
                        node,
                        fix(fixer) {
                            const rangeIgnoringQuotes = [
                                node.start + 1,
                                node.end - 1
                            ];

                            const newDescription = node.value.replace(prepositionsRe, replaceLastSymbolWithNbsp);

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
