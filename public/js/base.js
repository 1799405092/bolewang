//地区选择
(function(){var a=function(d,h){
    var c=function(){if(typeof h==="function"){h()}};
    if(typeof(d)=="string"){d+="?"+$_CONFIG.refresh_js[d];d=$_CONFIG.jspath+"/"+d;
    if($('script[src="'+d+'"]').length!=1){
        var f=document.getElementsByTagName("head")[0],g=document.createElement("script");g.setAttribute("type","text/javascript");g.setAttribute("src",d);
        f.appendChild(g)
    }
        if(g){g.onload=function(){c()}}else{c()}}else{var b=0;
            for(var e in d){d[e]+="?"+$_CONFIG.refresh_js[d[e]];d[e]=$_CONFIG.jspath+"/"+d[e];if($('script[src="'+d[e]+'"]').length!=1){
                var f=document.getElementsByTagName("head")[0],g=document.createElement("script");g.setAttribute("type","text/javascript");g.setAttribute("src",d[e]);
                 //f.appendChild(g);
                if(g){g.onload=function(){b++;if(b==d.length){c()}}}}else{b++;if(b==d.length){c()}}}}};
                if(Zepto){$.getScript=a}
            })();
                var ajaxRequest=function(url){var params=arguments[1]?arguments[1]:{};
                var method=arguments[2]?arguments[2]:"post";method=method!="post"&&method!="get"?"post":method;
                var datatype=arguments[3]?arguments[3]:"json";
                var result={};$.ajax({type:method,url:url,data:params,async:false,dataType:datatype,success:function(ret_data){switch(datatype){
                    case"text":result=ret_data;break;default:result=eval(ret_data);break}},error:function(XMLHttpRequest,textStatus,errorThrown){result=false}});return result};
                    var storage={isLocalStorage:(window.localStorage?true:false),set:function(a,b){
                        if(this.isLocalStorage){try{localStorage[a]=b}catch(c){return}}},get:function(a){if(this.isLocalStorage){return localStorage[a]}},del:function(a){if(this.isLocalStorage){localStorage.removeItem(a)}},clear:function(){if(this.isLocalStorage){localStorage.clear()}},json_set:function(a,b){if(this.isLocalStorage){try{localStorage[a]=JSON.stringify(b)}catch(c){return}}},json_get:function(a){if(this.isLocalStorage){var b=localStorage[a]?JSON.parse(localStorage[a]):"";return b}},display:function(){if(this.isLocalStorage){var b="";for(var a=0;a<localStorage.length;a++){key=localStorage.key(a);value=localStorage.getItem(key);b+="\nkey:"+key+" value:"+value}return b}}};var filterTitle=function(a){if(a.val()==a.attr("title")){return""}else{return a.val()}};var setLoc=function(h,f){var g={};g.areacode=$(h).attr("value");g.areaname=$(h).text();
            var a=ajaxRequest(f+"/ajax/in/location.ajax.php?areacode="+g.areacode+"&areaname="+g.areaname);
            if(a.status==0){pop.ini({msg:"地区选择失败，请重试"},{title:"确定"});return false}storage.json_set("location",g);var e=$_CONFIG.template;if("search/joblist"==e){var b=window.location.href;var d=b;if(-1!=b.indexOf("?")){b=b.split("?");b[1]=b[1].split("&");d=b[0];for(var c=0;c<b[1].length;c++){if(-1!=b[1][c].indexOf("sendjobid")||-1!=b[1][c].indexOf("applytype")){continue}if(-1!=b[1][c].indexOf("jobarea")){b[1][c]="jobarea="+g.areacode}if(-1!=b[1][c].indexOf("pageno")){b[1][c]="pageno=1"}if(-1!=b[1][c].indexOf("landmark")){b[1][c]="";$("input[name='landmark']").val("")}if(-1!=b[1][c].indexOf("_t")){b[1][c]=""}if(b[1][c]!=""){if(0==c){d+="?"+b[1][c]}else{d+="&"+b[1][c]}}}}else{d+="?jobarea="+g.areacode}location.href=d;return false}else{if("index"==e){location.href=$_CONFIG.domain;return false}else{$(".city").text(g.areaname)}}pclose();scrollTo(0,0);window.location.reload()};function getCookie(b){var a,c=new RegExp("(^| )"+b+"=([^;]*)(;|$)");if(a=document.cookie.match(c)){return unescape(a[2])}else{return null}}
             $(function(){$("#city").click(function(){var a=["datadict.js","dd/hotcityall.js","dd/jobarea.js"];$.getScript(a,function(){setPage("barea","area","","",0,0,"",1)})});$("a[tracetag],span[tracetag],i[tracetag]").click(function(){var b=$(this).attr("tracetag");var c=$(this).attr("msg")?$(this).attr("msg"):"";if(b!=""){var a=$_CONFIG.domain+"/ajax/my/writelog.ajax.php?jsoncallback=?&tracetag="+b;if(c!=""){a+="&msg="+c}$.getJSON(a)}})});function ready(){if(window.__wxjs_environment==="miniprogram"){}else{var c=getCookie("wxmini");if(c=="51mdd_wxapp"){var b=$_CONFIG.domain+"/ajax/my/clearminicookie.ajax.php?";var a=ajaxRequest(b);if(a.status==1){location.reload();return false}}}}if(!window.WeixinJSBridge||!WeixinJSBridge.invoke){document.addEventListener("WeixinJSBridgeReady",ready,false)}else{ready()};