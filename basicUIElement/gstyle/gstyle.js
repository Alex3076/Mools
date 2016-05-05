;(function(global,undefined){
	if(global.gstyle)return;
	
	var gstyle=function(node){
	
		if(node==null)return false;
		
		var style,property,fullProperty;
		var unitReg=/^\s*([0-9\.]+)\s*(.*)\s*$/i,unitRes,res;
		
		if(node.currentStyle){
			style=node.currentStyle;
		}else if(window.getComputedStyle){
			style=getComputedStyle(node,false); 
		}else{
			return false;
		}
		
		if(arguments.length<=1){
			return style;
		}
		property=arguments[1].toLowerCase().replace(/\-(\w)/,function(v){return v.toUpperCase().slice(1);});

		if(!style.hasOwnProperty(property)){
			return false;
		}
		
		fullProperty=style[property];
		
		fullProperty=fullProperty.split(/\s+/ig);
		if(fullProperty.length===1){
			unitRes=unitReg.exec(fullProperty[0]);
			res={value:unitRes[1],unit:unitRes[2]};
		}else{
			res=[];
			for(var index in fullProperty){
				unitRes=unitReg.exec(fullProperty[index]);
				res.push({value:unitRes[1],unit:unitRes[2]});
			}
		}

		return res;		
	}
	
	global.gstyle=gstyle;
	
})(this);