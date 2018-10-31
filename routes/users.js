var express = require('express');
var router = express.Router();

//用户业务逻辑处理对象
const UserService=require("../services/user/user_service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
router.post("/login",UserService.login);

//注册
router.post("/register",UserService.register);

//注销
router.get("/loginout",UserService.loginout)

module.exports = router;
