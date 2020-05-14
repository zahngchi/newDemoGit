//接口地址
var	host = 'http://192.168.51.231:8090/?r=';
//公司10服务器地址
 // var	host = 'http://10.200.55.6:8090/?r=';
//客户正式服地址
// var	host = 'http://ma23092218.iok.la:31786/pc_test/?r=';
//公司10服务器花生壳代理地址

//资源访问地址
var	host_ = 'http://192.168.51.231:8090/';
//公司10服务器地址
// var	host_ = 'http://10.200.55.6:8090/';
//客户正式服地址
// var	host_ = 'http://ma23092218.iok.la:31786/pc_test/';
//公司10服务器花生壳代理地址


//即时通讯
var ws_host = 'ws://192.168.51.231:8070';
//公司10服务器地址
 // var ws_host = 'ws://10.200.55.6:8070';
//客户正式服地址
// var ws_host = 'ws://ma23092218.iok.la:50021';
//公司10服务器花生壳代理地址

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            return false;
        }
    }else{
      return false;
    }
}

var ajaxArr=new Array();
function listenCloseAjax(right){
  var right = right ? right : function(){};
  api.addEventListener({
      name:'navitembtn'
  },function(ret, err){
    if(ret.type=="left"){
      ajaxArr.forEach(function(value){
//      console.log(123)
        value.abort();
      })
      api.closeWin();
    }else{

      right();
    }
  });
  api.addEventListener({
      name:"keyback"
  },function(ret,err){
    ajaxArr.forEach(function(value){
//    console.log(123)
      value.abort();
    })
    api.closeWin();
  });
}

$.ajaxSetup({
  beforeSend:function(xhr){
    ajaxArr.push(xhr);
  },
  error:function(xhr,status,error){
    if(status!=="abort"){
      alert("加载请求时出错，状态码"+status+",请求地址："+xhr.url);
    }
  }
});

