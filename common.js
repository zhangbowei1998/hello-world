/**
 * @function xhrGet 
 *  
 * 利用xhr发送get请求;
 * 
 * xhrGet(url[,data],callback)  
 * 
 * url : 必选
 * data : 可选  => object 
 * callback : 必选
 * 
 */

function xhrGet(url,data){
    return new Promise((resolve,reject)=>{
      var xhr = new XMLHttpRequest();
      if(typeof data !== "function" && data instanceof Object){
            // 拼接字符串; 
            var _arr = [];
            for(var key in data){
                  _arr.push( `${key}=${data[key]}`)
            }     
            var _symbol = /\?/.test(url) ? "&" : "?";
            url += _symbol + _arr.join("&")
      }
      xhr.open("GET",url);
      xhr.send(null);
      xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200) 
            resolve(xhr.responseText);
      }
    })
}
/**
 * @function xhrPost
 */

function xhrPost(url,data){
      return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            var _data = [];
            for(let key in data){
                  _data.push(`${key}=${data[key]}`);
            }
            xhr.send(_data.join("&"));
            xhr.onload = function(){
                  xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.status);
            }
      })
}
/**
 * @function cookie 设置cookie功能;
 * 
 * 
 * @param {*} key 
 * @param {*} value 
 * @param {*} options 
 * 
 */

function cookie(key,value,options){

      typeof options === "object" ? Object.assign({},options) : options = {}; 

      var res = "";
      res += key + "=" + encodeURI(value);
      // 有没有过期时间;
      if(typeof options.expires === "number"){
            var d = new Date()
            d.setDate(d.getDate() + options.expires);
            res += ";expires="+d;
      }
      res += options.path ? ";path="+options.path : "";
      res += options.domain ? ";domain="+options.domain : "";

      document.cookie = res;
}
// path不同也代表两条不同的cookie;
function removeCookie(key,options){
      // 确保options一定是对象类型,同时可以配置默认参数;
      var default_options = {
            expires : -1
      };
      options = typeof options =="object" ? Object.assign(default_options,options) : default_options;
      cookie(key,null,options)
}

function getCookie(key){
      var _cookie = document.cookie;
      // "key=value; key2=value; key3=value";
      var _cookie_item = _cookie.split("; ");
      var _key = [];
      var _value = _cookie_item.map( item => {
            var _temp = item.split("=");
            _key.push(_temp[0]);
            return _temp[1];
      })
      var index = _key.indexOf(key);
      if(index !== -1){
            return _value[index];
      }
      return "";
}