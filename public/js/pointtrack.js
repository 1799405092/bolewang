if ("undefined" == typeof trackPoints)
{
    var trackPoints = {};
}

window.onload = function (){
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src',"js/trackData.js");
    document.getElementsByTagName('head')[0].appendChild(js);
    $.each(trackPoints, function(i, n)
    {
        switch(n.trackType)
        {
            case '2':
                n = initTrackParams(i);
                setTimeout(function(){
                    n.requestFunc(n.rankParamsToStr(n.params, n.paramsRank));
                },2000);
                break;
            case '1':
                bindTrack(i);
                break;
            default:
                break;
        }
    });
    
    var accessLogParam = {
        trackType: '2',
        elementsStr: "",
        paramsRank: ["VerType", "webId", "logTime", "ip", "guid", "domain", "pageCode", "cusParam"],
        interfaceKeyword: "_trackPageView",
        params: {
            VerType: "3",
            webId: "2",
        },
        dealParamsBeforeEvent: function(params){
            params['logTime'] = new Date().getTime() + d_system_client_time;
            params['ip'] = trackConfig.ip;
            params['guid'] = trackConfig.guid;
            params['domain'] = trackConfig.domain;
            params['pageCode'] = $("#pageCode").length == 0 ? '19999' : $("#pageCode").val();
            params['cusParam'] = ["1", trackConfig.accountid, "51job_web", trackConfig.partner, trackConfig.islanding, trackConfig.refdomain].join(String.fromCharCode(22));
            return params;
        }
    }
    setTimeout(function(){
       n = initTrackParams(accessLogParam);
        accessLogParam.requestFunc(n.rankParamsToStr(n.params, n.paramsRank));
    },2000);
};

function manualTrack(trackName)
{
    var changeParams = arguments[1] ? arguments[1] : "";
    trackSettings = initTrackParams(trackName, changeParams);
    
    trackSettings.requestFunc(trackSettings.rankParamsToStr(trackSettings.dealParamsAfterEvent(trackSettings.params,this), trackSettings.paramsRank));
}

function bindTrack(trackName)
{
    var n = initTrackParams(trackName);
    $(n.elementsStr).each(function(){
        $(this).click(function(){
            n.requestFunc(n.rankParamsToStr(n.dealParamsAfterEvent(n.params,this), n.paramsRank));
        });
    });
}

function initTrackParams(trackName)
{
    var changeParams = arguments[1] ? arguments[1] : "";
    if(typeof trackName === "object")
    {
        trackSettings = trackName;
    }
    else
    {
        trackSettings = trackPoints[trackName];
    }
    
    if("undefined" == typeof trackSettings.dealParamsBeforeEvent)
    {
        trackSettings.dealParamsBeforeEvent = function(params){
            return params;
        }
    }
    if("undefined" == typeof trackSettings.dealParamsAfterEvent)
    {
        trackSettings.dealParamsAfterEvent = function(params){
            return params;
        }
    }
    if("undefined" == typeof trackSettings.requestFunc)
    {
        trackSettings.requestFunc = function(params){
            _tkd.push(params);
        }
    }
    if("undefined" == typeof trackSettings.rankParamsToStr)
    {
        if("undefined" == typeof trackSettings.interfaceKeyword)
        {
            trackSettings.interfaceKeyword = '_trackEvent';
        }
        
        switch(trackSettings.interfaceKeyword)
        {
            case '_trackPageView':
                trackSettings.rankParamsToStr = function(params, rankArr){
                    var paramsStr = "";
                    $.each(rankArr, function(i, n){
                        paramsStr += n + "=" + encodeURIComponent(params[n]) + "&";
                    });
                    return ['_trackPageView', paramsStr.substr(0, paramsStr.length - 1)];
                }
                break;
            default:
                trackSettings.rankParamsToStr = function(params, rankArr){
                    var paramsStr = "";
                    $.each(rankArr, function(i, n){
                        paramsStr += n + "=" + encodeURIComponent(params[n]) + "&";
                    });
                    return ['_trackEvent', paramsStr.substr(0, paramsStr.length - 1)];
                }
                break;
        }
    }
    
    trackSettings.params = trackSettings.dealParamsBeforeEvent(trackSettings.params);
    if(changeParams != "")
    {
        $.extend(trackSettings.params, changeParams);
    }
    return trackSettings;
}

