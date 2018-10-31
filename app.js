var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const urlModule=require("url");

//引入session
const session=require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionRouter=require('./routes/positions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//使用express-session中间件，使得Express应用支持session处理
app.use(session({
  secret: 'fwefwefwefewf',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:30*60*1000 }
}));

//简单权限认证
app.use(function(req,res,next){
	const {url}=req;
	const URL=urlModule.parse(url);
	//获取访问路径名称
	const pathname=URL.pathname;
	//判断是否有访问和 "position"相关的资源
	if(pathname.indexOf("position")!==-1){
		//判断用户是否登录，如果没有登录，则跳转到首页
		const user=req.session.loginUser;
		if(!user){
			res.redirect("/");
			return;
		}
	}
	next();
});



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//访问"/"目录下的资源
app.use('/api/users', usersRouter);//访问"/users"目录下的资源
app.use('/api/positions',positionsRouter);//访问"/api/positions"目录下的资源

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