//
// $(document).ajaxError(function(evt, req, settings){
//
// });
$("body").on("click",".radio",function(){
  if($(this).parent("from").length > 0){
    $(this).parents("from").find(".radio_selected").removeClass("radio_selected");
  }else{
    $(this).parents("body").find(".radio_selected").removeClass("radio_selected");
  }

  if($(this).hasClass("radio_selected")){

  }else{
    $(this).addClass("radio_selected");
  }
})
function getNowFormatDate(time) {

    var time = arguments[0] ? arguments[0] : false;
    if(time){
        var date = new Date(parseInt(time)*1000);
    }else{
        var date = new Date();
    }

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var Hours= date.getHours();
    if(Hours < 10){
      Hours = "0"+Hours;
    }
    var minutes= date.getMinutes();
    if(minutes < 10){
      minutes = "0"+minutes;
    }
    var Seconds= date.getSeconds();
    if(Seconds < 10){
      Seconds = "0"+Seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + minutes
            + seperator2 + Seconds;
    return currentdate;
}
function selectUser(selectedUser,callback){
  var user_tpl=function(){/*
  <div class="user_selecter_content">
  <style>
      .black_bg{width:100%;height:100%;position:fixed;background:rgba(0,0,0,0);top:0;left:0;z-index:1000;transition:all 300ms;-moz-transition:all 300ms;-webkit-transition:all 300ms;-o-transition:all 300ms;}
      .user_selecter{width:calc(100% - 30px);height:350px;background:#fff;position:absolute;top:170%;bottom:0;left:0%;right:0;margin:auto auto;transition:all 300ms;-moz-transition:all 300ms;-webkit-transition:all 300ms;-o-transition:all 300ms;}
      .user_selecter_select{width:100%;height:300px;border-bottom:1px solid #eee;box-sizing: border-box;}
      .user_selecter_title{width:100%;display:flex;justify-content:center;align-items:center;background:#eee;height:40px}
      .user_selecter_title div{width:33.33333%;text-align:center;font-size:13px}
      .user_selecter_data{width:100%;height:calc(100% - 40px);display: flex;}
      .user_selecter_data > div{width:33.33333%;font-size:14px;height:100%;box-sizing:border-box;}
      .user_selecter_data > div:nth-child(1){border-right:1px solid #eee}
      .user_selecter_data > div:nth-child(2){border-right:1px solid #eee}
      .user_selecter_department{overflow: scroll;}
      .user_selecter_department_item{width:100%;padding-top:12px;padding-bottom:12px;text-align:center;border-bottom:1px solid #eee;box-sizing:border-box}
      .user_selecter_department_item div{text-align: center;box-sizing: border-box;padding-left: 10px;padding-right: 10px}
      .user_selecter_department_active,.user_selecter_user_active{border-left:2px solid #E32416;background:rgba(227,36,22,0.2)}

      .user_selecter_user{overflow: scroll;}
      .user_selecter_user_item{width:100%;padding-top:12px;padding-bottom:12px;text-align:center;border-bottom:1px solid #eee;box-sizing:border-box}
      .user_selecter_user_item div{text-align: center;box-sizing: border-box;padding-left: 10px;padding-right: 10px}
      .user_selecter_selected{overflow: scroll;}
      .user_selecter_selected_item{width:90%;height:40px;position: relative;background:rgba(227,36,22,0.7);line-height: 40px;color:#fff;margin-top:5px;margin-left:5px;text-align: left;text-indent: 7px}
      .user_selecter_selected_item .iconfont{line-height:40px;font-size:11px;width:40px;height:40px;box-sizing: border-box;border-radius:50%;position: absolute;top:0;bottom:0;right:0;margin:auto auto;text-align: center;text-indent: 0}
      .user_selecter_control{width:100%;display: flex;justify-content: space-between;}
      .user_selecter_control div{width:50%;height:50px;color:#E32416;font-size: 16px;line-height:50px;box-sizing: border-box;text-align: center;transition:all 300ms;-moz-transition:all 300ms;-webkit-transition:all 300ms;-o-transition:all 300ms;}
      .user_selecter_line{height:50px;border-right:1px solid #eee;display: block;}
      .user_selecter_cancel{width:calc(50% - 1px);}
      .user_selecter_cancel:active,.user_selecter_confirm:active{background:#ddd}
  </style>
  <div class="black_bg">
      <div class="user_selecter">
        <div class="user_selecter_select">
          <div class="user_selecter_title">
            <div>处室</div>
            <div>人员</div>
            <div>选择</div>
          </div>
          <div class="user_selecter_data">
            <div class="user_selecter_department">

            </div>
            <div class="user_selecter_user">

            </div>
            <div class="user_selecter_selected">

            </div>
          </div>
        </div>
        <div class="user_selecter_control">
          <div class="user_selecter_cancel">取消</div>
          <span class="user_selecter_line"></span>
          <div class="user_selecter_confirm">确认</div>
        </div>
      </div>
  </div>
  </div>
  */}.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

  user_tpl=$(user_tpl);
  $("body").append(user_tpl);
  setTimeout(function(){
    $(".black_bg").css("background","rgba(0,0,0,0.4)")
    $(".user_selecter").css("top","0")
  },30)



  var department_list = '<div class="user_selecter_department_item"><div></div></div>';
  department_list = $(department_list);
  var user_list='<div class="user_selecter_user_item"><div></div></div>';
  user_list = $(user_list);
  var selected_user='<div class="user_selecter_selected_item"><span></span><i class="iconfont iconcuowu"></i></div>';
  selected_user=$(selected_user);

  selectedUser.forEach(function(value,index,array){
    var dom=selected_user.clone();
    dom.attr("data-uid",value.uid);
    dom.find("span").text(value.name)
    $(".user_selecter_selected").append(dom);
  })
  //获取部门列表
  $.get(host + "mobile/department/getdeptList", {}, function(res) {
    // getContacts(res.data[0].deptid)
    res.data.forEach(function(value, index, array) {
      var department = department_list.clone();
      department.find("div").text(value.deptname)
      department.attr("data-deptid", value.deptid)
      if(index==0){
        department.addClass("user_selecter_department_active")
        getUser(value.deptid)
      }
      $(".user_selecter_department").append(department)
    })
  })

  $(".user_selecter_department").on("click",".user_selecter_department_item",function(){
    $(".user_selecter_department_active").removeClass("user_selecter_department_active");
    $(this).addClass("user_selecter_department_active");
    getUser($(this).attr("data-deptid"))
  })
  $(".user_selecter_user").on("click",".user_selecter_user_item",function(){
    var uid=$(this).attr("data-uid");
    if($(this).hasClass("user_selecter_user_active")){
      $(this).removeClass("user_selecter_user_active");
      $(".user_selecter_selected_item[data-uid="+uid+"]").remove();
    }else{
      var dom=selected_user.clone();
      dom.attr("data-uid",uid);
      dom.find("span").text($(this).find("div").text())
      $(".user_selecter_selected").append(dom);
      $(this).addClass("user_selecter_user_active");
    }
  })
  $(".user_selecter_selected").on("click",".iconfont",function(){
      var uid=$(this).parent().attr("data-uid");
      $(".user_selecter_user_item[data-uid="+uid+"]").removeClass("user_selecter_user_active");
      $(this).parent().remove();
  })
  $(".user_selecter_cancel").click(function(){
    $(".black_bg").css("background","rgba(0,0,0,0)")
    $(".user_selecter").css("top","170%")
    callback("cancel");
    setTimeout(function(){
      $(".user_selecter_content").remove();
    },300)
  })
  $(".user_selecter_confirm").click(function(){
    $(".black_bg").css("background","rgba(0,0,0,0)")
    $(".user_selecter").css("top","170%")
    var userArr=new Array();
    $(".user_selecter_selected_item").each(function(){
      var arr={};
      arr.uid=$(this).attr("data-uid");
      arr.name=$(this).find("span").text();
      userArr.push(arr);
    })
    callback("confirm",userArr);
    setTimeout(function(){
      $(".user_selecter_content").remove();
    },300)
  })
  function getUser(deptid){
    $.get(host + "mobile/contacts/getContactsList", {deptid:deptid}, function(res) {
      $(".user_selecter_user > div").remove()
      res.data.forEach(function(value, index, array){
        var user = user_list.clone();
        user.attr("data-uid",value.uid);
        user.find("div").text(value.realname);
        if($(".user_selecter_selected .user_selecter_selected_item[data-uid="+value.uid+"]").length > 0){
            user.addClass("user_selecter_user_active");
        }
        $(".user_selecter_user").append(user);
      })
    })
  };

}
function openFile(dataUrl,filename) {

    var saveroot = "fs://ghj/download/" +filename;
    //alert("dataUrl:"+dataUrl);
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
