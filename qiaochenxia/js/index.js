window.onload = function() {
	//菜单选项卡功能
	$(".nav li").mouseenter(function() {
		$(this).find(".erji")
			.css("display", "block");
	}).mouseleave(function() {
		$(this).find(".erji")
			.css("display", "none");
	})
	//滚轮返回顶部功能
	$(window).scroll(function() {
		var h = $(document).scrollTop();
		if(h > 120) {
			$("#right img:last()").fadeIn(1500)
		} else {
			$("#right img:last()").fadeOut(1500)
		}

	})
	//点击回到顶部
	$("#right img:last()").click(function() {
		$("html,body").animate({ "scrollTop": 0 }, 1000);
		return false;
	})
	//右侧移入出现电话号码移出则消失
	$("#tel").mouseenter(function() {
		$(".tel").animate({ "left": -231, "opacity": 1 }, 1000)
	}).mouseleave(function() {
		$(".tel").animate({ "left": -331, "opacity": 0 }, 1000)
	})
	//轮播图
	var timer = setInterval(autoplay, 2000);
	var index = 0;

	function autoplay() {
		index++;
		if(index == $(".banner ul li").length) {
			index = 0;
		}
		$(".banner p span").eq(index - 1)
			.addClass("active")
			.siblings()
			.removeClass("active");
		$(".banner ul li").eq(index)
			.fadeIn(1000)
			.siblings()
			.fadeOut(1000);
	}
	$(".banner").mouseenter(function() {
		clearInterval(timer);
		$(".banner ol li").animate({ "opacity": 1 }, 1000);

	}).mouseleave(function() {
		$(".banner ol li").animate({ "opacity": 0 }, 1000);
		timer = setInterval(autoplay, 2000)
	})
	$(".banner ol li").click(function() {
		autoplay();
	})
	//图片和描述部分移入移出动画
	$(".col").mouseenter(function() {
		$(this).find(".one").css("backgroundColor", "#eeafce");
		$(this).find(".two").css("backgroundColor", "#97c86c");
		$(this).find(".three").css("backgroundColor", "#8ccedc");
		$(this).find(".one").find("i")
			.css({
				"border-left-color": "#eeafce",
				"border-right-color": "#eeafce"
			});
		$(this).find(".two").find("i")
			.css({
				"border-left-color": "#97c86c",
				"border-right-color": "#97c86c"
			});
		$(this).find(".three").find("i")
			.css({
				"border-left-color": "#8ccedc",
				"border-right-color": "#8ccedc"
			});
		$(this).children("img").animate({ "right": 5 }, 300);
		$(this).find("p").css("color", "#fff")
		$(this).find(".four").find("p").css("color", "#969696")
	}).mouseleave(function() {
		$(this).find(".depict").css("backgroundColor", "#fff");
		$(this).find("i")
			.css({
				"border-left-color": "#fff",
				"border-right-color": "#fff"
			});
		$(this).children("img").animate({ "right": 0 }, 300);
		$(this).find("p").css("color", "#969696")
	})
	//图片和描述部分点击出现产品和蒙版
	var oPro = document.getElementsByClassName("pro");
	var oMain = document.getElementsByClassName("main")[0];
	var oMengban = document.getElementsByClassName("mengban")[0];
	var oInner = document.getElementsByClassName("inner");
	var oClose = document.getElementsByClassName("close");
	for(let i = 0; i < oPro.length; i++) {
		oPro[i].onclick = function() {
			oMengban.style.display = "block";
			startMove(oInner[i], { "width": 324, "height": 192 }, function() {
				startMove(oInner[i], { "height": 587 })
			})
		}

		oClose[i].onclick = function() {
			oMengban.style.display = "none";
			startMove(oInner[i], { "height": 192 }, function() {
				startMove(oInner[i], { "width": 0, "height": 0, "opacity": 0 }, function() {
					oInner[i].style.opacity = 1;
				})
			})
		}
	}

	//list页面数据加载
	$.ajax({
		type: "get",
		url: "../json/data_list.json",
		success: function(json) {
			var str = "";
			var list = "";
			for(var attr in json) {
				str += `
					<li cname="${attr}"><a href="javascript:;">${json[attr].name}</a></li>
				`;
				var arr = json[attr].list;
				for(var i = 0; i < arr.length; i++) {
					list += `
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
			//点击list页列表的li描述进入产品详情页
			$(".list_list ul li").click(function() {
				location.href = "page.html";
			})
			//为.subnav下的ol下的li添加点击事件
			$(".subnav ol li").click(function() {
				var cname = $(this).attr("cname");
				var pro = json[cname].list;
				var list1 = "";
				for(var i = 0; i < pro.length; i++) {
					list1 += `
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
				//点击list页列表的li描述进入产品详情页
				$(".list_list ul li").click(function() {
					location.href = "page.html";
				})
			})

		}
	});
	//page放大镜
	$(".look ul li").click(function() {
		var index = $(this).index();
		$(".pic img").eq(index)
			.show()
			.siblings()
			.hide();
		$(".gaoqing img").eq(index)
			.show()
			.siblings()
			.hide();
		$(".mask").css("background-image", "url(../img/page_0" + (index + 1) + "m.jpg)")
	})
	$(".pic_img").mouseenter(function() {
		$(".mask").show();
		$(".gaoqing").show();
		$(".layer").show();
		$(".mask").mousemove(function(e) {
			var e = e || event;
			var disx = e.pageX - $(".pic_img").offset().left - $(".mask").outerWidth() / 2;
			var disy = e.pageY - $(".pic_img").offset().top - $(".mask").outerHeight() / 2;
			maxL = $(".pic_img").outerWidth() - $(".mask").outerWidth();
			maxT = $(".pic_img").outerHeight() - $(".mask").outerHeight();
			disx < 0 ? disx = 0 : (disx > maxL ? disx = maxL : disx);
			disy < 0 ? disy = 0 : (disy > maxT ? disy = maxT : disy);
			$(".mask").css({
				left: disx,
				top: disy,
				backgroundPosition: -disx + "px -" + disy + "px"
			})
			$(".gaoqing img").css({
				left: -disx * $(".gaoqing img").outerWidth() / $(".pic_img").outerWidth(),
				top: -disy * $(".gaoqing img").outerHeight() / $(".pic_img").outerHeight()
			})

		})
	}).mouseleave(function() {
		$(".mask").hide();
		$(".gaoqing").hide();
		$(".layer").hide();
	})
	//page页分享移入移出动画
	$(".shar a").mouseenter(function() {
		$(this).animate({ "background-position-y": -25 }, 100)
	}).mouseleave(function() {
		$(this).animate({ "background-position-y": 0 }, 100)
	})
	//page页商品信息选项卡
	$(".page_tab li").mouseenter(function() {
		$(this).addClass("currnt")
			.siblings()
			.removeClass("currnt");
		var index = $(this).index();
		$(".b1").eq(index).css("display", "block")
			.siblings()
			.css("display", "none");
		if(index == 0) {
			$(".b1").css("display", "block");
		}
	})
	//login登录注册
	var flagPhone = null;
	var flagPass = null;
	var flagNewpass = null;
	var flageYzm = null;
	$(".label input").val("");
	$(".label input").blur(function() {
		$(this).parent().find(".requeir").css("display", "block");
		$(this).parent().find(".requeir").html("");
	}).focus(function() {
		$(this).parent().find(".requeir").css("display", "none");
		$(this).parent().removeClass("judge");
	})
	$("#phonenum").blur(function() {
		//手机号验证
		var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/; //手机号
		var txt = $(this).val();
		if(reg.test(txt) && txt != "") {
			flagPhone = true;
		} else if(!reg.test(txt) && txt != "") {
			flagPhone = false;
			$(this).parent().find(".requeir").html("手机格式不正确");
			$(this).parent().addClass("judge");
		} else if(txt == "") {
			flagPhone = false;
			$(this).parent().find(".requeir").html("手机用来登录，不能为空");
			$(this).parent().addClass("judge");
		}
	})
	//验证码
	function getCode() { //获取4位验证码0-1，a-z,A-Z
		var arr = [];
		for(var i = 0; i < 4; i++) {
			var code = rand(48, 122);
			if(code >= 58 && code <= 64 || code >= 91 && code <= 96) {
				i--;
			} else {
				arr[i] = String.fromCharCode(code);
			}
		}
		return arr.join("");
	}
	$(".yzmtxt").html(getCode());
	$(".yzm").click(function() {
		$(".yzmtxt").html(getCode());
	})
	$(".yz1").blur(function() {
		var txt = $(this).val();
		if(txt == $(".yzmtxt").html() && txt != "") {
			flageYzm = true;
		}else if(txt == ""){
			flageYzm = false;
			$(this).parent().find(".requeir").html("验证码不能为空");
			$(this).parent().addClass("judge");
		}else{
			flageYzm = false;
			$(this).parent().find(".requeir").html("验证码错误");
			$(this).parent().addClass("judge");
		}
	})
	//密码验证
	$("#password").blur(function() {
		var reg = /^.{6,}$/; //密码长度
		var txt = $(this).val();
		if(reg.test(txt) && txt != "") {
			flagPass = true;
		} else if(!reg.test(txt) && txt != "") {
			flagPass = false;
			$(this).parent().find(".requeir").html("密码格式不正确");
			$(this).parent().addClass("judge");
		} else if(txt == "") {
			flagPass = false;
			$(this).parent().find(".requeir").html("密码不能为空");
			$(this).parent().addClass("judge");
		}
	})
	//验证确认密码
	$("#newpass").blur(function() {
		var txt = $(this).val();
		var oldpass = $("#password").val();
		if(txt == oldpass && txt != "") {
			flagNewpass = true;
		} else if(txt != oldpass && txt != "") {
			flagNewpass = false;
			$(this).parent().find(".requeir").html("与密码不一致");
			$(this).parent().addClass("judge");
		} else if(txt == "") {
			flagNewpass = false;
			$(this).parent().find(".requeir").html("确认密码不能为空");
			$(this).parent().addClass("judge");
		}
	})
	//点击注册
	var oCheckbox = document.getElementById("xieyi");
	$(".subbtn").click(function() {
		if(flagPhone && flagPass && flagNewpass && oCheckbox.checked) {
			location.href = "logup.html";
		}
		//存cookie
		var json = {
			txt: $("#phonenum").val(),
			word: $("#password").val()
		}
		setCookie("usetit",JSON.stringify(json),30);
	})
	//取cookie
		var arr = getCookie("usetit");
		var item1 = arr.txt;
		var item2 = arr.word;
		//console.log(item1);
		//console.log(item2);
	//登录
	$("#delu").click(function() {
		var txt1 = $("#username").val();
		var txt2 = $("#mima").val();
		var txt3 = $(".yz2").val();
		var txt4 = $(".yzmtxt").html();
		if(txt1 == item1 && txt2 == item2 && txt3 == txt4 && txt3 != ""){
			location.href="http://127.0.0.1/qiaochenxia/html/index.html"
			//location.href = "http://127.0.0.1/qiaochenxia/index.html"
		}else if(txt1 != item1 || txt2 != item2) {
			$(".yzmtxt").parent().find(".requeir").html("登录失败，请检查用户名和密码是否正确");
		}else if(txt3 != txt4 && txt3 != ""){
			$(".yzmtxt").parent().find(".requeir").html("验证码错误");
		}else if(txt3 == ""){
			$(".yzmtxt").parent().find(".requeir").html("验证码不能为空");
		}		
	})
	
	
}