(function(global,undefined){
	var nfps=0;
	function fps(timeConsuming/*耗时多少毫秒，越大越精确*/,callbacks){
		if(arguments.length===1 && typeof timeConsuming !== "number"){
			callbacks=timeConsuming;
			timeConsuming=200;
		}
		timeConsuming=timeConsuming||200;
		callbacks=callbacks||function(){};
		var multiple=1000/timeConsuming;
		var startTime = new Date().getTime(); 
		var inteval=setInterval(function(){
			var temTime = new Date().getTime(); 
			nfps++;
			if(temTime-startTime>timeConsuming){
				nfps=nfps*multiple;
				callbacks.call(null,nfps);
				clearInterval(inteval);
			}
		},0);
	}
	global.gfps=fps;
})(this);