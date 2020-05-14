/**
 * Created by flying0917 on 2018/5/15.
 * 每个回调函数都会返回一个对象resObj=
 * {
 * 是否可以调用滚动到底部（事件）
 *       canCallToBottom:true,
 *目前的页数
 *       page:1,
 *列表的dom
 *       listDom:null,
 * }
 */
/**
 * 下拉刷新
 */
(function(window) {
    'use strict';

    var pageListPullToRefresh = function (params,callback) {
        this.extend(this.params, params);
        this._init(callback);
    }
    var touchYDelta;
    var isLoading = false;
    var docElem = window.document.documentElement,
        loadWrapH,
        win = {width: window.innerWidth, height: window.innerHeight},
        winfactor= 0.2,
        translateVal,
        isMoved = false,
        firstTouchY, initialScroll;
    pageListPullToRefresh.prototype = {
        params: {
            container: document.querySelector('.refresh-content'),
            friction: 2.5,
            triggerDistance: 100,
            callback:false
        },
        //为了适应滚动条
        scrollDom:$(document),
        moveD:0,
        _init : function(callback) {
            var self = this;
            var loadingHtml = '<div class="pageList-refresh-load"><div class="pageList-refresh-pull-arrow"></div></div>';
            self.params.container.insertAdjacentHTML('afterbegin', loadingHtml);
            self.params.container.addEventListener('touchstart', function(ev){
                if(self.scrollDom.scrollTop()===0)
                {
                    self.touchStart(ev)
                }
            });
            self.params.container.addEventListener('touchmove', function(ev){
                if(self.scrollDom.scrollTop()===0)
                {
                    self.touchMove(ev)
                }
            });
            self.params.container.addEventListener('touchend', function(ev){
                if(self.scrollDom.scrollTop()===0)
                {
                    self.touchEnd(ev,callback);
                }
            });
        },
        touchStart : function(ev) {
            // this.params.container.classList.remove("refreshing");
            if (isLoading) {
                return;
            }
            isMoved = false;
            this.params.container.style.webkitTransitionDuration =
                this.params.container.style.transitionDuration = '0ms';
            touchYDelta = '';
            var touchobj = ev.changedTouches[0];
            // register first touch "y"
            firstTouchY = parseInt(touchobj.clientY);
            initialScroll = this.scrollY();
        },
        touchMove : function (ev) {
            var that=this;
            if (isLoading) {
                ev.preventDefault();
                return;
            }
            var self = this;
            var moving = function() {
                var touchobj = ev.changedTouches[0], // reference first touch point for this event
                    touchY = parseInt(touchobj.clientY);
                touchYDelta = touchY - firstTouchY;
                that.moveD=touchYDelta;
                if ( self.scrollY() === 0 && touchYDelta > 0  ) {
                    ev.preventDefault();
                }
                if ( initialScroll > 0 || self.scrollY() > 0 || self.scrollY() === 0 && touchYDelta < 0 ) {
                    firstTouchY = touchY;
                    return;
                }
                translateVal = Math.pow(touchYDelta, 0.85);
                self.params.container.style.webkitTransform = self.params.container.style.transform = 'translate3d(0, ' + translateVal + 'px, 0)';
                isMoved = true;
                if(touchYDelta > self.params.triggerDistance){
                    self.params.container.classList.add("pageList-refresh-pull-up");
                    self.params.container.classList.remove("pageList-refresh-pull-down");
                }else{
                    self.params.container.classList.add("pageList-fefresh-pull-down");
                    self.params.container.classList.remove("pageList-refresh-pull-up");
                }
            };
            this.throttle(moving(), 20);
        },
        touchEnd : function (ev,callback) {
            var self =this;
            if (isLoading|| !isMoved) {
                isMoved = false;
                return;
            }
            // 根据下拉高度判断是否加载
            if( touchYDelta >= this.params.triggerDistance) {
                isLoading = true; //正在加载中
                ev.preventDefault();
                this.params.container.style.webkitTransitionDuration =
                    this.params.container.style.transitionDuration = '300ms';
                this.params.container.style.webkitTransform =
                    this.params.container.style.transform = 'translate3d(0,60px,0)';
                document.querySelector(".pageList-refresh-pull-arrow").style.webkitTransitionDuration =
                    document.querySelector(".pageList-refresh-pull-arrow").style.transitionDuration = '0ms';
                self.params.container.classList.add("pageList-refreshing");
                if(callback){
                    callback({
                        status:"success"
                    });
                }
            }else{
                this.params.container.style.webkitTransitionDuration =
                    this.params.container.style.transitionDuration = '300ms';
                this.params.container.style.webkitTransform =
                    this.params.container.style.transform = 'translate3d(0,0,0)';
                if(callback){
                    callback({
                        status:"fail"
                    });
                }
            }
            isMoved = false;
            return;
        },
        cancelLoading : function () {
            var self =this;
            isLoading = false;
            self.params.container.classList.remove("pageList-refreshing");
            document.querySelector(".pageList-refresh-pull-arrow").style.webkitTransitionDuration =
                document.querySelector(".pageList-refresh-pull-arrow").style.transitionDuration = '300ms';
            this.params.container.style.webkitTransitionDuration =
                this.params.container.style.transitionDuration = '300ms';
            self.params.container.style.webkitTransform =
                self.params.container.style.transform = 'translate3d(0,0,0)';
            self.params.container.classList.remove("pageList-refresh-pull-up");
            self.params.container.classList.add("pageList-refresh-pull-down");
            return;
        },
        scrollY : function() {
            return window.pageYOffset || docElem.scrollTop;
        },
        throttle : function(fn, delay) {
            var allowSample = true;
            return function(e) {
                if (allowSample) {
                    allowSample = false;
                    setTimeout(function() { allowSample = true; }, delay);
                    fn(e);
                }
            };
        },
        winresize : function () {
            var resize = function() {
                win = {width: window.innerWidth, height: window.innerHeight};
            };
            throttle(resize(), 10);
        },
        extend: function(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }
    }
    window.pageListPullToRefresh = pageListPullToRefresh;

})(window);
var PageList=
    {
        resObj:
            {
                /*是否可以调用滚动到底部（事件）*/
                canCallToBottom:true,
                /*目前的页数*/
                page:1,
                /*列表的dom*/
                listDom:null,
            },

        /*替换函数*/
        sprintf:function(tpl,obj)
        {
            for(var x in obj)
            {
                var reg='/\{\{\%='+x+'\%\}\}/g';
                tpl=tpl.replace(eval(reg),obj[x]);
            }
            return tpl;
        },
        /*模板*/
        tpl:
        {
            content:function()
            {
                var tpl=(function(){/*
               <div class="pageList-refresh-content" >
                   <div class="pagelist-list-block" id="pagelist-list">

                   </div>
               </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
                return tpl;
            },
            pullLoadingImg:function()
            {
                var tpl=(function(){/*
                <style>
               .pageList-refreshing .pageList-refresh-pull-arrow{
                    background-image: url('{{%=loadingImg%}}');

                }
                </style>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
                return tpl;
            },
            loadingMoreBefore:function()
            {
                var tpl=(function(){/*
                <style>
               .pageList-loading_more:before
               {
                    display: inline-block; vertical-align:top;
                    content: ' '; height: 30px; width: 16px; margin-right: 6px;
                    background: url({{%=loadingImg%}}) no-repeat center;
                    -webkit-background-size: contain;
                    background-size: 80%;
               }
                </style>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
                return tpl;
            }
        },
        _init:function($obj,param)
        {
            var params=param,
                that=this;

            $obj.addClass("pageList-content").html(this.tpl.content);
            PageList.resObj.listDom=$("#"+params.listDomId);
            //调用初始化事件
            params.showloading();
            params.init(PageList.resObj);
            //下来刷新事件绑定
            var pullRefresh1 = new pageListPullToRefresh(
                {
                    container:$obj.find(".pageList-refresh-content").get(0), //下拉容器
                    triggerDistance: 100 //下拉高度
                },function(ret) {
                    PageList.hideLoading();
                    if (ret.status === "success")
                    {

                            params.showloading();
                            //刷新状态
                            setTimeout(function()
                            {
                                that.initPage();
                                pullRefresh1.cancelLoading();
                                params.pullRefreshDone(that.resObj);
                            },1000)

                    }
                });
            pullRefresh1.scrollDom=$obj;
            //是否滚动到底部事件监听
            var imgStyle=PageList.sprintf(PageList.tpl.loadingMoreBefore(),{loadingImg:params.loadingImg});
            if(params.pullLoadingImg)
            {
                imgStyle+=PageList.sprintf(PageList.tpl.pullLoadingImg(),{loadingImg:params.pullLoadingImg});
            }
            $("html").append(imgStyle);//更换加载图标
            this.isScrollDown($obj,function(ret)
            {
                if(ret===true)
                {
                      that.resObj.page++;
                      params.toBottomDone(that.resObj);
                }
            })
        },
        //是否滑动到底部
       isScrollDown:function(obj,cb)
       {
           var that=this;
           var callback=cb;
           // 上拉加载更多
           if($)
           {
               //给dom添加加载图标
               $(obj).find(".pageList-refresh-content").append('<div class="pageList-loading_more pageList-loading-more pageList-loading-hide"></div>');
               $(obj).on("scroll",function()
               {
                   var scrollTop = $(this).scrollTop();
                   var height = $(this).height();
                   var scrollHeight = $(this)[0].scrollHeight;
                   // 是否滑到底部


                   if (scrollTop >= scrollHeight - height)
                   {
                       if(that.resObj.canCallToBottom)
                       {
                           that.resObj.canCallToBottom=false;
                           that.showLoading();
                           callback(true);
                       }
                   }
                  /* else
                   {
                       /!*开锁*!/
                       that.resObj.canCallToBottom=true;
                   }*/
                   callback(false);

               });
           }
       },
        //初始化图标
        initLoading:function()
        {
            $(".pageList-loading-more").removeClass("pageList-no-more").addClass("pageList-loading_more").removeClass("pageList-loading-active").addClass("pageList-loading-hide");
        },
        //隐藏加载图标
        hideLoading:function()
        {
            this.resObj.canCallToBottom=true;
            $(".pageList-loading-more").removeClass("pageList-loading-active");

            $(".pageList-loading-more").addClass("pageList-loading-hide");
        },
        //显示加载图标
        showLoading:function()
        {

            $(".pageList-loading-more").removeClass("pageList-loading-hide").removeClass("pageList-no-more");

            $(".pageList-loading-more").addClass("pageList-loading_more").addClass("pageList-loading-active");
        },

        //完成加载
        finishLoading:function()
        {
            this.resObj.canCallToBottom=false;
            $(".pageList-loading-more").removeClass("pageList-loading_more");
            $(".pageList-loading-more").removeClass("pageList-loading-hide");
            $(".pageList-loading-more").removeClass("pageList-loading-active");
            $(".pageList-loading-more").addClass("pageList-no-more");

        },
        //刷新页面
        initPage:function()
        {
            this.hideLoading();
            this.resObj.listDom.html("");
            this.resObj.page=1;
        }
    };

$.fn.pageList=function(param)
{
    var $that=$(this),
        opt=$.extend({
            pullRefreshDone:function(){},//下拉完毕后调用事件
            toBottomDone:function(){},//滑动到底部后调用事件
            loadingImg:"./loading.gif",
            listDomId:"pagelist-list",
            pullLoadingImg:"",
            init:function(){},
            showloading:function(){},//定制显示加载中遮挡层
            hideloading:function(){},//定制关闭加载中遮挡层
        },param);
    PageList._init($that,opt);
};