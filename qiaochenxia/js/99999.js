oPro.onclick=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		show();
		if(target.className=="pro"){
			show();
		}
		
	}
	function show(){
		oMengban.style.display="block";
		startMove(oInner,{"width":324,"height":192},function(){
			startMove(oInner,{"height":587},function(){
				//oPro.onclick=null;
			})
		})
	}
	function hide(){
		oMengban.style.display="none";
		startMove(oInner,{"height":192},function(){
			startMove(oInner,{"width":0,"height":0,"opacity":0},function(){
				oInner.style.opacity=1;
			})
		})
	}
	var oClose=document.getElementsByClassName("close")[0];
	oClose.onclick=function(e){
		var e=e||event;
		e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
		hide();
	}
	






