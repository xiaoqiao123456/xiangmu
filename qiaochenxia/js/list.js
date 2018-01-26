window.onload=function(){
	$.ajax({
		type:"get",
		url:"../json/data_list.json",
		success:function(json){
			var str="";
			var list="";
			for(var attr in json){
				str+=`
					<li><a href="">${json[attr].name}</a></li>
				`;
				var arr=json[attr].list;
				for(var i=0;i<arr.length;i++){
					list+=`
						<li>
							<a href="">
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
		}
	});
}
