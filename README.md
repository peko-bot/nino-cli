# nino-cli

![badge](https://action-badges.now.sh/orzyyyy/nino-cli)
[![codecov](https://codecov.io/gh/orzyyyy/nino-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/orzyyyy/nino-cli)

A custom-made cli for daily coding using react.

## ✨ Features

- `jest` for test.
- `webpack-dev-server` for development.
- `webpack` for production.
- `babel` at 7 for compile.
- you don't need `babel-plugin-import` for `antd` or `antd-mobile` or a `.babelrc`.
- you also don't need add complex options of `jest` or `enzyme`.

I just need a cli to integration all of them, and my [wifi ~~wife~~](https://twitter.com/5Hanayome_anime/status/1074898723581251584) is Nino for now, so named this repo.

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
