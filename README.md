# hutime-entity-lookup

[![Codecov](https://img.shields.io/codecov/c/github/cwrc/hutime-entity-lookup.svg)](https://codecov.io/gh/cwrc/hutime-entity-lookup)
[![version](https://img.shields.io/npm/v/hutime-entity-lookup.svg)](http://npm.im/hutime-entity-lookup)
[![downloads](https://img.shields.io/npm/dm/hutime-entity-lookup.svg)](http://npm-stat.com/charts.html?package=hutime-entity-lookup&from=2015-08-01)
[![GPL-3.0](https://img.shields.io/npm/l/hutime-entity-lookup.svg)](http://opensource.org/licenses/GPL-3.0)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

1. [Overview](#overview)
1. [Installation](#installation)
1. [Use](#use)
1. [API](#api)
1. [Development](#development)

## Overview

Finds entities (people, places, organizations, titles) in hutime. Meant to be used with [cwrc-public-entity-dialogs](https://github.com/cwrc-public-entity-dialogs) where it runs in the browser.

Although it will not work in node.js as-is, it does use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for http requests, and so could likely therefore use a browser/node.js compatible fetch implementation like: [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch).

## Installation

`npm i hutime-entity-lookup`

## Use

`import hutimeLookup from 'hutime-entity-lookup';`

### API

### findRS(query)

where the 'query' argument is an object:

```js
{
    entity: "The name of the thing the user wants to find.",
    options: "TBD"
}
```

and all find\* methods return promises that resolve to an object like the following:

```json
{
  "id": "http://hutime.org/hutime/9447148209321300460003/",
  "name": "Fay Jones School of Architecture and Design",
  "nameType": "Corporate",
  "originalQueryString": "jones",
  "repository": "hutime",
  "uri": "http://hutime.org/9447148209321300460003/",
  "uriForDisplay": "https://hutime.org/9447148209321300460003/"
}
```

where the 'query' argument is the entity name to find and the methods return the hutime URL that in turn returns results for the query.

## Development

[CWRC-Writer-Dev-Docs](https://github.com/cwrc/CWRC-Writer-Dev-Docs) describes general development practices for CWRC-Writer GitHub repositories, including this one.

### Mocking

We use [fetch-mock](https://github.com/wheresrhys/fetch-mock) to mock http calls (which we make using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) rather than XMLHttpRequest).

### Continuous Integration

We use [Travis](https://travis-ci.org).

### Release

We follow [SemVer](http://semver.org), which [Semantic Release](https://github.com/semantic-release/semantic-release) makes easy. Semantic Release also writes our commit messages, sets the version number, publishes to NPM, and finally generates a changelog and a release (including a git tag) on GitHub.
