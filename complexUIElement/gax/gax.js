;(function(global,undefined){
	var Gax=function(url){
		if(!(this instanceof Gax)){
			return new Gax(url);
		}
		this.url=url;
		
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
	
	var dataToUrl=function(){
		
	}
	
	Gax.prototype.get=function(data){
		console.log(this);
	}
	global.Gax=Gax;
})(this);