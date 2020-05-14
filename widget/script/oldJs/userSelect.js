/**
 * Created by flying0917 on 2017/5/23.
 */
$.fn.userSelect=function(args,callback)
{
    var isMul=$(this).attr("data-single")==="0"?1:0;
    var opts=$.extend(
        {
            mul:isMul,//是否可多选
            type:"user",
            depUrl:Quickos.api.url('mobile/department/getdeptList'),
            userUrl:Quickos.api.url('mobile/contacts/getContactsList'),
            defaultUser:[]
        },args);
    var userSelectObj=
        {
            //render 部门
            renderDepartment:function(obj,data)
            {
                var that=this;
                var str="",activeClass="";
                for(var it in data)
                {
                    var selectedObj=$(".selected-data li[id^='dep']");
                    activeClass="";
                    if($(".selected-data #dep"+it).length>0)
                    {
                        activeClass="user-active";
                    }
                    str+="<li class='userSelect-department "+activeClass+"' data-depid='"+data[it].deptid+"'>"+data[it].deptname+"</li>";
                }
                obj.append(str);
                $(".userSelect-department").click(function()
                {
                    if(opts.type=="user")
                    {
                        that.showUser($(this));
                    }
                    else if(opts.type=="department")
                    {
                        that.selectUser($(this));
                    }
                });
            },
            //render 部门人员
            renderUser:function(obj,data)
            {
                var that=this;
                obj.html("");
                var str="";
                data.forEach(function(item)
                {
                    var id=item.uid;
                    var liCount=$(".selected-data #user"+id).length;
                    var className="";
                    if(liCount>0)
                    {
                        className="user-active";
                    }
                    str+="<li class='"+className+" userSelect-user' data-id='"+id+"'>"+item.realname+"</li>";
                });
                obj.append(str);
                $(".userSelect-user").click(function()
                {
                    that.selectUser($(this))
                });

            },
            //展现部门人员
            showUser:function(obj)
            {
                var that=this;
                var $obj=obj;
                //获取部门
                var id=$obj.attr("data-depid");
                //部门高亮
                $(".select-content .department-content .department-data li").removeClass("department-active");
                $obj.addClass("department-active");
                var requestUrl="",params={};
                if(opts.type=="user")
                {
                    requestUrl=opts.userUrl;
                    params={deptid:id,uid:$api.getUid()};
                }
                else if (opts.type=="department")
                {
                    requestUrl=opts.depUrl;
                    params={uid:$api.getUid()};
                }
                //请求部门人员
                Quickos.api.post(requestUrl, params,function(ret)
                {
                    if(ret)
                    {
                        if(ret.isSuccess)
                        {
                            if(ret.data)
                            {
                                that.renderUser($(".user-data"),ret.data);
                            }
                        }
                    }
                })
            },
            //点击部门人员
            selectUser:function(obj)
            {
                var that=this;
                var $obj=obj,id="",type="",liCount=0,dataName="";
                if(opts.type=="user")
                {
                    id=$obj.attr("data-id");
                    type="user";
                    dataName="data-uid";
                }
                else if(opts.type=="department")
                {
                    id=$obj.attr("data-depid");
                    type="dep";
                    dataName="data-depid";
                }
                if(opts.mul||$(".selected-data li").length==0||$(".selected-data li").length==1)
                {
                    if($(".selected-data li").length==1&&!opts.mul)
                    {
                        $obj.removeClass("user-active");
                        $("#"+type+id).remove();
                    }
                    else
                    {
                        $obj.toggleClass("user-active");
                        if($obj.hasClass("user-active"))
                        {
                            liCount=$(".selected-data #"+type+id).length;
                            if(!liCount>0)
                            {
                                var str='<li id="'+type+id+'">'+$obj.text()+'<span class="userSelect-selectUser" '+dataName+'="'+id+'" style="margin-left:10px">X</span></li>';
                                $(".selected-data").append(str);
                                $(".userSelect-selectUser").click(function()
                                {
                                    that.removeUser($(this));
                                });
                            }

                        }
                        else
                        {
                            $("#"+type+id).remove();
                        }
                    }
                }
            },
            //点击选择
            selectOk:function(obj,callback)
            {
                $(".select-content").removeClass("select-content-active").addClass("select-content-close");
                var ret=[];
                $(".selected-data li").each(function()
                {
                    var i=$(this).attr("id");
                    i=i.replace('user','');
                    i=i.replace('dep','');
                    var text=$(this).text();
                    text=text.substr(0,text.length-1);
                    var t={};
                    if(opts.type=="user")
                    {
                        t={uid:i,realname:text};
                    }
                    else if(opts.type=="department")
                    {
                        t={depid:i,depname:text};
                    }
                    ret.push(t);
                });
                obj.attr("data-selected",JSON.stringify(ret));
                callback.call(obj,ret);
                var that=this;
                setTimeout(function()
                {
                    that.retrieve();
                },500);
            },
            //删除选择的人员
            removeUser:function(obj)
            {
                $obj=obj;
                $obj.parent().remove();
                var removeId=$obj.attr("data-uid");
                if(opts.type=="user")
                {
                    removeId=$obj.attr("data-uid");
                    $('[data-id="'+removeId+'"]').removeClass("user-active");
                }
                else if(opts.type=="department")
                {
                    removeId=$obj.attr("data-depid");
                    $('[data-depid="'+removeId+'"]').removeClass("user-active");
                }
            },
            //清除dom
            retrieve:function()
            {
                $(".select-content-bg").remove();
            }
        };
    var that=$(this);
    that.click(function()
    {
        var selectStr="";
        if($(this).attr("data-selected"))
        {
            var selectObj=JSON.parse($(this).attr("data-selected"));
            selectObj.forEach(function(obj)
            {
                var name="",id="",dataName="",dataValue="";
                if(opts.type=="department")
                {
                    name=obj.depname;
                    id="dep"+obj.depid;
                    dataName="data-depid";
                    dataValue=obj.depid;
                }
                else if(opts.type="user")
                {
                    name=obj.realname;
                    id="user"+obj.uid;
                    dataName="data-uid";
                    dataValue=obj.uid;
                }
                selectStr+='<li id="'+id+'">'+name+'<span class="userSelect-selectUser" '+dataName+'="'+dataValue+'">×</span></li>'
            });
        }

        var appendHtml='<div class="select-content-bg">' +
                            '<div class="select-content select-kill-maopao">'+
                                '<div class="select-header">'+
                                    '<div class="department-title select-item-title">部门</div>'+
                                    '<div class="user-title  select-item-title">人员</div>'+
                                    '<div class="select-title select-item-title select-user-btn">选择</div>'+
                                '</div>'+
                                '<div class="select-content-wrap">'+
                                    '<div class="item-content department-content">'+
                                        '<ul class="department-data">'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="item-content user-content">'+
                                        '<ul class="user-data">'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="item-content selected-content">'+
                                        '<ul class="selected-data">'+
                                        selectStr+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                             '</div>'+
                        '</div>';
        $("body").append(appendHtml);
        if(opts.type==="user"&&opts.defaultUser.length)
        {
            userSelectObj.renderUser($(".user-data"),opts.defaultUser);
        }

        $(".userSelect-selectUser").click(function()
        {
            userSelectObj.removeUser($(this));
        });
        $(".select-user-btn").click(function()
        {
            userSelectObj.selectOk(that,callback)
        });


        var uid=$api.getUid();
        var targetObj=$(".user-data");
        Quickos.api.post(opts.depUrl, {uid:uid},function(ret)
        {
            if(ret.status==0)
            {
                if(ret.data)
                {
                    if(opts.type=="department")
                    {
                        targetObj=$(".user-data");
                        $(".department-content").css({"display":"none"});
                        $(".selected-content").css({"width":"68%"});
                        $(".user-title").html("&nbsp;");
                    }
                    else if(opts.type=="user")
                    {
                        targetObj=$(".department-data");
                    }
                    userSelectObj.renderDepartment(targetObj,ret.data);
                }
            }
        })
        setTimeout(function()
        {
            $(".select-content").addClass("select-content-active");
        },300);
        //点击阴影取消active
        $(".select-content-bg").click(function()
        {
            $(".select-content").removeClass("select-content-active").addClass("select-content-close");
            setTimeout(function()
            {
                userSelectObj.retrieve();
            },500);
        });
        //去冒泡
        $(".select-kill-maopao").click(function(e)
        {
            e.stopPropagation();
        });
    });

}