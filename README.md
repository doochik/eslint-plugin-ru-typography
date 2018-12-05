[![npm version](https://badge.fury.io/js/eslint-plugin-ru-typography.svg)](https://badge.fury.io/js/eslint-plugin-ru-typography)
[![Build Status](https://travis-ci.org/doochik/eslint-plugin-ru-typography.svg?branch=master)](https://travis-ci.org/doochik/eslint-plugin-ru-typography)

# eslint-plugin-ru-typography

ESLint typography linter for russian language

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ru-typography`:

```
$ npm install eslint-plugin-ru-typography --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ru-typography` globally.

## Usage

Add `ru-typography` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ru-typography"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ru-typography/no-hanging-prepositions": "error"
    }
}
```

## Supported Rules

*  **autofix** `ru-typography/no-hanging-hyphens`: check for hanging hyphens. For example, "елки_nbsp_- палки".
Configuration:
```
{
    "rules": {
        "ru-typography/no-hanging-hyphens": ["error", {
            // check only this hyphens
            // default: ["-", "–"]
            hyphens: ["-"]
        }]
    }
}
```

*  **autofix** `ru-typography/no-hanging-prepositions`: check for hanging prepositions. For example, "елки и_nbsp_палки".
Configuration:
```
{
    "rules": {
        "ru-typography/no-hanging-prepositions": ["error", {
            // check only this prepositions
            // default: ["в", "во", "без", "до", "из", "к", "ко", "на", "по", "о", "от", "при", "с", "у", "не", "за", "над", "для", "об", "под", "про", "и", "а", "но", "да", "или", "ли", "бы", "то", "что", "как", "я", "он", "мы", "они", "ни", "же", "вы", "им"]
            prepositions: ["в", "и", "по"]
        }]
    }
}
```





