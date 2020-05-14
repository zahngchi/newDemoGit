/*
* ajax封装 处理返回和登陆状态等
* */
(function (window) {
    _API_SITE_ = $api.getIp()+'/appapi.php';
    var http_api = {};
    var app = {};
    var quickos = {};
    var retdebug =0;
    var errdebug =0;


    http_api.ajax = function (params, callback, allowGuest) {
//      console.log(params.url);
        allowGuest = allowGuest || false;
        params.returnAll = true;
        params.headers = {};
        params.cache = false;
        var that = this;
        params.data.values = $.extend({},params.data.values,{fromApp:true});
        api.ajax(params, function (ret, err) {
            //console.log("ret===="+JSON.stringify(ret))
            //console.log("err===="+JSON.stringify(err))
            if ('' != err && undefined != err) {

                if ( errdebug ) {
                    console.log("-----【AJAX ERR】-----" +
                        "\nURL: " + params.url +
                        "\nDATA" + JSON.stringify(params.data) +
                        "\nERR: " + JSON.stringify(err));
                }
                else {
                    if(err.statusCode===0)
                    {
                        if(api.winName!=="error")
                        {
                            var url="";
                            url=api.wgtRootDir+"/html/network-error.html";
//                          setTimeout(function()
//                          {
//                              api.openWin({
//                                  name:"error",
//                                  url:url
//                              });
//                              return false;
//                          },0)
                        }
                        else
                        {
                            api.closeWin();
                        }
                    }
                    else
                    {
                        if(api.winName==="error")
                        {
                            api.closeWin();
                        }
                    }

                   /* alert(JSON.stringify(err))*/
                    /*api.toast({
                        msg: '网络错误，请稍后重试',
                        duration: 10000,
                        location: 'bottom'
                    });*/
                }
                return false;
            }
//          console.log(JSON.stringify(err))
            if ( retdebug ) {
            //  console.log(JSON.stringify(ret));
                /*alert('----【Request】----: ' +
                    "\nUrl：" + params.url +
                    "\nParams：" + JSON.stringify(params.data) +
                    "\n" + '----RES----' +
                    "\nData：" + JSON.stringify(ret.body.data) +
                    "\nMsg：" + JSON.stringify(ret.body.msg) +
                    "\nStatus：" + JSON.stringify(ret.body.status)+
                    "\nisSuccess：" + JSON.stringify(ret.body.isSuccess)
                );*/
            }
            if ('' != ret) {
                    //有返回了 关闭网络错误页面吧
                 api.closeWin({
                     name:"error"
                 });
                 
                if (ret.body.error_code) {
                    switch (ret.body.error_code) {
                        case 403:
                            if (!allowGuest) {
                                setTimeout(function () {
                                    api.removePrefs({
                                        key: 'cookie'
                                    });
                                    $api.rmStorage("userinfo");
                                    $api.send_removePushListener();
                                    api.removePrefs({
                                        key: 'logininfo'
                                    });
                                    if(api.winName!=="login")
                                    {
                                        // api.openWin({
                                        //     name: 'login',
                                        //     url: api.wgtRootDir + '/html/login.html',
                                        //     slidBackEnabled: false,
                                        //     pageParam: {}
                                        // });
                                    }
                                }, 1000);
                            } else {
                                api.toast({
                                    msg: '登录超时',
                                    duration: 10000,
                                    location: 'bottom'
                                });
                            }
                            break;
                        default:
                            api.toast({
                                msg: '未知错误',
                                duration: 10000,
                                location: 'bottom'
                            });
                    }

                    return false;
                }
            }
            callback(ret.body, err);
        });
    };

    /**
     * GET Ajax
     * @param url
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.get = function (url, callback, allowGuest) {
        allowGuest = allowGuest || false;
//      console.log(JSON.stringify(url));
        var params = {
            url: url,
            method: 'get',
            dataType: 'json',
            data : {}
        };

        this.ajax(params, callback, allowGuest);
    };

    /**
     * POST Ajax
     * @param url
     * @param datas
     * @param callback
     * @param allowGuest 允许登录超时时不跳转
     */
    http_api.post = function (url, datas, callback, allowGuest) {
        allowGuest = allowGuest || false;
//      console.log(JSON.stringify(url));
        var params = {
            url: url,
            method: 'post',
            dataType: 'json',
            data: {
                values: datas
            }
        };
        this.ajax(params, callback, allowGuest);
    };

    /**
     * 生成API URL
     * @param route
     * @param param
     * @returns {string}
     */
    http_api.url = function (route, param) {
        route += "";
        if ((route).split("/").length !== 3) {
// 		$.error("app.url: 参数route错误");
        } else {
            param = param ? '&' + $.param(param) : '';
            return _API_SITE_ + "?r=" + route + param;
        }
    };

    app.logout = function () {
        Quickos.api.get(Quickos.api.url('mobile/default/logout'), function (ret, err) {
            if(ret)
            {
                $api.setCookie("PHPSESSIONID", "", -1);
                if(ret.isSuccess)
                {
                    api.removePrefs({
                        key: 'cookie'
                    });
                    $api.rmStorage("userinfo");
                    //$api.clearStorage();
                    api.removePrefs({
                        key: 'logininfo'
                    });
                    $api.send_removePushListener();
                    api.openWin({
                        name: 'login',
                        url: api.wgtRootDir + '/html/login.html',
                        slidBackEnabled: false,
                        pageParam: {}
                    });
                }
                else
                {
                    api.toast({
                        msg:ret.msg,
                        duration:1000
                    });
                }
            }

        });
    };

    http_api.attachUpload = function (file_path, module) {
        url = this.url('main/attach/upload');//user/info/uploadavatar
        this.ajax({
            data: {
                files: {
                    Filedata: file_path
                },
                values: {
                    module: module
                }
            },
            dataType: 'json',
            method: 'post',
            url: url
        }, function (ret, err) {
            if (ret) {
                //ret : icon,url,name,aid
                return ret;

            } else {
                return err;
            }


        });
    }
    quickos.app = app;
    quickos.api = http_api;

    window.Quickos = quickos;
})(window);
