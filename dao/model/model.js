//const Sequelize = require('sequelize');
//
//const sequelize = new Sequelize('postgres://localhost/h51806');
//
////用户信息
//const User = sequelize.define('user', {
//username: Sequelize.STRING,
//password:	Sequelize.STRING,
//email:Sequelize.STRING,
//regTime: Sequelize.DATE
//});
//
//
//User.sync({force: true}).then(() => {
//// Table created
//return User.create({
//  username: '',
//  password: '',
//  email:'',
//  regTime:''
//});
//});
//
////职位信息
//const Position = sequelize.define('position', {
//name: Sequelize.STRING,
//salary:Sequelize.DATE
//});
//
//Position.sync({force: true}).then(() => {
//// Table created
//return Position.create({
//	
//});
//});
//
//module.exports={User,Position}


// 引入 "mongoose" 依赖
const mongoose = require('mongoose');
// 连接数据库：h51806
mongoose.connect('mongodb://localhost/h51806');

// Schema-数据结构：用户
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	regTime: Date
});

// Schema-数据结构：职位
const positionSchema = new mongoose.Schema({
	name: String,
	salary: Number,
	company: String,
	logo: String
});

// Model-集合：用户
const User = mongoose.model('user', userSchema); // 对应 "users" 集合
// Model-集合：职位
const Position = mongoose.model('position', positionSchema); // 对应 "positions" 集合

module.exports = {User, Position};



