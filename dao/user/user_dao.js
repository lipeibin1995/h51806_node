//引入"User"的Model
const {User}=require("../model/model.js");

//用户数据访问处理
const UserDao={
	//保存用户数据
	save(userinfo){
	//根据Model创建"document(userinfo)"
	const user=new User(userinfo);
	//保存到集合中，并返回保存结果的Promise对象
	return user.save();
	},
	//查找用户数据
	find(condition){
		return User.find(condition);
	}
}
module.exports=UserDao;
