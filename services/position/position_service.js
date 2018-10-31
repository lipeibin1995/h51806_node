const PositionDao=require("../../dao/position/position_dao.js")

const PositionService={
	//添加职位
	add(req,res,next){
		//获取POST请求中传递的数据
		const{name,salary,company}=req.body;
		//上传的图片LOGO文件名
		let logo="";
		if(req.file){
			logo="/images/upload/"+req.file.filename;
		}
		//保存到数据库中
		PositionDao.save({name,salary,company,logo})
						.then((data)=>{
							res.json({
								res_code:1,
								res_error:"",
								res_body:{
									status:1,
									data:data
								}
							});
						})
						.catch((err)=>{
							res.json({
								res_code:0,
								res_error:err,
								res_body:{}
							})
						});
	},
	//分页查询
	findByPage(req,res,next){
		//获取查询的页码
		const {page}=req.query;
		//查询指定页码的数据
		PositionDao.findByPage(page)
							.then((data)=>{
								res.json({
									res_code:1,
									res_error:"",
									res_body:{
										status:1,
										list:data
									}
								});
							})
							.catch((err)=>{
								res.json({
									res_code:0,
									res_error:err,
									res_body:{}
								});
							});
	}
	
};

module.exports=PositionService;
