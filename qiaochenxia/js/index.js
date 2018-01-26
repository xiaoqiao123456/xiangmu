window.onload=function(){
	//菜单选项卡功能
	$(".nav li").mouseenter(function(){
		$(this).find(".erji")
			   .css("display","block");		
	}).mouseleave(function(){
		$(this).find(".erji")
			   .css("display","none");
	})
	//滚轮返回顶部功能
	$(window).scroll(function(){
		var h=$(document).scrollTop();
		if(h>120){
			$("#right img:last()").fadeIn(1500)
		}else{
			$("#right img:last()").fadeOut(1500)
		}
		
	})
	//点击回到顶部
	$("#right img:last()").click(function(){
		$("html,body").animate({"scrollTop":0},1000);
		return false;
	})
	//右侧移入出现电话号码移出则消失
	$("#tel").mouseenter(function(){
		$(".tel").animate({"left":-231,"opacity":1},1000)
	}).mouseleave(function(){
		$(".tel").animate({"left":-331,"opacity":0},1000)
	})
	//轮播图
	var timer=setInterval(autoplay,2000);
	var index=0;
	function autoplay(){
		index++;
		if(index==$(".banner ul li").length){
			index=0;
		}
		$(".banner p span").eq(index-1)
						   .addClass("active")
						   .siblings()
						   .removeClass("active");
		$(".banner ul li").eq(index)
						  .fadeIn(1000)
						  .siblings()
						  .fadeOut(1000);
	}
	$(".banner").mouseenter(function(){
		clearInterval(timer);
		$(".banner ol li").animate({"opacity":1},1000);
		
	}).mouseleave(function(){
		$(".banner ol li").animate({"opacity":0},1000);
		timer=setInterval(autoplay,2000)
	})
	$(".banner ol li").click(function(){
		autoplay();
	})
	//图片和描述部分移入移出动画
	$(".col").mouseenter(function(){
		$(this).find(".one").css("backgroundColor","#eeafce");
		$(this).find(".two").css("backgroundColor","#97c86c");
		$(this).find(".three").css("backgroundColor","#8ccedc");
		$(this).find(".one").find("i")
			   .css({"border-left-color":"#eeafce",
			   		"border-right-color":"#eeafce"
			  });
		$(this).find(".two").find("i")
			   .css({"border-left-color":"#97c86c",
			   		"border-right-color":"#97c86c"
			  });
		$(this).find(".three").find("i")
			   .css({"border-left-color":"#8ccedc",
			   		"border-right-color":"#8ccedc"
			  });
		$(this).children("img").animate({"right":5},300);
		$(this).find("p").css("color","#fff")
		$(this).find(".four").find("p").css("color","#969696")
	}).mouseleave(function(){
		$(this).find(".depict").css("backgroundColor","#fff");
		$(this).find("i")
			   .css({"border-left-color":"#fff",
			   		"border-right-color":"#fff"
			 });
		$(this).children("img").animate({"right":0},300);
		$(this).find("p").css("color","#969696")
	})
	//图片和描述部分点击出现产品和蒙版
	var oPro=document.getElementsByClassName("pro");
	var oMain=document.getElementsByClassName("main")[0];
	var oMengban=document.getElementsByClassName("mengban")[0];
	var oInner=document.getElementsByClassName("inner");
	var oClose=document.getElementsByClassName("close");
	for(let i=0;i<oPro.length;i++){
		oPro[i].onclick=function(){
			oMengban.style.display="block";
			startMove(oInner[i],{"width":324,"height":192},function(){
				startMove(oInner[i],{"height":587})
			})
		}
	
		oClose[i].onclick=function(){
			oMengban.style.display="none";
			startMove(oInner[i],{"height":192},function(){
				startMove(oInner[i],{"width":0,"height":0,"opacity":0},function(){
					oInner[i].style.opacity=1;
				})
			})
		}
	}
	
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
				location.href="page.html"
			})
		
		}
	});
}

