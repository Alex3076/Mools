(function(global,undefined){
	var types={
		"ease":[0.25,0.1,0.25,1],
		"linear":[0,0,1,1],
		"ease-in":[0.42,0,1,1],
		"ease-out":[0,0,0.58,1],
		"ease-in-out":[0.42,0,0.58,1]
	}
	
	var cubic_bezier=function(x1,y1,x2,y2,pointNum){
		var t = 1.0/(pointNum - 1); 
		var res=[];
		for(var i = 0; i < pointNum; i++){
			res.push(cubic_bezierXY(x1,y1,x2,y2, i*t));  
		}
		return res;
	}
	var cubic_bezierXY=function(x1,y1,x2,y2,t){
		var tPoint={x:0,y:0};
		tPoint.x = cubic_bezierMC(x1,x2, t);  
		tPoint.y = cubic_bezierMC(y1,y2, t);  
		return tPoint;   
	}
	var cubic_bezierMC=function(p1,p2,t){
		var c = 3.0 * p1;   
		var b = 3.0 * (p2 - p1) - c;   
		var a = 1 - b - c;   
		var tSquare = t * t;   
		var tCube   = t * tSquare;   
		return (a * tCube) + (b * tSquare) + (c * t);  
	}
	
	function digitalGenerator(
		type/*数字生成器类型*/,
		lowerLimit/*下限*/,
		upperLimit/*上限*/,
		totalTime/*总耗时ms*/,
		callback/*回调函数*/,
		fps/*每秒帧数*/){
		
		var span=upperLimit-lowerLimit;
		var intervalTime=Math.ceil(1000/fps);
		var tolFrames=Math.floor(totalTime*fps/1000);
		var typeBezierData=types[type];
		typeBezierData.push(tolFrames);
		var data=cubic_bezier.apply(null,typeBezierData);
		var i=0;
		var newData=[];
		var lastindex=0;
		data.forEach(function(value){
			index=Math.floor(value.x*tolFrames);
			for(var i=lastindex+1;i<index;i++){
				newData[i]=newData[lastindex];
			}
			lastindex=index;
			newData[index]=lowerLimit+span*value.y;
		});
		callback.tem=setInterval(function(){
			
			var inData=newData[i];
			callback.call(null,inData);
			i++;
			if(i==tolFrames){
				clearInterval(callback.tem);
			}
		},intervalTime);
	}
	
	this.digitalGenerator=digitalGenerator;
})(this);