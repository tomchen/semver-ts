<p align="center">
  <a href="https://semver.tomchen.org/" target="_blank">
    <img width="120" src="https://raw.githubusercontent.com/tomchen/semver-ts/main/semver-ts.svg" />
  </a>
</p>

<h1 align="center">SemVer TS</h1>

<p align="center"><strong>SemVer</strong> (Semantic Versioning) JavaScript library's<br />
<strong>T</strong>ype<strong>S</strong>cript<br />
<strong>T</strong>ree-<strong>S</strong>hakable<br />
<strong>T</strong>iny <strong>S</strong>ize<br />
<strong>T</strong>urbo <strong>S</strong>peed<sup>[1]</sup><br />
Version</p>

A fork and drop-in replacement of npm's official [semver](https://www.npmjs.com/package/semver) library, it has all 26 functions of the original library (except `satisfies`)<sup>[2]</sup>, with the same implementation and the same API, passes all the original's tests<sup>[3]</sup>, but:

- It is more lightweight and perfectly treeshakable with ES modules<sup>[4]</sup>
  - It removed SemVer class and uses a purely functional approach<sup>[5]</sup>
- It is written in TypeScript, has correct types<sup>[6]</sup> and is well-commented and -documented<sup>[7]</sup>.

## Usage

Installation:

```
npm install semver-ts
```

In your ES module (recommanded instead of CommonJS) JavaScript/TypeScript code:

```js
import { compare } from "semver-ts"
compare("1.0.0", "1.0.3")
```

Or directly in HTML (not tree-shakable, obviously):

```html
<script src="https://unpkg.com/semver-ts/dist/index.global.js"></script>
<script>semver.compare("1.0.0", "1.0.3")</script>
```

Documentation: [https://semver.tomchen.org/](https://semver.tomchen.org/)

## Size comparison

ES module treeshaked and minified (with terser) bundle size comparison:

<table>
  <tr>
    <th>Code</th>
    <th>Minified</th>
    <th>Gzipped</th>
  </tr>
  <tr>
    <td><pre>import { compare } from "semver-ts"
compare("1.0.0", "1.0.3")</pre></td>
    <td>2.00 KB</td>
    <td>914 bytes</td>
  </tr>
  <tr>
    <td><pre>import compare from "semver/functions/compare"
compare("1.0.0", "1.0.3")</pre></td>
    <td>8.95 KB</td>
    <td>2.80 KB</td>
  </tr>
  <tr>
    <td><pre>import { compare } from "semver"
compare("1.0.0", "1.0.3")</pre></td>
    <td>25.9 KB</td>
    <td>7.55 KB</td>
  </tr>
</table>

## Notes

[1] Turbo Speed: OK, the current version faithfully uses the original implementation so it's not really that fast, but it should be slightly faster than the original due to the fact that it removes the class-based structure and uses a purely functional approach

[2] All 'semver/functions/*', except for 'semver/functions/satisfies' which is intended to be included in the future. List of functions: `clean`, `cmp`, `coerce`, `compare`, `compareBuild`, `compareCore`, `compareIdentifiers`, `compareLoose`, `diff`, `eq`, `gt`, `gte`, `inc`, `incThrow`, `lt`, `lte`, `major`, `minor`, `neq`, `parse`, `patch`, `prerelease`, `rcompare`, `rsort`, `sort`, `valid`

[3] Faithfully uses the same implementation code, same function signatures (even the same weird overload of `inc()`) (only replacing SemVer class by an object containing parsed semver information), and passed all the tests in the original library (semver v7.7.1 (2025-02-03))

[4] Not tree-shakable with CommonJS exports. The support for `const a = require("semver/a")` CommonJS treeshakability could be done but will increase the size of the ESM bundle. So, just use the modern ES modules

[5] Currently, class is not tree-shakable with any bundler, and with either ES modules or CommonJS exports. Therefore, despite the [effort](https://github.com/npm/node-semver/issues/291) to make the original semver tree-shakable, user's bundling output may still contain a lot of unused code, mainly from the SemVer class

[6] Some functions in @types/semver, such as `inc()`, do not seem to have correct types

[7] You can hover over a function to see very detailed information including examples in VS Code thanks to the comments. The documentation webpages are automatically generated from the comments with TypeDoc.
