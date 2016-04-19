(function(obj,undefined){
	
	var leftUnit=null,topUnit=null;

	function setOpacity(ele, opacity,left,top,display){
		if (ele.style.opacity != undefined) {
			ele.style.opacity = opacity / 100;
		}else{
			ele.style.filter = "alpha(opacity=" + opacity + ")";
		}
		ele.style.display=display;
		ele.style.left=left+leftUnit;
		ele.style.top=top+topUnit;
	}
	
	function offsetIn(nodes,offset,speed,interval){
		function fadeInInner(node,timeOut){
			timeOut=timeOut||0;
			setTimeout(function(){
				
				!leftUnit && (leftUnit=/([a-zA-Z]+)/i.exec(node.style.left)[0]);
				!topUnit && (topUnit=/([a-zA-Z]+)/i.exec(node.style.top)[0]);

				var left=parseInt(node.style.left)-offset;
				var top=parseInt(node.style.top)-offset;
				setOpacity(node,0,left,top,"block");
				var count = speed / 1000;
				var everyOpaAdd=2.5/count;
				
				var everyOffsetAdd=offset/(count*40);
				var opacity=0;
				
				node.timer = setInterval(function() {
					if (opacity < 100) {
						opacity += everyOpaAdd;
						left+=everyOffsetAdd;
						top+=everyOffsetAdd;
						setOpacity(node,opacity,left,top,"block");
					} else {
						clearInterval(node.timer);
					}
				}, 25);
			},timeOut);
		}
		
		if(nodes.length){
			interval=interval||speed/2;
			for(var i=0;i<nodes.length;i++){
				fadeInInner(nodes[i],i*interval);
			}
		}else{
			fadeInInner(nodes);
		}
	}
	
	function offsetOut(nodes,offset,speed,interval){
		function fadeOutInner(node,timeOut){
			timeOut=timeOut||0;
			setTimeout(function(){
				!leftUnit && (leftUnit=/([a-zA-Z]+)/i.exec(node.style.left)[0]);
				!topUnit && (topUnit=/([a-zA-Z]+)/i.exec(node.style.top)[0]);
			
				var left=parseInt(node.style.left);
				var top=parseInt(node.style.top);
				setOpacity(node,100,left,top,"block");
				var count = speed / 1000;
				var everyOpaAdd=2.5/count;
				
				var everyOffsetAdd=offset/(count*40);
				var opacity=100;
				
				node.timer = setInterval(function() {
					if (opacity >0) {
						opacity -= everyOpaAdd;
						left+=everyOffsetAdd;
						top-=everyOffsetAdd;
						setOpacity(node,opacity,left,top,"block");
					} else {
						setOpacity(node,0,left,top,"none");
						clearInterval(node.timer);
					}
				}, 25);
			},timeOut);
		}
	
		if(nodes.length){
			interval=interval||speed/2;
			for(var i=0;i<nodes.length;i++){
				fadeOutInner(nodes[i],i*interval);
			}
		}else{
			fadeOutInner(nodes);
		}
	}
	
	obj.offsetIn=offsetIn;
	obj.offsetOut=offsetOut;
})(this);