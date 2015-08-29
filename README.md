## node examples

### archiver
for archiver files

zip file from files, dirs, globs


### request


### qs
querystring and json exchange, express used
```js
var qs = require('qs');
qs.parse('a=b&b=c');
qs.stringify({foo: "bar", hoge: "pomu"});
```
```html
<script src="qs.js"></script>
<script>
  Qs.parse('a=b&b=c');
  Qs.stringify({foo: "bar", hoge: "pomu"});
</script>
```

### node2web_querystring
use browserify from origin node module
```bash
bower install node2web-querystring
```

### express-generator
create express proj by template
* install the command-line tools
```bash
npm i -g express-generator
```
* then create test proj
```base
express --git myapp
cd myapp
npm install
npm start
```