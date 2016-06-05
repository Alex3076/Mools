/*
* GDebounce.js
* Object Name:gd
* Function Name:
* 1.debounce 防抖 @ gd.debounce(String UUID,Function callback,Number interval[,Bollean immediate:default=false[,Array DefaultData]])
* 2.throttle 节流 @ gd.throttle(String UUID,Function callback,Number interval[,Bollean immediate:default=false[,Array DefaultData]])
* */

(function(global,undefined){
    var Dqueue=[];
    var Tqueue=[];
    var gd={};
    var is=function(type,arg){
        return Object.prototype.toString.call(arg).toLowerCase()==="[object "+type+"]";
    }
    var init=function(){
        if(arguments.length<4){return false;}
        var isDebounce=!!arguments[0];
        var uuid=arguments[1];
        var callback=arguments[2];
        var interval=arguments[3];
        var immediate=false;
        var data=[];
        var dataIndex=4;
        var queue=isDebounce?Dqueue:Tqueue;
        var now=(new Date())|0;
        if(typeof uuid!=="string"){ return false; }
        if(!is("function",callback)){ return false; }
        if(typeof interval!=="number"){ return false; }

        if(arguments[4]!==null&& typeof arguments[4]==="boolean"){
            immediate=!!arguments[4];
            dataIndex++;
        }
        if(arguments[dataIndex]!==null&& is("array",arguments[dataIndex])){
            data=arguments[dataIndex];
        }
        if(queue[uuid]==null){
            queue[uuid]={
                start:now,
                skipTimes:0,
                tolTimes:0,
                callbacks:callback,
                interval:interval,
                immediate:immediate,
                timeout:null,
                data:data
            }
        }
        var obj=queue[uuid];
        if(now-obj.start>obj.interval || (obj.tolTimes===0&&obj.immediate)){
            obj.data.push(obj);
            obj.callbacks.apply(null,obj.data);
            obj.tolTimes++;
            obj.start=now;
        }else{
            obj.tolTimes++;
            if(isDebounce)obj.start=(new Date())|0;
            if(obj.timeout){
                clearTimeout(obj.timeout);
                obj.timeout=null;
                obj.skipTimes++;
            }
            if(!obj.immediate){
                obj.timeout=setTimeout(function(){
                    var now=(new Date())|0;
                    if(now-obj.start>obj.interval){
                        obj.data.push(obj);
                        obj.callbacks.apply(null,obj.data);
                        obj.start=now;
                        obj.skipTimes--;
                    }
                },obj.interval+1);
            }else{
                obj.skipTimes++;
            }
        }
    }
    gd.debounce=function(){
        arguments=[].slice.call(arguments);
        arguments.unshift(true);
        init.apply(this,arguments);
    }

    gd.throttle=function(){
        arguments=[].slice.call(arguments);
        arguments.unshift(false);
        init.apply(this,arguments);
    }
    global.gd=gd;

})(this);