(function(undefined){
	function isFunction(obj){
		return {}.toString.call(obj).toLowerCase()==="[object function]";
	}

	var gpercents=document.getElementsByTagName("gpercent");
	var gpercentLen=gpercents.length;
	var j;
	var gpercentCache=[];
	for(j=0;j<gpercentLen;j++){
		var i=j;
		var gpercent={
			obj:gpercents[i],
			from:Number(gpercents[i].getAttribute("from"))||0,
			to:Number(gpercents[i].getAttribute("to"))||100,
			size:gpercents[i].getAttribute("width")||"80px",
			border:gpercents[i].getAttribute("border")||"1px solid #fff",
			width:0,
			now:Number(gpercents[i].getAttribute("now"))||60,
			unit:"",
			callback:function(){}
		}
		var temcall=window[gpercents[i].getAttribute("callback")];
		if(temcall&&isFunction(temcall)){
			gpercent.callback=window[gpercents[i].getAttribute("callback")];
		}
		gpercent.width=Number(gpercent.size.replace(/[^\d\.\s]/g,""));
		gpercent.unit=gpercent.size.replace(/[\d\.\s]/g,"");
		
		if(gpercent.to<=gpercent.from){
			gpercent.to=gpercent.from+1;
		}
		if(gpercent.now<gpercent.from){
			gpercent.now=gpercent.from;
		}else if(gpercent.now>gpercent.to){
			gpercent.now=gpercent.to;
		}
		
		var nowDeg=(gpercent.now-gpercent.from)/(gpercent.to-gpercent.from)*180-180;
		
		var containNode=document.createElement("div");
		containNode.setAttribute("class","gpercent");
		containNode.setAttribute("id","gpercent_"+i);
		containNode.setAttribute("gpercent",i);
		containNode.style.cssText="position:relative;width:"+gpercent.size+";height:"+gpercent.width*.6+gpercent.unit+";border:"+gpercent.border+";overflow:hidden;";
		
		var coverNode=document.createElement("div");
		coverNode.style.cssText="position:absolute;z-index:5;width:"+gpercent.size+";height:"+gpercent.width*.6+gpercent.unit+";cursor:pointer;";
		coverNode.setAttribute("gpercent",i);
		
		var lineStartLeft=gpercent.width*.5-Math.cos(Math.PI*(nowDeg+180)/180)*gpercent.width*.4;
		
		var lineNode=document.createElement("div");
		lineNode.style.cssText="position:absolute;z-index:2;width:0;border-left:"+gpercent.border+";top:0;height:"+gpercent.size+";opacity:0.3;filter:alpha(opacity=30);left:"+lineStartLeft+"px;transition:left .1s ease;";
		lineNode.setAttribute("id","gpercent_line_"+i);
		
		var circleNode=document.createElement("div");
		circleNode.style.cssText="position:absolute;z-index:3;top:"+gpercent.width*.2+gpercent.unit+";left:"+gpercent.width*.1+gpercent.unit+";width:"+gpercent.width*.8+gpercent.unit+";height:"+gpercent.width*.8+gpercent.unit+";border:"+gpercent.border+";border-radius:100%;";
		
		var textNode=document.createElement("div");
		textNode.style.cssText="position:absolute;z-index:4;text-align:center;width:100%;line-height:"+gpercent.width*.4+gpercent.unit+";";
		textNode.innerHTML=gpercent.now;
		textNode.setAttribute("id","gpercent_text_"+i);
		
		var selNode=document.createElement("div");
		selNode.style.cssText="width:"+gpercent.width*.8+gpercent.unit+";height:"+gpercent.width*.4+gpercent.unit+";background:#fff;transform-origin:center bottom;transform:rotate("+nowDeg+"deg);opacity:0.6;filter:alpha(opacity=60);transition:transform .1s ease;border-radius:"+gpercent.size+" "+gpercent.size+" 0 0;";
		selNode.setAttribute("id","gpercent_sel_"+i);
		
		circleNode.appendChild(textNode);
		circleNode.appendChild(selNode);
		containNode.appendChild(lineNode);
		containNode.appendChild(coverNode);
		containNode.appendChild(circleNode);
		gpercent.obj.appendChild(containNode);

		gpercent.obj.onclick=click;
		gpercentCache[i]=gpercent;
	}

	function click(e){
		e=e||window.event;
		var target=e.target||e.srcElement;
		var id=target.getAttribute("gpercent");
		var sel=document.getElementById("gpercent_sel_"+id);
		var tolWidth=sel.offsetWidth*1.25;
		var left=tolWidth*.1,right=tolWidth*.9,btm=0,radius=sel.offsetWidth/2;
		if(target===sel||target===sel.parentNode){
			left=0;
		}
		var x=e.offsetX;
		if(x<left){
			x=left;
			btm=-sel.offsetWidth/2;
		}else if(x>right){
			x=right;
			btm=sel.offsetWidth/2;
		}else{
			btm=x-left-sel.offsetWidth/2;
		}
			
		var deg=Math.acos(btm/radius)/Math.PI*180;
			
		var text=Math.floor((180-deg)/180*(gpercentCache[id].to-gpercentCache[id].from)+gpercentCache[id].from);
		document.getElementById("gpercent_text_"+id).innerHTML=text;
		document.getElementById("gpercent_line_"+id).style.left=x+"px";
		sel.style.transform="rotate(-"+deg+"deg)";
		gpercentCache[id].callback.call(null,text,id);
	}
})();