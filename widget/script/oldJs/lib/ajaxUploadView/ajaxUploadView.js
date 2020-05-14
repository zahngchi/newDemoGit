var uploadUploadView=function(param)
{
    //默认配置
    this.opt=$({
        uploadUrl:"",
        fileInputId:"",
        viewContentId:"",
        template:""
    },param);
    //目标input file
    this.$fileInput=$("#"+this.opt.fileInputId);
    //目标视图
    this.$viewContent=$("#"+this.opt.viewContentId);

    //模板
    this.tpl={
        //默认的
        viewItem:function()
        {
            var tpl=(function(){/*
                <div class="attl-item" data-node-type="attachItem">
                    <a href="javascript:;" title="删除附件" style="position:static;" class="cbtn o-trash pull-right" data-id="9350" data-node-type="attachRemoveBtn"></a>
                    <a target="_blank" href="/?r=main/attach/download&amp;id=NGEyYU1sMTJhSUtGNW9MbFRkSGRBK2M0clk1VVNyWUZ4TVlsY01tOUlzMUlINFNJc3F6eCtoYWVQbUxYWU9NWA%253D%253D" class="o-host-download pull-right" title="下载"></a>
                    <a target="_blank" href="/data/attachment/workflow/201805/30/184704gzsmzgcghnngjlgg.png" class="o-host-read pull-right" title="阅读"></a>
                    <i class="atti">
                        <img width="44" height="44" src="static/image/filetype/photo_lt.png" alt="发布.png" title="发布.png">
                    </i>
                    <div class="attc">发布.png</div>
                 </div>
            */}).toString();
            tpl=tpl.replace("(function (){/*","");
            tpl=tpl.replace("(function(){/*","");
            tpl=tpl.replace("function (){/*","");
            tpl=tpl.replace("function(){/*","");
            tpl=tpl.replace("*/})","");
            tpl=tpl.replace("*/}","");
            return tpl;
        }
    };
    //初始化事件
    this._init=function()
    {
        //目标input file选择事件
        $(document).off("change",this.$fileInput).on("change",this.$fileInput,function(ret)
        {

        })
    };
    //选择文件
    this.selectFileAppendView=function()
    {

    };
    //进度条调用事件
    this.OnProgRess=function(event) {
        var event = event || window.event;
        //console.log(event);  //事件对象

        //console.log(event.total);  //附件总大小(固定不变)
        var loaded = Math.floor(100 * (event.loaded / event.total)); //已经上传的百分比
        $("#speed").html(loaded + "%").css("width", loaded + "%");
    };
    //开始上传文件
    this.UploadFileFn=function() {

        var oFile = this.$fileInput.get(0).files[0], //input file标签
            formData = new FormData(),
            that=this;//创建FormData对象
        xhr = $.ajaxSettings.xhr(); //创建并返回XMLHttpRequest对象的回调函数(jQuery中$.ajax中的方法)
        formData.append("UploadForm[image]", oFile); //将上传name属性名(注意：一定要和 file元素中的name名相同)，和file元素追加到FormData对象中去

        $.ajax({
            type: "POST",
            url: this.uploadUrl, // 后端服务器上传地址
            data: formData, // formData数据
            cache: false, // 是否缓存
            async: true, // 是否异步执行
            processData: false, // 是否处理发送的数据  (必须false才会避开jQuery对 formdata 的默认处理)
            contentType: false, // 是否设置Content-Type请求头
            xhr: function() {
                if (OnProgRess && xhr.upload) {
                    xhr.upload.addEventListener("progress", that.OnProgRess, false);
                    return xhr;
                }
            },
            success: function(returndata) {
                $("#speed").html("上传成功");
                //alert(returndata);
            },
            error: function(returndata) {
                $("#speed").html("上传失败");

                alert('请正确配置后台服务！');
            }
        });
    };
}