/**
 * Created by Flying0917 on 2017/6/5.
 */
var TimeTree=
    {
        op:
            {
                sprinf:function()
                {
                    var str="";
                    if(arguments.length>0)
                    {
                        var html=arguments[0];
                        var paramArr=arguments[1];
                        for(var item in paramArr)
                        {
                            html=html.replace('%'+item+'%',paramArr[item]);
                        }
                    }
                    return html;
                }
            }
    }
/**
 * 时间轴插件
 * @method selectNewsShowMenu
 * @params param eg:[{type:'ok',title:'同意',detail：'you are so cool'},....]  type可以为 ok、not、wait、done
 * @return {[type]} [description]
 */
$.fn.timeTree=function(param)
{
    if(param&&param.length>0)
    {
        var content='<div class="time-tree-content"><div class="time-tree-items">%html%</div></div>';
        var str=""
        var item='<div class="time-tree-item">'+
                        '<div class="time-tree-item-content">'+
                            '<div class="time-tree-point f f-%type%">'+
                            '</div>'+
                            '<p>'+
                                '<span class="time-tree-title">%title%</span><br>'+
                                '<span class="time-tree-detail">%detail%</span>'+
                            '</p>'+
                        '</div>'+
                    '</div>';
        for(var i=0;i<param.length;i++)
        {
            str+=TimeTree.op.sprinf(item,param[i]);
        }
        content=TimeTree.op.sprinf(content,{html:str});
        $(this).html(content);
    }
}
