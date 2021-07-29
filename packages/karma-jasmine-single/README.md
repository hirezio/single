# `@hirez_io/karma jasmine-single` ⚒

A karma plugin for loading [@hirez_io/jasmine-single](https://github.com/hirezio/single/tree/main/packages/jasmine-single)

[![npm version](https://img.shields.io/npm/v/@hirez_io/karma-jasmine-single.svg?style=flat-square)](https://www.npmjs.org/package/@hirez_io/karma-jasmine-single)
[![npm downloads](https://img.shields.io/npm/dm/@hirez_io/karma-jasmine-single.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@hirez_io/karma-jasmine-single&from=2017-07-26)
![Build and optionally publish](https://github.com/hirezio/single/workflows/Build%20and%20optionally%20publish/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](../../CODE_OF_CONDUCT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <a href="https://learn.hirez.io/?utm_source=github&utm_medium=link&utm_campaign=jasmine-single">
    <img src="../../for-readme/test-angular.jpg"
      alt="TestAngular.com - Free Angular Testing Workshop - The Roadmap to Angular Testing Mastery"
      width="600"
    />
  </a>
</div>

## Installation

```
yarn add -D @hirez_io/karma-jasmine-single
```

or

```
npm install -D @hirez_io/karma-jasmine-single
```

This plugin was inspired by [karma-jasmine-single](https://github.com/kirisu/karma-jasmine-single)) which loads the original "jasmine-single".

I rewrote it to save you the hassle of loading @hirez_io/jasmine-single's script files yourself. 😎

## Configuration

Here's how to modify your `karma.conf.js`:

```js
// karma.conf.js

module.exports = function(config) {
  config.set({

    plugins: [
      require('karma-jasmine'),
      require('@hirez_io/karma-jasmine-single'), // <-- ADD THIS
      require('karma-chrome-launcher')
      // other plugins you might have...
    ],

    frameworks: [
      '@hirez_io/jasmine-single', // <-- ADD THIS
      'jasmine',
      // other frameworks...
    ],

    // ...
```

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](../../CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

## Code Of Conduct

Be kind to each other and please read our [code of conduct](../../CODE_OF_CONDUCT.md).

## License

MIT
