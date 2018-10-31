function RegisterModal(){
	this.createDom();
	this.addListener();
}

RegisterModal.ModalTemplate=`<div class="modal fade" id="regModal" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
      </div>
      <div class="modal-body">
       <div class="alert alert-danger hidden register-error">注册失败,请重新注册</div>
        <form class="form-register">
  <div class="form-group">
    <label for="regUsername">用户名</label>
    <input type="text" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
  </div>
  <div class="form-group">
    <label for="regPassword">密码</label>
    <input type="password" class="form-control regpassword" name="password" id="regPassword" placeholder="请输入密码">
  </div>
  <div class="form-group">
    <label for="regconPassword">确认密码</label>
   <input type="password" class="form-control conpassword" id="regconPassword" placeholder="请再次输入密码">
   <div class="alert alert-danger hidden password-error">密码不一致</div>
  </div>
  <div class="form-group">
    <label for="regemail">邮件</label>
    <input type="email" class="form-control"  name="email" id="regemail" placeholder="请输入Email">
  </div>
  
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary btn-register">注册</button>
      </div>
    </div>
  </div>
</div>`

$.extend(RegisterModal.prototype,{
	createDom(){
		$("body").append(RegisterModal.ModalTemplate)
	},
	//事件监听
	addListener(){
		$(".btn-register").on("click",this.registerHanler);
		$(".conpassword").on("blur",this.conFirmHandler);
	},
	//点击注册
	registerHanler(){
		//注册
		const data=$(".form-register").serialize();
		//请求API接口，实现用户名与密码验证
		const url="/api/users/register";
		$.post(url,data,(data)=>{
			if(data.res_body.status===1){//注册成功
			//保存用户名与密码
			//$.cookie("username",data.res_body.data.username);
				sessionStorage.username=data.res_body.data.username;
			//登录刷新页面
			location.reload();
			}else{//注册失败
				$(".register-error").removeClass("hidden")
			}
		},"json")
	},
	//验证密码是否一致
	conFirmHandler(){
		let pas=$(".regpassword").val();
		console.log(pas);
		let conpas=$(".conpassword").val();
		console.log(conpas);
		if(pas===conpas){
			$(".password-error").addClass("hidden");
		}else{
			$(".password-error").removeClass("hidden");
			//console.log("ccc");
			//$(".password-error").show();
		}
	}
})
