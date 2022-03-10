# `@hirez_io/jasmine-single` 📃👌

A jasmine addon that helps you write 'Single-Action Tests' by breaking them into a **"given / when / then"** structure.

[![npm version](https://img.shields.io/npm/v/@hirez_io/jasmine-single.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/jasmine-single)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/jasmine-single.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/jasmine-single&from=2017-07-26)
[![codecov](https://img.shields.io/codecov/c/github/hirezio/single.svg)](https://codecov.io/gh/hirezio/single)
![Build and optionally publish](https://github.com/hirezio/single/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](../../CODE_OF_CONDUCT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-green.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<div align="center">
  <a href="https://learn.hirez.io/?utm_source=github&utm_medium=link&utm_campaign=jasmine-single">
    <img src="../../for-readme/test-angular.jpg"
      alt="TestAngular.com - Free Angular Testing Workshop - The Roadmap to Angular Testing Mastery"
      width="600"
    />
  </a>
</div>

<style>
  summary { user-select: none; }
  summary:hover { cursor: pointer; }
</style>

<br/>

# Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

  - [Installation](#installation)

  - [Using TypeScript?](#using-typescript)

  - [Configuring Nx](#configuring-nx)

  - [Using karma?](#using-karma)

  - [What are "single-action" tests?](#what-are-single-action-tests)

  - [Why writing single-action tests is good?](#why-writing-single-action-tests-is-good)

  - [How to write single-action tests?](#how-to-write-single-action-tests)

  - [What's wrong with using `it()` for single-action tests?](#whats-wrong-with-using-it-for-single-action-tests)

  - [Usage](#usage)

    - [▶ The basic testing structure](#%E2%96%B6-the-basic-testing-structure)

    - [▶ Meaningful error messages](#%E2%96%B6-meaningful-error-messages)

    - [▶ `async` / `await` support](#%E2%96%B6-async--await-support)

    - [▶ `done()` function support](#%E2%96%B6-done-function-support)
  - [Contributing](#contributing)
  - [Code Of Conduct](#code-of-conduct)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



<br/>

## Installation

```
yarn add -D @hirez_io/jasmine-single
```

or

```
npm install -D @hirez_io/jasmine-single
```

## Using TypeScript?

<details>
<summary>⚠ <strong>CLICK HERE TO EXPAND</strong></summary>

<br/>

In order to find the `@hirez_io/jest-single` global types:

Add `@hirez_io/jasmine-single` to the `types` property under `compilerOptions` in your `tsconfig.json` (or `tsconfig.spec.json`) like this:

```js
// tsconfig.json or tsconfig.spec.json

{
  ...
  "compilerOptions": {
    "types": [
      "jasmine",
      "@hirez_io/jasmine-single", // 👈 ADD THIS

      // ...any other types you might have...
    ],
    ...
  }
  ...
}
```

⚠ **ATTENTION:** If you have `typeRoots` configured like this:

```ts
"compilerOptions": {
  "typeRoots": [
    "node_modules/@types"
  ],
}
```

You should add `"node_modules"` like this:

```ts
"compilerOptions": {
  "typeRoots": [
    "node_modules/@types",
    "node_modules/@hirez_io" // 👈 ADD THIS
  ],
}
```

### ⚠ **VS CODE USERS:**

Adding the above configuration (`types` and/or `typeRoots`) to your `tsconfig.json` (or `tsconfig.spec.json`) is necessary when using VS Code, otherwise the IDE will not recognize the global types.

</details>

<br/>

## Configuring Nx

<details>
<summary>⚠ <strong>CLICK HERE TO EXPAND</strong></summary>

<br/>

When configuring `@hirez_io/jasmine-single` for Nx follow the TypeScript setup provided, and when setting the `types` property under `compileOptions` in `tsconfig.spec.json` apply the same updates to `tsconfig.editor.json` if it exists:

```js
// For tsconfig.spec.json AND tsconfig.editor.json:
{
  "compilerOptions": {
    "types": [
      "jest",
      "@hirez_io/jest-single", // 👈 ADD THIS
    ],
  }
}
```
</details>

<br/>

## Using karma?

<details>
<summary>⚠ <strong>CLICK HERE TO EXPAND</strong></summary>

<br/>

`@hirez_io/jasmine-single` has a dependency on `@hirez_io/karma-jasmine-single` which is a karma plugin (inspired by [karma-jasmine-given](https://github.com/kirisu/karma-jasmine-given)) I rewrote to save you the hassle of loading the library script yourself.

So it will automatically installs `@hirez_io/karma-jasmine-single` for you 😎

Here's how to modify your `karma.conf.js`:

```js
// karma.conf.js

module.exports = function(config) {
  config.set({

    plugins: [
      require('karma-jasmine'),
      require('@hirez_io/karma-jasmine-single'), // 👈 ADD THIS
      require('karma-chrome-launcher')
      // other plugins you might have...
    ],

    frameworks: [
      '@hirez_io/jasmine-single', // 👈 ADD THIS
      'jasmine',
      // other frameworks...
    ],

    // ...
```


</details>

<br/>


## What are "single-action" tests?

A single-action test is a test with only one action. (CAPTAIN OBVIOUS! 🦸‍♂️😅)

Normally, you setup the environment, you call an action and then you check the output.

#### What's an action?

Well... it can be a method call, a button click or anything else our test is checking.

The big idea here is that it should be only **ONE ACTION PER TEST**.

<br/>

## Why writing single-action tests is good?

Single action tests are more "Test Effective" compared to multi-action tests.

The benefits of single-action tests:

✅ &nbsp; Your tests will **break less often** (making them more effective)

✅ &nbsp; Whenever something breaks, you have **only one "action" code to debug**

✅ &nbsp; They promote **better coverage** (easier to see which cases are still missing)

✅ &nbsp; They give you **better structure** (every part of your test has a clear goal)


<br/>

## How to write single-action tests?

This library follows the natural "`given`, `when` and `then`" structure (some of you know it as "Arrange, Act, Assert").

This means every test has only 3 parts to it, no more.

```ts
describe('addTwo', () => {

  // This is where you setup your environment / inputs
  given('first number is 1', () => {
    const firstNum = 1;

    // This is where you call the action under test
    when('adding 2 to the first number', () => {
      const actualResult = addTwo(firstNum);

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
THEN result should be 3
```

<br/>

## What's wrong with using `it()` for single-action tests?

Did you know that the most common way of writing JavaScript tests dates back to 2005? 😅

Jasmine, which was created in 2009 was inspired by Ruby's testing framework - RSpec which was created in 2005.


Originally, RSpec introduced the syntax of "`describe` > `context` > `it`", where `context` was meant to be used as the "setup" part of the test.

Unfortunately, the `context` wasn't ported to Jasmine so we got used to writing our tests in the "`describe` > `it`" structure... which is more limited.

<br/>

_Here are a couple of limitations with the common `it()` structure:_

### ❌&nbsp; 1. It promotes partial or awkward descriptions of tests

The word "it" kinda forces you to begin the description with "should" which leads to focusing specifically on just the "outcome" part of the test (the `then`).

But if you want to add more context (like what should be the input that causes that outcome) things start to get messy.

Because there isn't a clear convention, people tend to invent their own on the fly which creates inconsistency.


**Example:**
```ts
it('should do X only when environment is Y and also called by Z But only if...you get the point', ()=> ...)
```

<br/>

### ❌&nbsp; 2. Nothing prevents you from writing multi-action tests

 This mixes up testing structures and making them harder to understand

**Example:**
```ts
it('should transform the products', ()=> {

  // SETUP
  const fakeProducts = [...];

  // ACTION
  const result = classUnderTest.transformProducts(fakeProducts);

  // OUTCOME
  const transformedProducts = [...];
  expect(result).toEqual(transformedProducts);

  // ACTION
  const result2 = classUnderTest.transformProducts();

  // OUTCOME
  expect(result2).toEqual( [] );


  // this 👆 is a multi-action test.

})
```
<br/>

### ❌&nbsp; 3. Detailed descriptions can get out of date more easily

The farther the description is from the actual implementation the less likely you'll remember to update it when the test code changes

**Example:**
```ts
test('GIVEN valid products and metadata returned successfully WHEN destroying the products THEN they should get decorated', ()=> {

  const fakeProducts = [...];
  const fakeMetadata = [...];
  mySpy.getMetadata.and.returnValue(fakeMetadata);

  const result = classUnderTest.transformProducts(fakeProducts);

  const decoratedProducts = [...];
  expect(result).toEqual(decoratedProducts);

})
```
<br/>

#### Did you spot the typo? 👆😅


(it should be _"transforming"_ instead of _"destroying"_)

<br/>

Compare that to:

```ts

  given('valid products and metadata returned successfully', () => {
    const fakeProducts = [...];
    const fakeMetadata = [...];
    mySpy.getMetadata.and.returnValue(fakeMetadata);

    //        👇 --> easier to spot as it's closer to the implementation
    when('destroying the products', () => {
      const result = classUnderTest.transformProducts(fakeProducts);

      then('they should get decorated', () => {
        const decoratedProducts = [...];
        expect(result).toEqual(decoratedProducts);
      });
    });
  });


```

<br/>



## Usage

### ▶ The basic testing structure

The basic structure is a nesting of these 3 functions:

```ts
given(description, () => {
  when(description, () => {
    then(description, () => {

    })
  })
})


```

**EXAMPLE:**
```ts
describe('addTwo', () => {

  // This is where you setup your environment / inputs
  given('first number is 1', () => {
    const firstNum = 1;

    // This is where you call the action under test
    when('adding 2 to the first number', () => {
      const actualResult = addTwo(firstNum);

      // This is where you check the outcome
      then('result should be 3', () => {
        expect(actualResult).toEqual(3);
      });
    });
  });

});

```

Under the hood it creates a regular `it()` test with a combination of all the descriptions:

```
CONSOLE OUTPUT:
~~~~~~~~~~~~~~

GIVEN first number is 1
WHEN adding 2 to the first number
THEN result should be 3
```

<br/>

### ▶ Meaningful error messages

This library will throw an error if you deviate from the `given > when > then` structure.

So you won't be tempted to accidentally turn your single-action test into a multi-action one.

```ts
describe('addTwo', () => {

    // 👉 ATTENTION: You cannot start with a "when()" or a "then()"
    //                the test MUST start with a "given()"


  given('first number is 1', () => {
    const firstNum = 1;

    // 👉 ATTENTION: You cannot add here a "then()" function directly
    //                or another "given()" function

    when('adding 2 to the first number', () => {
      const actualResult = addTwo(firstNum);

      // 👉 ATTENTION: You cannot add here a "given()" function
      //                or another "when()" function

      then('result should be 3', () => {
        expect(actualResult).toEqual(3);


        // 👉 ATTENTION: You cannot add here a "given()" function
        //                or a "when()" function or another "then()"
      });
    });
  });

});

```


### ▶ `async` / `await` support

**Example:**

```ts
describe('addTwo', () => {

  given('first number is 1', () => {
    const firstNum = 1;
    //                                    👇
    when('adding 2 to the first number', async () => {
      const actualResult = await addTwo(firstNum);

      then('result should be 3', () => {
        expect(actualResult).toEqual(3);
      });
    });
  });

});


```

### ▶ `done()` function support

The `given` function supports the (old) async callback way of using a `done()` function to signal when the test is completed.

```ts
describe('addTwo', () => {
  //                           👇
  given('first number is 1', (done) => {
    const firstNum = 1;

    when('adding 2 to the first number', () => {
      const actualResult = addTwo(firstNum, function callback() {

      then('result should be 3', () => {
          expect(actualResult).toEqual(3);
          done();
        });

      });
    });

  });

});


```

ℹ It also supports `done(error)` or `done.fail(error)` for throwing async errors.

<br/>

## Contributing

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](../../CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

<br/>

## Code Of Conduct

Be kind to each other and please read our [code of conduct](../../CODE_OF_CONDUCT.md).


<br/>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.hirez.io/become-a-testing-master?utm_medium=Open_Source&utm_source=Github&utm_campaign=Lead_Generation&utm_content=jasmine-single--all-contributors-profile-link"><img src="https://avatars1.githubusercontent.com/u/1430726?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shai Reznik</b></sub></a><br /><a href="https://github.com/hirezio/single/commits?author=shairez" title="Code">💻</a> <a href="https://github.com/hirezio/single/commits?author=shairez" title="Documentation">📖</a> <a href="#ideas-shairez" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-shairez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-shairez" title="Maintenance">🚧</a> <a href="#mentoring-shairez" title="Mentoring">🧑‍🏫</a> <a href="https://github.com/hirezio/single/pulls?q=is%3Apr+reviewed-by%3Ashairez" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/hirezio/single/commits?author=shairez" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.webtrix.be"><img src="https://avatars.githubusercontent.com/u/4103756?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maarten Tibau</b></sub></a><br /><a href="https://github.com/hirezio/single/commits?author=maartentibau" title="Documentation">📖</a> <a href="#infra-maartentibau" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://stackoverflow.com/users/1348195/benjamin-gruenbaum"><img src="https://avatars.githubusercontent.com/u/1315533?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benjamin Gruenbaum</b></sub></a><br /><a href="https://github.com/hirezio/single/commits?author=benjamingr" title="Code">💻</a> <a href="#ideas-benjamingr" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-benjamingr" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<br/>

## License

MIT
