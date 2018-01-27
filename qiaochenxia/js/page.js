function page(){
	//page放大镜
	$(".look ul li").click(function(){
		var index=$(this).index();
		$(".pic img").eq(index)
				     .show()
				     .siblings()
				     .hide();
		$(".gaoqing img").eq(index)
				     .show()
				     .siblings()
				     .hide();	
		$(".mask").css("background-image","url(../img/page_0"+(index +1)+"m.jpg)")
	})
	$(".pic_img").mouseenter(function(){
		$(".mask").show();
		$(".gaoqing").show();
		$(".layer").show();
		$(".mask").mousemove(function(e){
			var e=e||event;
			var disx=e.pageX-$(".pic_img").offset().left-$(".mask").outerWidth()/2;
			var disy=e.pageY-$(".pic_img").offset().top-$(".mask").outerHeight()/2;
			maxL=$(".pic_img").outerWidth()-$(".mask").outerWidth();
			maxT=$(".pic_img").outerHeight()-$(".mask").outerHeight();
			disx<0?disx=0:(disx>maxL?disx=maxL:disx);
			disy<0?disy=0:(disy>maxT?disy=maxT:disy);
			$(".mask").css({
					left:disx,
					top:disy,
					backgroundPosition:-disx+"px -"+disy+"px"
				})
			$(".gaoqing img").css({
				left:-disx*$(".gaoqing img").outerWidth()/$(".pic_img").outerWidth(),
				top:-disy*$(".gaoqing img").outerHeight()/$(".pic_img").outerHeight()
			})
			
		})
	}).mouseleave(function(){
		$(".mask").hide();
		$(".gaoqing").hide();
		$(".layer").hide();
	})
	//page页分享移入移出动画
	$(".shar a").mouseenter(function(){
		$(this).animate({"background-position-y":-25},100)
	}).mouseleave(function(){
		$(this).animate({"background-position-y":0},100)
	})
	//page页商品信息选项卡
	$(".page_tab li").mouseenter(function(){
		$(this).addClass("currnt")
			   .siblings()
			   .removeClass("currnt");
		var index=$(this).index();
		$(".b1").eq(index).css("display","block")
						  .siblings()
						  .css("display","none");
		if(index==0){
			$(".b1").css("display","block");
		}
	})
}
