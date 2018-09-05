# eslint-plugin-ru-typography

ESLunt typography linter for russian language

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

* `ru-typography/no-hanging-prepositions` **autofix**: check for hanging prepositions. For example, "елки и_nbsp_палки"





