/*弹出层*/
var Pickerup={
    //替换模板
    replaceTpl:function(tpl,obj)
    {
        for(var x in obj)
        {
            var reg='/\{\{\%='+x+'\%\}\}/g';
            tpl=tpl.replace(eval(reg),obj[x]);

        }
        return tpl;
    },
    //模板
    pickerContentTpl:function()
    {
        var tpl=(function(){/*
               <div class="jq-picker-content">
                    <div class="jq-picker-close">×</div>
                    <div class="jq-picker-ok">√</div>
                    <div class="jq-picker-tpl">{{%=tpl%}}</div>
                </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
        return tpl;
    }
}
$.fn.pickerup=function(args)
{
    var params=args;
    params=$.extend({
        tpl:''
    },params);

    $(this).click(function()
    {
        var contentTpl=Pickerup.pickerContentTpl();
        var tpl=params.tpl;
        var temStr=Pickerup.replaceTpl(contentTpl,{tpl:tpl});
        $("body").append(temStr);
        var top=$(".jq-picker-content").height();
        $(".jq-picker-content").css("bottom","-"+top+"px")
        setTimeout(function()
        {
            $(".jq-picker-content").css("display","block");
            setTimeout(function()
            {
                $(".jq-picker-content").css("bottom","0px");
            },100)
        },100);
    });
};