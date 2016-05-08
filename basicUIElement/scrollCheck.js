;(function(undefined){
	var isFunction=function(fn){
		return Object.prototype.toString.call(fn).slice(8,-1).toLowerCase()==="function";
	}
	
	var event=function(element,type,callback,propergation){
		propergation=propergation||false;
		if(element.addEventListener){
			element.addEventListener(type,callback,propergation);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,callback);
		}else{
			element["on"+type]=callback;
		}
	}
	var getClientHeight=function(){     
		var clientHeight=0;     
		if(document.body.clientHeight&&document.documentElement.clientHeight){    
			var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;             
		}else{     
			var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;         
		}     
		return clientHeight;     
	} 
	var getScrollTop=function(){     
		var scrollTop=0;     
		if(document.documentElement&&document.documentElement.scrollTop){     
			scrollTop=document.documentElement.scrollTop;     
		}else if(document.body){     
			scrollTop=document.body.scrollTop;     
		}     
		return scrollTop;     
	} 
	var getScrollHeight=function(){     
		return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);     
	} 
	var scrollCheck=function(fn){
		if(!isFunction(fn)){fn=function(){}}
		event(document,"scroll",function(e){
			var res={};
			res.top=getScrollTop(),res.bottom=getScrollHeight()-getClientHeight()-res.top;
			fn.call(null,res);
		});
	}
	window.scrollCheck=scrollCheck;
})();