"use strict";

const PREPOSITIONS = ["в", "во", "без", "до", "из", "к", "ко", "на", "по", "о", "от", "при", "с", "у", "не", "за", "над", "для", "об", "под", "про", "и", "а", "но", "да", "или", "ли", "бы", "то", "что", "как", "я", "он", "мы", "они", "ни", "же", "вы", "им"];
const PREPOSITIONS_RE = new RegExp(PREPOSITIONS.map(item => ` ${item} `).join("|"), "gi");

/**
 * Replaces last symbol in string with nbsp
 * @param {string} match String to replace
 * @returns {string} Result string
 */
function replaceLastSymbolWithNbsp(match) {
    return match.slice(0, -1) + String.fromCharCode(160);
}

module.exports = {
    meta: {
        fixable: "code"
    },
    create(context) {
        return {
            Literal(node) {
                const prepositionMatch = node.value.match(PREPOSITIONS_RE);

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

                            const newDescription = node.value.replace(PREPOSITIONS_RE, replaceLastSymbolWithNbsp);

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
