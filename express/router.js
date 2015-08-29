var express = require('express');
var router = express.Router();
// 帮助创建模块化的路由处理器
// 一个Router的实例就是一个完整的中间件和路由系统，它经常被称为迷你应用

var cors = require('cors');
router.use(cors());

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
  }));

router.get('/', function(req, res) {
  console.log(req.query); // obj
  console.log(JSON.parse(req.query.inObj));
  req.query.ret = 0;
  res.json(req.query);
});

router.post('/', function(req, res) {
  console.log(req.body); // obj
  req.body.ret = 0;
  res.json(req.body);
});

module.exports = router;