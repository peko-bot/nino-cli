# nino-cli

[![codecov](https://codecov.io/gh/orzyyyy/nino-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/orzyyyy/nino-cli)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Forzyyyy%2Fnino-cli.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Forzyyyy%2Fnino-cli?ref=badge_shield)

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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Forzyyyy%2Fnino-cli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Forzyyyy%2Fnino-cli?ref=badge_large)