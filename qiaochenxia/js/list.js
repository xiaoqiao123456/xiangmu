//window.onload=function(){
function list(){
	//list页面数据加载
	$.ajax({
		type:"get",
		url:"../json/data_list.json",
		success:function(json){
			var str="";
			var list="";
			for(var attr in json){
				str+=`
					<li cname="${attr}"><a href="javascript:;">${json[attr].name}</a></li>
				`;
				var arr=json[attr].list;
				for(var i=0;i<arr.length;i++){
					list+=`
						<li>
							<a href="javascript:;">
								<img src="../img/${arr[i].src}" alt="" />
							</a>
							<h2><a href="">${arr[i].depict}</a></h2>
							<p>￥${arr[i].price}</p>
						</li>
					`;
				}
			}
			$(".subnav ol").html(str);
			$(".list_list ul").html(list);
			
			//为.subnav下的ol下的li添加点击事件
			$(".subnav ol li").click(function(){
				var cname=$(this).attr("cname");
				var pro=json[cname].list;
				var list1="";
				for(var i=0;i<pro.length;i++){
					list1+=`
						<li>
							<a href="javascript:;">
								<img src="../img/${pro[i].src}" alt="" />
							</a>
							<h2><a href="javascript:;">${pro[i].depict}</a></h2>
							<p>￥${pro[i].price}</p>
						</li>
					`;
				}
				$(".list_list ul").html(list1);
			})
			
			//点击list页列表的li描述进入产品详情页
			$(".list_list ul li").click(function(){
				alert($(".list_list ul li").length)
				//location.href="page.html"
			})
		
		}
	});
}
	
//}
