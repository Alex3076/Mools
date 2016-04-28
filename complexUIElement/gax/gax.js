;(function(global,undefined){
	var _Gax;
	var PENDING=1,SUCCESS=2,ERROR=3;
	var Gax=function(url){
		_Gax=this;
		if(!(this instanceof Gax)){
			return new Gax(url);
		}
		this.url=url;
		this.isOrigin=checkOrigin();
		_Gax.headerQueue=[];
		_Gax.status=PENDING;
		_Gax.successQueue=[];
		_Gax.errorQueue=[];
	}
	
	var checkOrigin=function(){
		var reg=new RegExp("^"+window.location.origin,"i");
		return reg.test(_Gax.url);
	}
	
	
	
	var dataToUrl=function(obj){
		var value=[];
		for(var key in obj){
			value.push(encodeURIComponent(key));
			value.push("=");
			value.push(encodeURIComponent(obj[key]));
			value.push("&");
		}
		value.pop();
		return value.join("");
	}
	
	var baseAjaxRequestSetHeader=function(){
		for(var key in _Gax.headerQueue){
			_Gax.xhr.setRequestHeader(key,_Gax.headerQueue[key]);
		}
	}
	
	var baseAjaxRequestMain=function(Method){
		var Method=Method.toUpperCase(),url=_Gax.url,data=null,isLegal=false;
		switch(Method){
			case "GET":
				isLegal=true;
				url=_Gax.url+"?"+_Gax.data;
				break;
			case "POST":
				isLegal=true;
				data=_Gax.data;
				break;
			case "HEAD":
				isLegal=true;
				break;
		}
		if(isLegal){
			_Gax.baseAjaxRequest();
			_Gax.xhr.open(Method,url,true);
			baseAjaxRequestSetHeader();
			_Gax.xhr.send(data);
			_Gax.xhr.onreadystatechange=function(){
				
			}
			return true;
		}
		_Gax.status=ERROR;
		_Gax.args.reason="Does not support this method : "+Method+" !";
		_Gax.args.url=_Gax.url;
		_Gax.args.data=_Gax.data;
		return false;
	}
	
	var finish=function(){
		if(_Gax.status===PENDING)return;
		if(_Gax.status===SUCCESS){
			while(fn=_Gax.successQueue.shift()){
				fn.call(null,_Gax.resData,_Gax.args);
			}
		}else{
			while(fn=_Gax.errorQueue.shift()){
				fn.call(null,_Gax.args);
			}
		}
	}
	
	Gax.prototype.baseAjaxRequest=function(){
		if(window.XMLHttpRequest){
			this.xhr=new XMLHttpRequest();
		}else{
			try{
				this.xhr=new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					this.xhr=new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					throw new TypeError('Unsupport XMLHttpRequest');
				}
			}
		}
		return this;
	}
	
	Gax.prototype.header=function(key,value){
		_Gax.headerQueue[key]=value;
		return this;
	}
	
	
	Gax.prototype.get=function(data){
		this.data=dataToUrl(data);
		if(this.isOrigin){
			var res=baseAjaxRequestMain("GET");
			if(!res){
				finish();
			}
		}
		return this;
	}
	
	Gax.prototype.post=function(data){
		this.data=dataToUrl(data);
		if(this.isOrigin){
			var res=baseAjaxRequestMain("POST");
			if(!res){
				finish();
			}
		}
		return this;
	}
	
	
	Gax.prototype.success=function(fn){
		if(_Gax.status===PENDING){
			_Gax.successQueue.push(fn);
		}else if(_Gax.status===SUCCESS){
			fn.call(null,_Gax.resData,_Gax.args);
		}
		return this;
	}
	
	Gax.prototype.error=function(fn){
		if(_Gax.status===PENDING){
			_Gax.errorQueue.push(fn);
		}else if(_Gax.status===ERROR){
			fn.call(null,_Gax.args);
		}
		return this;
	}
	global.Gax=Gax;
})(this);
