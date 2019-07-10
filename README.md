# nino-cli

[![CircleCI](https://img.shields.io/circleci/project/github/orzyyyy/nino-cli/master.svg)](https://circleci.com/gh/orzyyyy/nino-cli)
[![codecov](https://codecov.io/gh/orzyyyy/nino-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/orzyyyy/nino-cli)

A custom-made cli for daily coding using react.

## ✨ Features

- `jest` for test.
- `webpack-dev-server` for development.
- `webpack` for production.
- `babel` at 7.
- you won't need `babel-plugin-import` for `antd` or `antd-mobile` or a `.babelrc`.
- you also won't need add complex options of `jest` or `enzyme`, [just take one line in your test file](#How-to-config-test).

I just need a cli to integration all of them, and my [wifi ~~wife~~](#Who's-Nino) is Nino for now, so named this repo.

## ⌨️ Usage

```bash
npm install --save nino-cli
```

then add scripts in `package.json`, as below,

```json
"scripts": {
  "start": "nino go",
  "test": "nino test",
  "build": "nino koei",
  "dev": "nino koei -w -d"
  ...
}
```

## How-to-config-test

```diff
import React from 'react';
import { shallow, mount } from 'enzyme';
+ import 'nino-cli/scripts/setup';
```

check [this](https://github.com/airbnb/enzyme/issues/1437#issuecomment-352148740), because the instance of `enzyme` is not the same, so you must config it yourself

# Who's-Nino

https://twitter.com/5Hanayome_anime/status/1074898723581251584
