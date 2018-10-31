function Position(){
	this.addListener();
	//加载第一页数据
	this.loadData(1);
}

Position.PositionRowTemplate=`
	<tr>
	<td><%=_id%></td>
	<td><img  style="width: 60px;"  src="<%=logo%"></td>
	<td><%=company%></td>
	<td><%=name%></td>
	<td><%=salary%></td>
	<td><a href="#">修改</a> <a href="#">删除</a></td>
	</tr>`;
	$.extend(Position.prototype,{
		//注册事件监听
		addListener(){
			//添加职位
			$(".btn-add-pos").on("click",this.addPosHandler);
			//点击翻页
			$(".pagination").on("click","a",$.proxy(this.loadDataHandler,this));
		},
		//翻页处理
		loadDataHandler(event){
			const $src=$(event.target);
			const page=Number($src.text());
			this.loadData(page);
			//标签使用类名处理
			$src.parent("li").addClass("active").siblings("li").removeClass("active");	
		},
		//加载数据
		loadData(page){
			//默认查询第一页的数据
			page=page||1;
			// "/api/positions/find_by_page?page=2"
			const url="/api/positions/find_by_page?page="+page;
			//get请求
			$.getJSON(url,(data)=>{
				if(data.res_code===1){
					let html="";
					data.res_body.list.forEach((curr)=>{
						html+=ejs.render(Position.PositionRowTemplate,curr);		
					});
					$(".table-position tbody").html(html);
				}
			});
		},
		//添加职位处理
		addPosHandler(){
			//获取表单中的数据
			//URl
			const url="/api/positions/add";
			//向服务器发送的数据
			const data=new FormData($(".form-add-pos").get(0));
			//发送请求
			$.ajax({
				type:"post",
				url:url,
				data:data,
				dataType:"json",
				processData:false,	// 不将 data 数据转换为查询字符串
				contentType:false,	// 不使用默认的 "application/x-www-form-urlencoded"
				success:function(data){
					if(data.res_body.status===1){ // 添加成功，使用 ejs 浏览器端模板渲染
						//data.res_body.data
						//使用ejs模板渲染
						const html=ejs.render(Position.PositionRowTemplate,data.res_body.data)
						//显示
						$(".table-position tbody").append(html);
						//关闭模态框
						$("#addPosModal").modal("hide");
					}else{//添加失败
						$(".add-pos-error").removeClass("hidden");
					}
				}
			});
			
			/*const data = $(".form-add-pos").serialize();
		// 请求API接口，实现职位添加
		$.post(url, data, (data)=>{
			if (data.res_body.status === 1) { // 添加成功，使用 ejs 浏览器端模板渲染
				// data.res_body.data
				// 使用 ejs 模板渲染
				const html = ejs.render(Position.PositionRowTemplate, data.res_body.data)
				// 显示
				$(".table-position tbody").append(html);
				// 关闭模态框
				$("#addPosModal").modal("hide");
			} else { // 添加失败
				$(".add-pos-error").removeClass("hidden");
			}
		}, "json")*/
			
		}
	});
new Position();
