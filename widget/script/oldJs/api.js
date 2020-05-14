/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */

(function(window){
    var u = {};
   u.defaultIp = 'http://192.168.51.231:8090/';
   //公司10服务器
  //  u.defaultIp = 'http://10.200.55.6:8090/';
   //客户正式服务器地址
   // u.defaultIp = 'http://ma23092218.iok.la:31786/pc_test/';
   //公司10服务器花生壳穿透地址


    //是否打开推送
    u.isPush=true;
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function(){
        var ls = window.localStorage;
        if(isAndroid){
           ls = os.localStorage();
        }
        return ls;
    };
    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof(data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof(fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }

    //打开附件下载管理
    u.openDownManger=function(url,cb)
    {
        downloadManager = api.require('downloadManager'),
            callback=cb;
        if(downloadManager)
        {
            downloadManager.openManagerView({
                title: '下载管理'
            }, function(ret, err) {
                    callback(ret,err);
            });
        }
    };

    //开始在下载管理器中下载文件
    u.startDownManger=function(url,filename)
    {
        if(downloadManager)
        {
            downloadManager.enqueue({
                url: url,
                savePath: 'fs://downmanger/'+filename,
                cache: true,
                allowResume: true,
                title: filename,
                networkTypes: 'all'
            }, function(ret, err) {
                if (ret) {
                    console.log(JSON.stringify(ret));
                } else {
                    console.log(JSON.stringify(err));
                }
            });
        }
    };

    /*设置配置*/
    u.setConfig=function(config)
    {
        this.setStorage("config",config);
    };
    /*获取目前选中的ip*/
    u.getIp=function()
    {
      //  var config=this.getConfig();
      //   config.index=config.index?config.index:0;
      //   var cip=config.ip[config.index].value;
      //   this.setStorage(config);
       return this.defaultIp;
    };
    /*获取配置*/
    u.getConfig=function()
    {
        if(this.getStorage("config"))
        {
            return this.getStorage("config");
        }
        else
        {
            var config={
                ip:[
                    {
                        name:"默认项",
                        value:this.defaultIp
                    },
                    {
                        name:"",
                        value:""
                    },
                    {
                        name:"",
                        value:""
                    }],
                index:0
            };
            this.setConfig(config);
            return this.getConfig();
        }
    };

    u.getUid = function(){
        return api.getPrefs({sync:true,key:'logininfo'});/*
        var uid = api.getPrefs({sync:true,key:'logininfo'});
        if(uid == ''){
            api.openWin({
                name: 'login',
                url: api.wgtRootDir + '/html/login.html',
                pageParam: {}
            });
            return that.getUid();
        }
        else{
            return uid;
        }*/
    };
    u.trim = function(str){
        if(String.prototype.trim){
            return str == null ? "" : String.prototype.trim.call(str);
        }else{
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function(str){
        return str.replace(/\s*/g,'');
    };
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function(obj){
        if(Array.isArray){
            return Array.isArray(obj);
        }else{
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    //判断app两版本大小·
    u.shouldUpdate=function(nowversion,newestversion)
    {
        nowversion=nowversion.split(".");
        newestversion=newestversion.split(".");
        if(parseInt(nowversion[0])<parseInt(newestversion[0]))
        {
            return true;
        }
        if(parseInt(nowversion[0])==parseInt(newestversion[0]))
        {
            if(parseInt(nowversion[1])<parseInt(newestversion[1]))
            {
                return true;
            }
            if(parseInt(nowversion[1])==parseInt(newestversion[1]))
            {
                if(parseInt(nowversion[2])<parseInt(newestversion[2]))
                {
                    return true;
                }
            }
        }
        return false;
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isEqualNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.removeCls(el, cls);
            }else{
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }

    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function(key, value){
        if(arguments.length === 2){
            var v = value;
            if(typeof v == 'object'){
                v = JSON.stringify(v);
                v = 'obj-'+ v;
            }else{
                v = 'str-'+ v;
            }
            var ls = uzStorage();
            if(ls){
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function(key){
        var ls = uzStorage();
        if(ls){
            var v = ls.getItem(key);
            if(!v){return;}
            if(v.indexOf('obj-') === 0){
                v = v.slice(4);
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0){
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function(key){
        var ls = uzStorage();
        if(ls && key){
            ls.removeItem(key);
        }
    };
    u.clearStorage = function(){
        var ls = uzStorage();
        if(ls){
            ls.clear();
        }
    };


    /*by king*/
    u.fixIos7Bar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV,10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if(sysType == 'ios'){
            u.fixIos7Bar(el);
        }else if(sysType == 'android'){
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if(ver >= 4.4){
                el.style.paddingTop = '25px';
            }
        }
    };
    u.toast = function(title, text, time){
        var opts = {};
        var show = function(opts, time){
            api.showProgress(opts);
            setTimeout(function(){
                api.hideProgress();
            },time);
        };
        if(arguments.length === 1){
            var time = time || 500;
            if(typeof title === 'number'){
                time = title;
            }else{
                opts.title = title+'';
            }
            show(opts, time);
        }else if(arguments.length === 2){
            var time = time || 500;
            var text = text;
            if(typeof text === "number"){
                var tmp = text;
                time = tmp;
                text = null;
            }
            if(title){
                opts.title = title;
            }
            if(text){
                opts.text = text;
            }
            show(opts, time);
        }
        if(title){
            opts.title = title;
        }
        if(text){
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function(/*url,data,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'json';
        }
        json.method = 'post';
        api.ajax(json,
            function(ret,err){
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };
    u.get = function(/*url,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json,
            function(ret,err){
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };

/*end*/

    u.islogin = function(){
        //登陆判断

            api.getPrefs({
                key: 'logininfo'
            }, function (ret, err) {
                var val = ret.value;
                if (val && val != "") {
                } else {
                    api.openWin({
                        name: 'login',
                        url: './html/login.html',
                        slidBackEnabled:false,
                        pageParam: {}
                    });
                }
            });
    };

    u.countChar =  function (t,max_l){
        // 获取textarea
        var zs_box=document.getElementById(t);

        // 获取输入文字的实际长度
        var jmz = {};
        jmz.GetLength = function(str) {
            ///<summary>获得字符串实际长度，中文2，英文1</summary>
            ///<param name="str">要获得长度的字符串</param>
            var realLength = 0, len = str.length, charCode = -1;
            for (var i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        };
        var zs_box_l=jmz.GetLength(zs_box.value);
        if(zs_box_l>=0&&zs_box_l<=max_l)
            return zs_box_l;
        else{
            //alert('您输入的字符大于限定的，将被截断！');
            return zs_box_l;
        }
    };

    u.world_num =  function (t,max_l){
        if(!max_l) max_l=1000;
        /*var num=countChar(t,max_l);
         if(num>50){
         $("#"+t).val($("#"+t).val().substring(0,max_l));
         }else {
         $(".ziCount").text(num);
         }*/
        var  num=$("#"+t).val().length;
        if(num>max_l){
            $("#"+t).val($("#"+t).val().substring(0,max_l));
        }else{
            $(".ziCount").text(num);
        }
    };


        /*时间差*/
    u.diffTime =  function(startTime,endTime) {
        var startdate=new Date(startTime);
        var enddate=new Date(endTime);
        var leaveDays=0;
        if(startdate&&enddate)
        {
            leaveTime=enddate.getTime()-startdate.getTime();
            leaveDays=Math.floor(leaveTime/(24*3600*1000))
            var mTime=(leaveTime%(24*3600*1000))/(24*3600*1000);
            if(mTime>0.5)
            {
                leaveDays+=1;
            }
            else if(mTime>0&&mTime<=0.5)
            {
                leaveDays+=0.5;
            }
            return leaveDays;
        }
    };
    //时间戳转日期
    //2010年9月17日
    u.getDate=function(tm)
    {
        var tt="";
        var date=new Date(parseInt(tm) * 1000);
        var year=date.getFullYear();
        var month=parseInt(date.getMinutes())+1;
        var day=date.getDate();
        var hours=date.getHours()>=10?date.getHours():"0"+date.getHours();
        var minutes=date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
        var s=date.getSeconds()>=10?date.getSeconds():"0"+date.getSeconds();
        tt=year+"年"+month+"月"+day+"日"+" "+hours+":"+minutes+":"+s;
        return tt;
    };
    //获取缓存中的用户信息
    u.getUserInfo=function()
    {
        return $api.getStorage("userinfo");
    };

    //更新页面监听事件
    u.listen_reload=function()
    {
        //html页面a：
        api.addEventListener({
            name: 'reload'
        }, function(ret, err) {
            location.reload();
        });
    };
    //发送更新页面事件
    u.send_reload=function()
    {
        api.sendEvent({
            name: 'reload',
            extra: {}
        });
    };
    //删除推送
    u.listen_removePushListener=function()
    {
        if(jpush)
        {
            api.addEventListener({
                name: 'removePush'
            }, function(ret, err) {
                var param = {alias:"logout"};
                jpush.bindAliasAndTags(param,function(ret)
                {
                    var statusCode = ret.statusCode;
                });
                jpush.removeListener();
            });
        }

    };
    //call removePushListenser-----^
    u.send_removePushListener=function()
    {

        api.sendEvent({
            name: 'removePush',
            extra: {}
        });
    };

    //节流
    u.throttle = function(fn, interval) { //fn为要执行的函数，interval为延迟时间
        var _self = fn,  //保存需要被延迟执行的函数引用
            timer,  //定时器
            firstTime = true;  //是否第一次调用
        return function() { //返回一个函数，形成闭包，持久化变量
            var args = arguments, //缓存变量
                _me = this;
            if(firstTime) { //如果是第一次调用，不用延迟执行
                _self.apply(_me, args);
                return firstTime = false;
            }
            if(timer) { //如果定时器还在，说明上一次延迟执行还没有完成
                return false;
            }
            timer = setTimeout(function() { //延迟一段时间执行
                clearTimeout(timer);
                timer = null;
                _self.apply(_me, args);
            }, interval || 500);
        };
    };
    //是否滑动到底部
    u.isScrollDown=function(obj,cb)
    {
        var that=this;
        var callback=cb;
        // 上拉加载更多
        if($)
        {
            //给dom添加加载图标
            $(obj).append('<div class="loading_more loading-more text-center loading-hide"></div>');

            $(obj).off("scroll").on("scroll",that.throttle(function()
            {
                var scrollTop = $(this).scrollTop();
                var height = $(this).height();
                var scrollHeight = $(this)[0].scrollHeight;
                // 是否滑到底部
                if (scrollTop >= scrollHeight - height) {
                    that.showLoading();
                    callback(true);

                }
                callback(false);

            }));
        }
    };
    //初始化图标
    u.initLoading=function()
    {
        $(".loading-more").removeClass("no-more").addClass("loading_more").removeClass("loading-active").addClass("loading-hide");
    }
    //隐藏加载图标
    u.hideLoading=function()
    {
        $(".loading-more").removeClass("loading-active");

        $(".loading-more").addClass("loading-hide");
    };
    //显示加载图标
    u.showLoading=function()
    {
        $(".loading-more").removeClass("loading-hide");

        $(".loading-more").addClass("loading-active");
    };

    //完成加载
    u.finishLoading=function()
    {
        $(".loading-more").removeClass("loading_more");
        $(".loading-more").removeClass("loading-hide");
        $(".loading-more").removeClass("loading-active");
        $(".loading-more").addClass("no-more");

    };
    u.setCookie=function(name, value, seconds)
    {

            seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
            var expires = "";
            if (seconds != 0 ) {      //设置cookie生存时间
                var date = new Date();
                date.setTime(date.getTime()+(seconds*1000));
                expires = "; expires="+date.toGMTString();
            }
            document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
    };
    u.initNtko=function()
    {
            // 启用DeepLinks
            if(typeof Office==='undefined')
            {
                alert("请安装ntko插件");
            }
            else
            {
                Office.enabledDeepLinks();
            }

    };

    u.openImg=function()
    {

    }

    //打开word文档
    u.openWord=function(k,a)
    {
        var attachmentId = a,key =k;
        var requestUrl = Quickos.api.url('workflow/office/NTKO_download',{key:key,attachmentId:attachmentId});
        Quickos.api.get(requestUrl,function(ret,err){
            if(ret && ret.isSuccess) {
                var word = Office.newWordDocument();
                word.fileName = "files";
                word.downloadURL = ret.data.downloadUrl;
                word.uploadURL = Quickos.api.url('workflow/mobile/NTKO_Upload',{key:key,attachmentId:attachmentId});
//                word.uploadURL = "http://121.201.91.165:6889/appapi.php?r=workflow/office/NTKO_Upload&key=cnVuaWQ9MTY0NSZmbG93aWQ9MzUmcHJvY2Vzc2lkPTEmZmxvd3Byb2Nlc3M9MSZ0eXBlPTE&attachmentId=155";
//                word.uploadURL = "http://www.ntko.com:1986/mobileoffice/servlet/UploadServlet?filename=201703131703.doc&filetype=doc";
//                alert(word.uploadURL);
                var config = Office.newWordDocumentConfig();
                config.openInEditMode = ret.data.editable;
                config.username = ret.data.username;
                config.enableHandWrite = true;
                config.enableRevision = true;
                config.enableCopy = true;
                config.enableEditComment = true;
                config.enablePrint = true;
                config.enableSaveAs = true;
                config.enableSendMail = true;
                config.enableShare = true;
                config.enableExportToPDF = true;
                word.config = config;

                // 打开服务器文档
                Office.openWordFromURL(word);
            }else{
                alert(JSON.stringify(ret));
                alert(JSON.stringify(err));
            }
        });
    };
    //打开pdf
    u.openPdf=function(k,a)
    {
        var key=k,attachmentId=a;
        var requestUrl = Quickos.api.url('workflow/office/NTKO_download',{key:key,attachmentId:attachmentId});
        Quickos.api.get(requestUrl,function(ret,err){
            if(ret && ret.isSuccess) {
                var pdf = Office.newPDFDocument();
                pdf.fileName = "pdf";
                pdf.downloadURL = ret.data.downloadUrl;
                pdf.uploadURL = Quickos.api.url('workflow/mobile/NTKO_Upload',{key:key,attachmentId:attachmentId});

                var config = Office.newPDFDocumentConfig();
                config.username = ret.data.username;// 用户名称
                // 打开手写笔功能
                config.usePenMode = true;

                // 配置文档属性
                config.enableEdit = ret.data.editable;
                config.enableCopy = true;
                config.enablePrint = true;
                config.enableSaveAs = true;
                config.enableShareAndSendMail = true;

                // 设置文档属性
                pdf.config = config;

                // 打开服务器文档
                Office.openPDFFromURL(pdf);
            }else{
                alert(JSON.stringify(ret));
                alert(JSON.stringify(err));
            }
        });
    };
    u.selectImgOrCamera=function(type,cb)
    {

            if(type)
            {
                api.getPicture(
                    {
                        sourceType: type,
                        encodingType: 'jpg',
                        mediaValue: 'pic',
                        destinationType: 'url',
                        allowEdit: true,
                        quality: 100,
                        saveToPhotoAlbum: false
                    },
                    function(ret, err)
                    {
                        if (ret)
                        {
                            if(ret.data)
                            {
                                cb(ret.data);
                            }
                        }
                        else
                        {
                            //alert(JSON.stringify(err));
                        }
                    });
            }
    };
    //通过后缀获取文件类型
    u.getFileTypeAndName=function(name)
    {
        var typeArr=name.split(".");
        var nameArr=name.split("/");
        return {filetype:typeArr[typeArr.length-1],filename:nameArr[nameArr.length-1]};
    };
    //选择上传文件
    u.selectUploadFile=function(cb)
    {
        var that=this;
        var callback=cb;
            var buttons1 = [
                {
                    text: '请选择附件',
                    label: true
                },
                {
                    text: '图片',
                    bold: true,
                    color: 'warning',
                    onClick: function()
                    {
                        that.selectImgOrCamera("album",function(data)
                        {
                            callback(data);
                        });
                    }
                },
                {
                    text: '拍照',
                    onClick: function()
                    {
                        that.selectImgOrCamera("camera",function(data)
                        {
                            callback(data);
                        });
                    }
                },
                {
                    text: '文件',
                    onClick: function()
                    {
                        //getAtt();
                        var fileBrowser = api.require('fileBrowser');
                        fileBrowser.open(function(ret, err) {
                            if (ret) {
                                fileBrowser.close();

                                callback(ret.url);

                            } else {
                            }
                        });
                    }
                }
            ];
            var buttons2 =
                [
                    {
                        text: '取消',
                        bg: 'danger'
                    }
                ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
    };
    //删除字符串 eg: 2,3,4 中对应的值
    u.removeItemFromStr=function(lStr,removeStr)
    {
        var lStrArr=lStr.split(",");
         for(var x in lStrArr)
         {
             if(removeStr==lStrArr[x])
             {
                 lStrArr.splice(x,1);
             }
         }
         return lStrArr.join(",");

    };
    //处理form表单

    u.handleFormData=function(data)
    {
        var postData={};
        for (var x in data)
        {
            postData[data[x].name]=data[x].value;
        }
        return postData;
    }

    u.baseUrl = u.getIp();
    u.pushAliasToken={};
    //极光别名
    u.pushAliasToken[u.baseUrl]= 'ea7ad35e9000ce4133_oa';
    //公司名
    u.company = '移动oa';
    //接口的顶级ip
    u.AppUrl = u.baseUrl + '/appapi.php';
    //附件存储路径
    u.attachUrl = u.baseUrl + '/data/attachment/';

    //下载附件

    u.downloadAttach=function(dataUrl,filename)
    {
        var saveroot = "fs://ghj/download/" +filename;
        api.toast({msg : '文件正在下载中，请稍等'});
        api.download({
            url : dataUrl,
            allowResume : true,
            savePath : saveroot
        }, function(ret, err) {
            if(ret.state===1)
            {
                api.toast({
                    msg:"下载成功,文件放在"+ret.savePath,
                    duration:4000
                });
            }
        });
    };
    //下载附件并打开附件
    u.fileDownload = function(dataUrl,filename) {
		if(dataUrl=="undefined"){
        	api.toast({msg : '暂无查看权限'});
        	return false;
        }
        var saveroot = "fs://ghj/download/" +filename;
        api.toast({msg : '文件打开中，请稍等'});
        api.download({
            url : dataUrl,
            //report : true,
            allowResume : true,
            savePath : saveroot
        }, function(ret, err){
            //alert("DOWNLOAD RET:"+JSON.stringify(ret));

            if(ret.state === 1){
                rt = ret.savePath;
                //alert(rt);
                var docReader = api.require('docReader');
                docReader.open({
                    path: rt
                }, function(oret, oerr) {
                    //if (ret.status) {
                    //alert("OPEN RET:"+JSON.stringify(oret));
                    //} else {
                    //alert("OPEN ERR:"+JSON.stringify(oerr));
                    //}
                    if(!ret.status){
                        //api.toast({msg:'打开附件失败'});
                    }
                });
            }else{
                console.log("DOWNLOAD ERR:"+JSON.stringify(err)+"\nRET:"+ret.statusCode+ret.msg);
            }

        })
    };
    //打开附件ntko(待集成)
    u.openAttchFile=function(aid,filetype,downurl,filename)
    {
        if(api.pageParam.key)
        {
            var key=api.pageParam.key;
            if(api.systemType==="android")
            {
                if(filetype==='doc'||filetype==='docx')
                {
                    this.initNtko();
                    this.openWord(key,aid);
                }
                if(filetype==='pdf')
                {
                    this.initNtko();
                    this.openPdf(key,aid);
                }
                if(filetype==='png'||filetype==='jpg')
                {
                    this.fileDownload(downurl,filename);
                }
            }
            else if(api.systemType==='ios')
            {
                this.fileDownload(downurl,filename);
            }
        }
    };
    //动态添加js
    u.loadJs=function(url)
    {
        document.write('<script src="'+url+'" type="text/javascript"></script>');
    };
    //动态添加css文件
    u.loadStyles=function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };
    //常用语
    u.openSelectPhrasebook=function(target)
    {
        targetPhrasebook=target;
        api.openWin({
            name:"phrasebook-list",
            url:"./phrasebook-list.html",
            pageParam:{
                type:"select"
            }
        });
    };
    //监听当前页面跳转到目标页面
    /*u.listen_openTargetHtml=function(type,url,data)
    {
        api.addEventListener({
            name: "target"+type
        }, function(ret, err) {
            api.openWin(
                {
                    name:url,
                    url:url,
                    pageParams:data
                });
        });
    };
    //调用openTargetHtml事件
    u.send_openTargetHtml=function()
    {

    };*/
    window.$api = u;

})(window);
