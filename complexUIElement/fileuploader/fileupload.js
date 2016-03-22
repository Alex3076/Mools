/*FileUpload v0.1.0 Author by echosoar | welcome to http://iwenku.net | https://github.com/echosoar  */
(function(obj){
	var data;
	var tolsize=0;
	var everysize=50000;//50k per upload
	var nowsize=0;
	var upload=function(url,form,options){
		if(url==null||form==null){
			return false;
		}
		if(window.FileReader=="undefined"){
			return false;
		}
		options=options||{};
		options.onload=options.onload||function(){};
		options.onprogress=options.onprogress||function(){};
		options.onerror=options.onerror||function(){};
		var file=form.files[0];
		var  reader  =  new  FileReader();    
        reader.readAsBinaryString(file);
        reader.onload=function(e){
           data=base64(e.target.result);
		   tolsize=data.length;
		   ajaxUp(url,options);
        }
		
	}
	function ajaxUp(url,options){
		var httpReq;
        if(window.XMLHttpRequest){
            httpReq=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                httpReq=new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                    httpReq=new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){
                    return false;
                }
            }
        }
        httpreq.onreadystatechange=function(){
            if(httpreq.readyState == 4){  
                if(httpreq.status == 200){  
					nowsize+=everysize;
						options.onprogress(nowsize,tolsize);
						if(nowsize<tolsize){
							ajaxUp(url,options);
						}else{
							options.onload(httpreq.responseText);
						}
                }else{  
                    options.onerror(httpreq.readyState,httpreq.status);
                }  
            }else{  
                options.onerror(httpreq.readyState,httpreq.status);
            }
        }
        httpreq.open("POST",url,true);  
        httpreq.send("name="+data.slice(nowsize,nowsize+everysize));
	}
	function base64(str){
		var  c1,  c2,  c3;
		var  base64EncodeChars  =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                            
		var  i  =  0,  len=  str.length,  string  =  "";
		while  (i  <  len){
			c1  =  str.charCodeAt(i++)  &  0xff;
			if  (i  ==  len){
				string  +=  base64EncodeChars.charAt(c1  >>  2);
				string  +=  base64EncodeChars.charAt((c1  &  0x3)  <<  4);
				string  +=  "==";
				break;
			}
			c2  =  str.charCodeAt(i++);
			if  (i  ==  len){
				string  +=  base64EncodeChars.charAt(c1  >>  2);
				string  +=  base64EncodeChars.charAt(((c1  &  0x3)  <<  4)  |  ((c2  &  0xF0)  >>  4));
				string  +=  base64EncodeChars.charAt((c2  &  0xF)  <<  2);
				string  +=  "=";
				break;
			}
			c3  =  str.charCodeAt(i++);
			string  +=  base64EncodeChars.charAt(c1  >>  2);
			string  +=  base64EncodeChars.charAt(((c1  &  0x3)  <<  4)  |  ((c2  &  0xF0)  >>  4));
			string  +=  base64EncodeChars.charAt(((c2  &  0xF)  <<  2)  |  ((c3  &  0xC0)  >>  6));
			string  +=  base64EncodeChars.charAt(c3  &  0x3F);
		}
		return  string;
	}
	obj.upload=upload;
})(this)