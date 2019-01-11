# nino-cli

A custom-made cli for daily coding using react, includes

- `jest` for test
- `webpack-dev-server` for development
- `webpack` for production
- you won't need `babel-plugin-import` for `antd` or `antd-mobile` or a `.babelrc`

I just need a cli to integration all of them, and my wifi ~~wife~~ is Nino for now, so named this repo.

# who's Nino?

https://twitter.com/5Hanayome_anime/status/1074898723581251584

# usage

``` bash
npm install --save nino-cli
```

then add scripts in `package.json`, like below,

``` json
"scripts": {
  "start": "nino go",
  "test": "nino test",
  "build": "nino koei",
  "dev": "nino koei -w-d"
}
```

# command

- `go` => to start a server, for development
- `test` => for test, using `react` and `jest`
- `koei` => to release, for production in `/dist`
- `koei -w-d` => to release too, but for development, `-w` is watching and `-d` set environment to development