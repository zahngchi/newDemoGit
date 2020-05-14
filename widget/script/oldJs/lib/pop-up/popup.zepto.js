/**
 * Created by flying0917 on 2018/3/18.
 */
var Popup=
    {
        showPopUp:function(popContentClass)
        {
            if(popContentClass)
            {
                var $targetDom=$("."+popContentClass);
                //一半大小控制
                var half=$targetDom.hasClass("pop-up-half")?2:1;

                $targetDom.hasClass("pop-up-thrid")?half=1.5:"";

                if($targetDom.length>0)
                {
                    if($targetDom.hasClass("pop-up"))
                    {
                        //获取可视窗高度
                        var clientHeight=document.documentElement.clientHeight;
                        var clientWidth=$(document).width();
                        //往下
                        if($targetDom.hasClass("pop-move-up"))
                        {
                            $targetDom.css({"height":clientHeight/half+"px","width":clientWidth+"px","top":"-"+clientHeight/half+"px","left":"0"});
                            $targetDom.removeClass("pop-up-transition");
                            setTimeout(function()
                            {
                                $targetDom.addClass("pop-up-top");
                            },100);
                        }
                        else if($targetDom.hasClass("pop-move-down"))
                        {
                            $targetDom.css({"height":clientHeight/half+"px","width":clientWidth+"px","bottom":"-"+clientHeight/half+"px","left":"0"});
                            $targetDom.removeClass("pop-up-transition");
                            setTimeout(function()
                            {
                                $targetDom.addClass("pop-up-bottom");
                            },100);
                        }
                        else if($targetDom.hasClass("pop-move-left"))
                        {

                            $targetDom.css({"height":clientHeight+"px","width":clientWidth/half+"px","left":"-"+clientWidth/half+"px","top":"0"});
                            $targetDom.removeClass("pop-up-transition");
                            setTimeout(function()
                            {
                                $targetDom.addClass("pop-up-left");
                            },100);
                        }
                        else if($targetDom.hasClass("pop-move-right"))
                        {

                            $targetDom.css({"height":clientHeight+"px","width":clientWidth/half+"px","right":"-"+clientWidth/half+"px","top":"0"});
                            $targetDom.removeClass("pop-up-transition");
                            setTimeout(function()
                            {
                                $targetDom.addClass("pop-up-right");
                            },100);
                        }
                    }
                }
            }
        },
        hiddenPopUp:function(popContentClass)
        {
            if (popContentClass)
            {
                var $targetDom=$("."+popContentClass);
                if($targetDom.length>0)
                {
                    if($targetDom.hasClass("pop-up-top"))
                    {
                        $targetDom.addClass("pop-up-transition");
                        setTimeout(function(){
                            $targetDom.removeClass("pop-up-top");
                        },100)

                    }
                    if($targetDom.hasClass("pop-up-bottom"))
                    {
                        $targetDom.addClass("pop-up-transition");
                        setTimeout(function(){
                            $targetDom.removeClass("pop-up-bottom");
                        },100)
                    }
                    if($targetDom.hasClass("pop-up-left"))
                    {
                        $targetDom.addClass("pop-up-transition");
                        setTimeout(function(){
                            $targetDom.removeClass("pop-up-left");
                        },100)
                    }
                    if($targetDom.hasClass("pop-up-right"))
                    {
                        $targetDom.addClass("pop-up-transition");
                        setTimeout(function(){
                            $targetDom.removeClass("pop-up-right");
                        },100)
                    }
                }
            }
        },
        init:function()
        {
            var that=this;
            $(document).on("click","[data-pop-up]",function()
            {
                var popContentClass=$(this).attr("data-pop-up")?$(this).attr("data-pop-up"):"";
                that.showPopUp(popContentClass);
            });
            $(document).on("click",".pop-up-close",function()
            {
                var $that=$(this);
                var popContentClass=$that.attr("data-pop-up-close");
                that.hiddenPopUp(popContentClass);
            });
        }
    };
