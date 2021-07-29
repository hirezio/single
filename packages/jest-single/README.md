# `@hirez_io/jest-single` 📃👌

A Jest addon that helps you write 'Single-Action Tests' by breaking them into a **"given / when / then"** structure.

[![npm version](https://img.shields.io/npm/v/@hirez_io/jest-single.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/jest-single)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/jest-single.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/jest-single&from=2017-07-26)
[![codecov](https://img.shields.io/codecov/c/github/hirezio/single.svg)](https://codecov.io/gh/hirezio/single)
![Build and optionally publish](https://github.com/hirezio/single/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](../../CODE_OF_CONDUCT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Installation

```
yarn add -D @hirez_io/jest-single
```

or

```
npm install -D @hirez_io/jest-single
```

## Configuring Jest

Add the following line to your jest config:

```json
"setupFilesAfterEnv": ["node_modules/@hirez_io/jest-single/dist/jest-single.js"]
```

⚠ **ATTENTION:** If you have configured `rootDir` -

Make sure you have the right path to `node_modules`.

For example:

```json
"rootDir": "src",
"setupFilesAfterEnv": ["../node_modules/@hirez_io/jest-single/dist/jest-single.js"]
```

.

## Using TypeScript?

You should add `@hirez_io/jest-single` to your `types` property in your `tsconfig.json` (or `tsconfig.spec.json`) like this:

```js
// tsconfig.json or tsconfig.spec.json

{
  ...
  "types": [
      "jest",
      "@hirez_io/jest-single", // 👈 ADD THIS

      // ...any other types you might have...
    ],
  ...
}
```

⚠ **ATTENTION:** If you have `typeRoots` configured like this -

```ts
"typeRoots": [
  "node_modules/@types"
],
```

You should add `"node_modules"` like this -

```ts
"typeRoots": [
  "node_modules/@types",
  "node_modules/@hirez_io" // <-- ADD THIS
],
```

or else it won't find `@hirez_io/jest-single` global types.

⚠ **VS CODE USERS:** add the above configuration (`types` and/or `typeRoots`) to your `tsconfig.json` specifically or else it would not recognize the global types.

.


## Why choose this over plain `beforeEach` and `it()` functions?

### ✅ **Allows for a much cleaner test structure:**

Helps you break down tests into the natural "Arrange, Act, Assert" model via a nested "`given`, `when` and `then`" structure and by that enforces a "single-action" test.

```ts
describe('MyComponent', () => {
  let firstNum;
  let actualResult;

  // This is where you setup your environment / inputs
  given('first number is 1', () => {
    firstNum = 1;

    // This is where you call the action under test
    when('adding 2 to the first number', () => {
      actualResult = addTwo(firstNum);

      // This is where you check the outcome
      then('result should be 3', () => {
        expect(actualResult).toEqual(3);
      });
    });
  });

});
```

It also prints a nicer test description when there's an error:

```
CONSOLE OUTPUT:
~~~~~~~~~~~~~~

GIVEN first number is 1
WHEN adding 2 to the first number
THEM result should be 3
```

### ✅  It supports `async` / `await` -

```ts
describe('MyComponent', () => {
  let firstNum;
  let actualResult;

  given('first number is 1', () => {
    firstNum = 1;

    when('adding 2 to the first number', async () => {
      actualResult = await addTwo(firstNum);

      then('result should be 3', () => {
        expect(actualResult).toEqual(3);
      });
    });
  });

});


```

### ✅ **Promotes better test descriptions:**

The message inside `it("should do something", ...)` focuses specifically on the "outcome" of the test (`then`).

It's kinda funky to start describing the input and the action as well.

Moving the description closer to the actual parts helps you better understand the meaning, plus helps you spot mismatches in the descriptions sooner.



## Contributing

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](../../CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

## Code Of Conduct

Be kind to each other and please read our [code of conduct](../../CODE_OF_CONDUCT.md).

## License

MIT

## Want to learn more?

<div align="center">
  <a href="https://learn.hirez.io/?utm_source=github&utm_medium=link&utm_campaign=jest-single">
    <img src="../../for-readme/test-angular.jpg"
      alt="TestAngular.com - Free Angular Testing Workshop - The Roadmap to Angular Testing Mastery"
      width="600"
    />
  </a>
</div>
