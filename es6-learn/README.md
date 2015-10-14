# es6 node

## install
```bash
npm i -g babel
```

## execute
```bash
babel-node let-const.js
```

## trans
```bash
babel app.es6.js -o app.js
```

## support new es7
* make file '.babelrc'
```js
// http://babeljs.io/docs/usage/experimental/
{
  "optional": [
    "es7.classProperties"
  ]
}

// or
{
  "stage": 0
}
```