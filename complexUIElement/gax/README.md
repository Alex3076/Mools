#GAZ
***
通用Ajax，支持链式调用，跨域，POST和GET
###基本方法 Basic Method

#####构造方法 Gax(url)
> url : 请求的地址

> 此方法返回一个Gax对象。

```javascript
Gax("http://iwenku.net");
```
***
#####配置设置 set(key,value)
> key ：要设置配置选项的键

> value : 要设置配置选项的值

> 默认配置 ：返回内容类型（type），可设置为json、xml；超时时间（timeout），默认为0即没有超时；超时回调函数（ontimeout），默认为空函数；跨域方法（com），默认为jsonp，需要在服务器生成的内容中调用GaxJsonp方法。
