# eslint-plugin-no-var-reassign

`let` and `const` weren’t really necessary additions to JavaScript; all you need
is a linter and `var`.

`var` is easier to declare.  Function scoping and even redeclaration can both be
useful:

```js
if (…) {
  var foo = 1
} else {
  var foo = 2
}
doSomething(foo)
```

Can’t do that with `let` or `const`, since they’re block-scoped.

`let` and `const` will throw runtime errors when you try to use their variables
before they’ve been declared.  However, you could instead rely on ESLint’s
`no-use-before-define` rule to catch such mistakes with `var`.

One could pretend that a `var` was a constant, and he could theoretically use a
linter to enforce that.  Considering the qualities of `var`, if a linter were to
enforce using variables after they were defined *and* if it were to enforce
their constancy, then `var` could be superior to `let` or `const`.

This ESLint plugin provides a rule achieving that: `no-var-reassign`

## Installation

Install ESLint globally or locally:

```
yarn global add eslint
yarn add -D eslint
```

Install this plugin globally or locally:

```
yarn global add eslint-plugin-no-var-reassign
yarn add -D eslint-plugin-no-var-reassign
```

## Configuration

Add “no-var-reassign” to your plugins section, and enable the rule by adding
“no-var-reassign/no-var-reassign” to your rules section.  Normally this is
configured in the `.eslintrc` config file, like so:

```json
{
  "plugins": [
    "no-var-reassign"
  ],
  "rules": {
    "no-var-reassign/no-var-reassign": "warn"
  }
}
```

## Usage

Now, whenever you try to assign to an already-declared variable, you’ll be
warned as if that variable was a constant.  Here, ESLint will report an error on
line 2:

```js
var foo = 1
foo = 2
```

Since tail calls eliminate the need for assignment in loops, assignment is never
truly necessary in the language.  This code (which needed assignment):

```js
for (var i = 0; i < 10; i++) {}
```

Becomes:

```js
(function loop (i = 0) {
  if (i + 1 < 10) loop(i + 1)
}())
```

However, if you’re writing code for an environment without tail calls, or if you
simply wish to use assignment on some occassions, you can selectively disable
the rule.  ESLint won’t report an error in the following example:

```js
var foo = 1
if (…) foo = 2 // eslint-disable-line no-var-reassign/no-var-reassign
```

## License

MIT; see the “LICENSE” file.
