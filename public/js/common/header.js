function Header(){
	this.init();
}

Header.NavTemplate=`<nav class="navbar navbar-inverse">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar">
        
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">拉勾网管理系统</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-navbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="/">首页 </a></li>
        
        <li>
          <a href="/html/position.html">职位管理系统</a>
          
        </li>
      </ul>
     
      <ul class="nav navbar-nav navbar-right">
        <li data-toggle="modal" data-target="#loginModal"><a href="#">登录</a></li>
        <li data-toggle="modal" data-target="#regModal">
          <a href="#" >注册 </a>
          
        </li>
      </ul>
    
    </div><!-- /.navbar-collapse -->
  </nav>`

$.extend(Header.prototype,{
	//初始化
	init(){
		this.createDom();
		this.createModal();
	},
	createDom(){
		$("header").html(Header.NavTemplate)
	},
	//创建login和register
	createModal(){
		new Loginmodal();
		new RegisterModal();
	}
});
	new Header();