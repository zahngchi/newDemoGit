var WorkFlow=
    {
        REGMAPPING :{
            'notempty': {
                'reg': /\S+/,
                'tip': '一定要填写'
            },
            'chinese': {
                'reg': /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
                'tip': '只能为中文'
            },
            'letter': {
                'reg': /[A-Za-z]+$/,
                'tip':'只能为英文'
            },
            'num': {
                'reg': /^([+-]?)\d*\.?\d+$/,
                'tip':'只能为数字'
            },
            'idcard': {
                'reg': /^[1-9]([0-9]{14}|[0-9]{16}([0-9]|[xX]))$/,
                'tip':'只能为身份证号码'
            },
            'mobile': {
                'reg': /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/,
                'tip':'只能为手机号码'
            },
            'money': {
                'reg': /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
                'tip': '只能为数额'
            },
            'tel': {
                'reg': /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
                'tip': '只能为电话号码'
            },
            'zipcode': {
                'reg': /^\d{6}$/,
                'tip': '只能为邮政编号'
            },
            'email': {
                'reg': /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
                'tip': '只能为邮箱'
            }
        },
        valueArr:[],
        //渲染有值的字段
        renderValueArr:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.valueTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染列表控件新增
        renderNewListview:function(datas,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.newListViewTpl());
            var temStr=tem(datas);
            $obj.append(temStr);
            var data=datas.data;
            //遍历表单数据
            for(var x=0;x<data.length;x++)
            {
                //获取类型为列表控件的表单
                if(data[x]['data-type']&&data[x]['data-type']==="listview")
                {
                    if(data[x]["value-mobile-coltype"])
                    {
                        for(var y in data[x]["value-mobile-coltype"])
                        {
                            //防止xItem和yItem的值被固定
                            var help3=function(xItem,yItem)
                            {
                                var xItems=xItem,
                                    yItems=yItem;
                                //获取列表控件里面类型为计算控件的表单
                                if(data[xItems]["value-mobile-coltype"][yItems]==="calc")
                                {

                                    //获取到公式
                                    var formula=data[xItems]["value-mobile-colvalue"][yItems];
                                    if(formula)
                                    {
                                        //获取公式里面的参数值
                                        var formulArr=formula.match(/\[(.+?)\]/g);
                                        //去重
                                        formulArr=WorkFlow.unique(formulArr);
                                        //防止formulaItem的值被固定
                                        var help=function(formulaItem)
                                        {
                                            for(var i=0;i<formulArr.length;i++)
                                            {
                                                var index=parseInt(formulArr[i].replace("[","").replace("]","")),
                                                    dataName=data[xItems]["value-mobile-titlearr"][index-1],
                                                    titleArr=data[xItems]["value-mobile-titlearr"];
                                                //防止dataName和titleArr的值被固定
                                                var help2=function(dataNameItem,titleArrItem)
                                                {
                                                    //根据列表控件内的（计算控件）表单绑定列表控件里面表单的值改变事件，每改变其的值就重新计算对应的计算公式

                                                    $("[data-title='"+data[xItems]["data-title"]+"'],[data-add-title='"+data[xItems]["data-title"]+"']").on("input change","[data-name='"+dataNameItem+"']",function()
                                                    {
                                                        var $parentUl=$(this).parents(".list-view-sub-content"),
                                                            temFormula=formulaItem;
                                                        //拿取公式中对应表单的值
                                                        for(var j=0;j<formulArr.length;j++)
                                                        {
                                                            var sindex=parseInt(formulArr[j].replace("[","").replace("]","")),
                                                                $targetDom=$parentUl.find('[data-name="'+titleArrItem[sindex-1]+'"]'),
                                                                formulItem=formulArr[j],
                                                                sumObj=$targetDom.val()?parseFloat($targetDom.val()):parseFloat($targetDom.text());
                                                            sumObj=sumObj?sumObj:0;
                                                            //去掉[ ] 获取中间的内容
                                                            formulItem=formulItem.replace("[","\\[").replace("]","\\]");
                                                            var reg=new RegExp(formulItem,"g");
                                                            temFormula=temFormula.replace(reg,sumObj)
                                                        }

                                                        $parentUl.find("[data-name='"+yItems+"']").text(eval(temFormula));
                                                    });
                                                    //先调用一下计算(别急 等一下)
                                                    setTimeout(function()
                                                    {
                                                        $("[data-name='"+dataNameItem+"']").change();
                                                    },0);
                                                }(dataName,titleArr);
                                            }
                                        }(formula)
                                    }
                                }
                            }(x,y);
                        }
                    }
                }
            }
        },
        //渲染会签
        renderProcess:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.processTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染隐藏input
        renderHideInput:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.hideInputTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染转交页面
        renderNext:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.selectNextStepTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        renderHeader:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.headerTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        renderAttach:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.attachTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        renderReadAttach:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.attachReadTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染会签意见表单
        renderProcessContent:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.processContentTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        renderUploadAttach:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.uploadattachTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //主按钮
        renderMainBtn:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowMainBtnTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //子按钮
        renderBtn:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowBtnTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //通过id删除已经选择的用户对象中的用户
        removeItemById:function(id,obj)
        {
            for(var x in obj)
            {

                if(obj[x].hasOwnProperty("uid"))
                {
                    if(obj[x].uid===id)
                    {
                        obj.splice(x,1);
                    }
                }
                else if(obj[x].hasOwnProperty("depid"))
                {
                    if(obj[x].depid===id)
                    {
                        obj.splice(x,1);
                    }
                }
            }
            return obj;
        },
        //处理input中的data数据
        handleData:function(data)
        {
            var resData="";
            for(var x in data)
            {
                if(data[x].hasOwnProperty("uid"))
                {
                    resData+="u_"+data[x].uid+","
                }
                else if(data[x].hasOwnProperty("depid"))
                {
                    resData+="d_"+data[x].depid+","
                }
            }
            //去掉最后的逗号
            resData=resData.substr(0,resData.length-1);
            return resData;
        },
        //渲染发起工作页面
        renderStart:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowStartTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染发起工作页面
        renderStartList:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowStartListTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染选择回退步骤
        renderSelFbStep:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.selectFollbackStepTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染选择否决步骤
      foujueStep:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.foujueStepTpl());
            var temStr=tem(data);
            $obj.append(temStr);
        },
        //渲染关联工作列表
        renderWorkrelatedList:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowCheckDocItem()),temStr="";
            if(data.list.length)
            {
                temStr=tem(data);
            }
            else
            {
                temStr=' <div style="width:100%;height:10rem;text-align:center">\n' +
                    '                    <img style="display:inline-block;height:30%;margin-top:3rem;" src="../image/noContent_yet.png">\n' +
                    '                    <br>\n' +
                    '                    <span>暂没内容</span>\n' +
                    '                 </div>';
            }
            $obj.html(temStr);
        },
        //渲染关联审批任务列表
        renderCxsList:function(data,$obj)
        {
            var tem=doT.template(WorkFlowTemplate.workflowCxslistItem());

            if(data.list.length)
            {
                temStr=tem(data);
            }
            else
            {
                temStr=' <div style="width:100%;height:10rem;text-align:center">\n' +
                    '                    <img style="display:inline-block;height:30%;margin-top:3rem;" src="../image/noContent_yet.png">\n' +
                    '                    <br>\n' +
                    '                    <span>暂没内容</span>\n' +
                    '                 </div>';
            }
            $obj.html(temStr);
        },
        //验证表单
        validate:function(checkItemArg)
        {
            for(var x in checkItemArg)
            {
                var value="",
                    target=$("li[data-jump-title='"+x+"']").not("[data-type='listview']");
                //标签是否存在
                if(target.length>0)
                {
                    if(target.find("input").length>0)
                    {
                        if(target.find("input[type='text']").length>0)
                        {
                            value=target.find("input[type='text']").val()+"";
                        }
                        else if(target.find("input[type='radio']:checked").length>0)
                        {
                            value=target.find("input[type='radio']:checked").val()+"";
                        }
                        else if(target.find("input[type='checkbox']:checked").length>0)
                        {
                            value=target.find("input[type='checkbox']:checked").val()+"";
                        }
                    }
                    else if(target.find("textarea").length>0)
                    {
                        value=target.find("textarea").val()+"";
                    }
                    else if(target.find("select").length>0)
                    {
                        value=target.find("select").val()+"";
                    }

                    var r=value.match(eval(this.REGMAPPING[checkItemArg[x]].reg));
                    if(!r)
                    {
                        api.toast({
                            msg:x+this.REGMAPPING[checkItemArg[x]].tip,
                            duration:2000
                        });
                        if($("li[data-jump-title='"+x+"']").length>0)
                        {
                            $(".content").scrollTop(target.get(0).offsetTop+200);

                            /*if(target.find("input").length>0)
                            {
                                target.find("input[type='text']").focus();
                            }
                            if(target.find("textarea").length>0)
                            {
                                target.find("textarea").focus();
                            }*/
                            target.addClass("form-tip");
                            setTimeout(function()
                            {
                                target.removeClass("form-tip");
                                setTimeout(function()
                                {
                                    target.addClass("form-tip");
                                    setTimeout(function()
                                    {
                                        target.removeClass("form-tip");
                                    },200);
                                    return false;
                                },200);
                                return false;
                            },200)
                        }
                        return false;
                    }
                }
            }
            return true;
        },
        initCalculate:function()
        {
            var that=this;
            this.bindEventByEqual();
            this.triggerEventByEqual();
            this.bindEventLvEvent();

        },
        //列表控件内的计算事件监听
        bindEventLvEvent:function()
        {
            $(".list-view-content").on("input change","[data-type='lv-calc']",function()
            {

            })
        },
        //给计算控件的结果表单绑定事件
        bindEventByEqual:function()
        {
            var that=this;
            $("[data-type='calc']").bind("calc",function()
            {
                var  formula=$(this).attr("data-value");

                if(formula)
                {
                    if($(this).find("input").length)
                    {
                        $(this).find("input").val(that.formulaCalc(formula)).attr("disabled",true);
                    }
                    else
                    {
                        $(this).text(that.formulaCalc(formula));
                    }
                    that.bindAllEventByFormula(formula);
                }
            });
        },
        //触发计算控件的结果表单事件
        triggerEventByEqual:function()
        {
            $("[data-type='calc']").trigger("calc");
        },
        //给计算控件的参数表单绑定事件
        bindAllEventByFormula:function(formula)
        {
            var that=this;
            var formulaArr=this.getFormulaItem(formula);
            for(var x in formulaArr)
            {
                this.bindEventByFormula(formulaArr[x],function()
                {
                    that.triggerEventByEqual();
                });
            }
        },
        //给表达式对应的参数绑定事件
        bindEventByFormula:function(formulaItem,cb)
        {
            var callback=cb;
            if(typeof formulaItem==="string")
            {
                if($("[data-title='"+formulaItem+"']").length)
                {
                    $("[data-title='"+formulaItem+"']").find("input").off("input").off("change").on("input change",function()
                    {
                        callback();
                    });
                }
            }
        },
        //计算表达式
        formulaCalc:function(formula)
        {
            var formulaArr=this.getFormulaItem(formula),
                formulaItemValueObj=this.getFormulaItemValue(formulaArr),
                //去掉带有括号的
                formula=formula.replace(/\(小写\)/g,"小写").replace(/\(大写\)/g,"大写");
            formulaValueStr=this.replaceFormulaItemToValue(formula,formulaItemValueObj);
            //执行字符串并返回计算的值
            return eval(this.replaceCalFun(formulaValueStr));
        },
        //从计算公式里面中把计算函数替换成可以计算的js函数

        replaceCalFun:function(formulaValueStr)
        {

            formulaValueStr=formulaValueStr.replace(/ABS/g,"this.ABS");

            formulaValueStr=formulaValueStr.replace(/MAX/g,"this.MAX");

            formulaValueStr=formulaValueStr.replace(/MIN/g,"this.MIN");

            formulaValueStr=formulaValueStr.replace(/AVG/g,"this.AVG");

            formulaValueStr=formulaValueStr.replace(/RMB/g,"this.RMB");


            formulaValueStr=formulaValueStr.replace(/LIST/g,"this.LIST");

            formulaValueStr=formulaValueStr.replace(/DATE/g,"this.DATE");

            formulaValueStr=formulaValueStr.replace(/DAY/g,"this.DAY");

            return formulaValueStr;
        },
        //列表控件字段合计计算 index是列表表头数组中的索引
        LIST:function(domStr,index)
        {


            //它是某一个列表控件
            var $listviewDom=$('[data-title="'+domStr+'"]'),
                //她是列表控件的表头
                lvTtitle=$listviewDom.attr("data-lv-title"),
                //把她转数组 便于定位
                lvTitlteArr=lvTtitle.split("`"),
                //总数 要返回的
                sum=0,
                that=this;
            //转索引
            index=(index-1)?(index-1):0;
            //找到了列表表头标题遍历他
            if($listviewDom.find('[data-name="'+lvTitlteArr[index]+'"]').length)
            {
                $listviewDom.find('[data-name="'+lvTitlteArr[index]+'"]').each(function()
                {
                    if($(this).val())
                    {
                        sum+=parseFloat($(this).val())?parseFloat($(this).val()):0;
                    }
                    else if($(this).text())
                    {
                        sum+=parseFloat($(this).text())?parseFloat($(this).text()):0;
                    }
                    $listviewDom.off("input").on("input",$(this),function()
                    {
                        //你也等一下
                        setTimeout(function(){
                            that.triggerEventByEqual();
                        },1000)
                    })
                })
            }
            //返回总数
            return sum;
        },
        //计算天
        DAY:function(time)
        {
            return parseInt(time/(60*60*24))

        },
        //绝对值
        ABS:function(value)
        {
            return Math.abs(value);
        },
        //平均值
        AVG:function()
        {
            if(typeof arguments!=="undefined"&&arguments.length>1)
            {
                var sum=0;
                for(var x in arguments)
                {
                    sum+=parseInt(arguments[x]);
                }
                return sum/arguments.length;
            }
            return arguments[0];
        },

        //最大值
        MAX:function()
        {
            var max = arguments[0];
            var len = arguments.length;
            for (var i = 1; i < len; i++){
                if (this[i] > max) {
                    max = arguments[i];
                }
            }
            return max;
        },
        //时间差
        DATE:function(time)
        {
            var diff_day = parseInt(time/(60*60*24)),
                diff_time=(time%(24*3600))/3600;
            return diff_day+"天"+diff_time+"小时";
        },
        //人民币大晒
        'RMB': function(currencyDigits) {
            // Constants:
            var MAXIMUM_NUMBER = 99999999999.99;
            var CN_ZERO = "零";
            var CN_ONE ="壹";
            var CN_TWO = "贰";
            var CN_THREE = "叁";
            var CN_FOUR ="肆";
            var CN_FIVE = "伍";
            var CN_SIX = "陆";
            var CN_SEVEN = "柒";
            var CN_EIGHT = "捌";
            var CN_NINE = "玖";
            var CN_TEN = "拾";
            var CN_HUNDRED = "佰";
            var CN_THOUSAND = "仟";
            var CN_TEN_THOUSAND = "万";
            var CN_HUNDRED_MILLION = "亿";
            var CN_DOLLAR = "元";
            var CN_TEN_CENT = "角";
            var CN_CENT = "分";
            var CN_INTEGER = "整";
            // Variables:
            var integral; // Represent integral part of digit number.
            var decimal; // Represent decimal part of digit number.
            var outputCharacters; // The output result.
            var parts;
            var digits, radices, bigRadices, decimals;
            var zeroCount;
            var i, p, d;
            var quotient, modulus;
            // Validate input string:
            currencyDigits = currencyDigits.toString();
            if (currencyDigits == "") {
                return "";
            }
            if (currencyDigits.match(/[^,.\d]/) != null) {
                return "";
            }
            if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                return "";
            }
            // Normalize the format of input digits:
            currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
            currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
            // Assert the number is not greater than the maximum number.
            if (Number(currencyDigits) > MAXIMUM_NUMBER) {
                return "";
            }
            // Process the coversion from currency digits to characters:
            // Separate integral and decimal parts before processing coversion:
            parts = currencyDigits.split(".");
            if (parts.length > 1) {
                integral = parts[0];
                decimal = parts[1];
                // Cut down redundant decimal digits that are after the second.
                decimal = decimal.substr(0, 2);
            }
            else {
                integral = parts[0];
                decimal = "";
            }
            // Prepare the characters corresponding to the digits:
            digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
            radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
            bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
            decimals = new Array(CN_TEN_CENT, CN_CENT);
            // Start processing:
            outputCharacters = "";
            // Process integral part if it is larger than 0:
            if (Number(integral) > 0) {
                zeroCount = 0;
                for (i = 0; i < integral.length; i++) {
                    p = integral.length - i - 1;
                    d = integral.substr(i, 1);
                    quotient = p / 4;
                    modulus = p % 4;
                    if (d == "0") {
                        zeroCount++;
                    }
                    else {
                        if (zeroCount > 0) {
                            outputCharacters += digits[0];
                        }
                        zeroCount = 0;
                        outputCharacters += digits[Number(d)] + radices[modulus];
                    }
                    if (modulus == 0 && zeroCount < 4) {
                        outputCharacters += bigRadices[quotient];
                    }
                }
                outputCharacters += CN_DOLLAR;
            }
            // Process decimal part if there is:
            if (decimal != "") {
                for (i = 0; i < decimal.length; i++) {
                    d = decimal.substr(i, 1);
                    if (d != "0") {
                        outputCharacters += digits[Number(d)] + decimals[i];
                    }
                }
            }
            // Confirm and return the final output string:
            if (outputCharacters == "") {
                outputCharacters = CN_ZERO + CN_DOLLAR;
            }
            if (decimal == "") {
                outputCharacters += CN_INTEGER;
            }
            //outputCharacters = CN_SYMBOL + outputCharacters;
            return outputCharacters;
        },
        //最小值
        MIN:function()
        {

            var min = arguments[0];
            var len = arguments.length;
            for (var i = 1; i < len; i++){
                if (this[i] < min){
                    min = arguments[i];
                }
            }
            return min;
        },

        //替换公式字符串中参数
        replaceFormulaItemToValue:function(formulaStr,formulaItemValueObj)
        {
            var fStr=formulaStr;
            for(var x in formulaItemValueObj)
            {
                var regStr="/"+x+"/g";
                fStr=fStr.replace(eval(regStr),formulaItemValueObj[x])
            }
            return fStr;
        },
        //处理一下时间 当碰到 2017-09-17 10的情况默认添加:00分钟 eg:2017-09-17 10:00
        handleTime:function(time) {
            var date = time.split(" ");
            if (date.length>1)
            {
                if(date[1].indexOf(":")===-1)
                {
                    date[1]+=":00";
                }
            }
            return date.join(" ");
        },
        //获取对应公式参数表单中的值
        getFormulaItemValue:function(formulaArr)
        {
            var obj={};
            for(var x in formulaArr)
            {
                if(typeof formulaArr[x]==="string")
                {
                    // 获取相对应的title的input值
                    if($('[data-title="'+formulaArr[x]+'"]').length)
                    {
                        var $formulatDom=$('[data-title="'+formulaArr[x]+'"]'),
                            value="";
                        if($formulatDom.attr("data-type").indexOf("date")!==-1) //当类型是时间控件时 date
                        {
                            if($formulatDom.find("input").length)
                            {
                                value=$formulatDom.find("input").val().trim();
                            }
                            else
                            {
                                value=$formulatDom.text().trim();
                            }

                            value=value?(new Date(this.handleTime(value)).getTime())/1000:0;
                        }
                        else if($formulatDom.attr("data-type")==="listview")//当类型是列表控件时 listview eg:list(domStr,number) domStr为列表控件中的容器选择器字符串
                        {
                            value='"'+formulaArr[x]+'"';
                        }
                        else
                        {
                            if($formulatDom.find("input").length)
                            {
                                value=$formulatDom.find("input").val();
                            }
                            else
                            {
                                value=$formulatDom.text();
                            }
                            value=isNaN(parseInt(value))?0:value;
                        }
                        var key=formulaArr[x];
                        obj[key]=value;
                    }
                }

            }
            return obj;
        },
        //从公式字符串中获取参数
        getFormulaItem:function(formula)
        {
            formula=formula?formula:"";
            var formulaStr=formula.replace(/\+/g,",");
            formulaStr=formulaStr.replace(/ABS\(/g,"");
            formulaStr=formulaStr.replace(/MAX\(/g,"");
            formulaStr=formulaStr.replace(/MIN\(/g,"");
            formulaStr=formulaStr.replace(/AVG\(/g,"");
            formulaStr=formulaStr.replace(/RMB\(/g,"");
            formulaStr=formulaStr.replace(/DAY\(/g,"");
            formulaStr=formulaStr.replace(/HOUR\(/g,"");
            formulaStr=formulaStr.replace(/DATE\(/g,"");
            formulaStr=formulaStr.replace(/LIST\(/g,"");
            formulaStr=formulaStr.replace(/DAY\(/g,"");
            formulaStr=formulaStr.replace(/\*/g,",");
            formulaStr=formulaStr.replace(/\//g,",");
            formulaStr=formulaStr.replace(/-/g,",");
            formulaStr=formulaStr.replace(/\(/g,"");
            formulaStr=formulaStr.replace(/\)/g,"");
            var formulaArr=formulaStr.split(",");
            formulaArr=this.unique(formulaArr);
            formulaArr=this.killNumber(formulaArr);
            return formulaArr;
        },
        //去重
        unique:function(arr)
        {
            var res = [];
            var json = {};
            for(var i = 0; i < arr.length; i++){
                if(!json[arr[i]]){
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        },
        //干掉数字
        killNumber:function(arr){
            var res = [];
            var json = {};
            for(var i = 0; i < arr.length; i++){
                if(isNaN(parseInt(arr[i],10))){
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        }

    };
$.fn.workflow=function(args,cb) {
    var opts = $.extend(
        {
            type: "value",
            emptyArr: [],
            enableArr: [],
            valueArr: []
        }, args);
    var that = $(this);
    that.html("");
    $("#btnMainContent").html("");
    $("#btnContent").html("");
    $("#title").html("");
    $("#attachContent").html("");
    $("#stepContent").html("");
    //是否可以回退
    /*if(opts.process.processid==="1")
    {
        $("#fallbackBtn").hide();
    }*/
    if(!opts.process.banphone)
    {
        opts.process.banphone="0";
    }
    WorkFlow.renderMainBtn(opts,$("#btnMainContent"));
    WorkFlow.renderBtn(opts,$("#btnContent"));
    WorkFlow.renderHeader(opts.run,$("#title"));

    WorkFlow.renderValueArr({data:opts.valueArr,type:"value",banphone:opts.process.banphone},that);

    WorkFlow.renderValueArr({data:opts.enableArr,type:"enable",checkitem:opts.checkItem,banphone:opts.process.banphone},that);

    WorkFlow.renderValueArr({data:opts.emptyArr,type:"empty",banphone:opts.process.banphone},that);


    WorkFlow.renderSelFbStep(opts,$("#selFbStepContent"));
    WorkFlow.foujueStep(opts,$("#foujueContent"));
    //WorkFlow.renderProcessContent({banphone:opts.process.banphone},that);
    //清空一下新增列表的模版弹出层 防止出现重复的
    if($("[id^='listview-popup']").length)
    {
        $("[id^='listview-popup']").remove();
    }
    WorkFlow.renderNewListview({data:opts.enableArr,type:"enable"},$("body"));
    if($("#attach-count").length>0)
    {
        var count=parseInt(opts.count_attach)?parseInt(opts.count_attach):0;
        var read_attach_count=parseInt(opts.count_read_attach)?parseInt(opts.count_read_attach):0;
        count+=read_attach_count;
        $("#attach-count").text(count);
    }
    if(opts.attachData)
    {
        WorkFlow.renderAttach(opts.attachData,$("#attachContent"));
    }

    opts.readattachview=false;
    if(opts.readattachview&&opts.readattachview===true)
    {
        if(opts.readattachData)
        {
            WorkFlow.renderReadAttach(opts.readattachData,$("#attachContent"));
        }
    }
    else
    {
        $("#readUpload-btn").hide();
    }
    if(opts.process.banphone!=="0")
    {
        $("#readUpload-btn").hide();
        $("#commonUpload-btn").hide();
    }

    //遍历关联审批任务列表
    $("#selected-cxs-content").html(WorkFlowTemplate.nullTpl());
    if(opts.cxsliststr)
    {
        var cxslistobj=JSON.parse(opts.cxsliststr);
        WorkFlow.renderCxsList({list:cxslistobj,selectedArr:[]},$("#selected-cxs-content"));
    }
    //遍历关联工作列表
    $("#selected-related-content").html(WorkFlowTemplate.nullTpl());
    if(opts.flowlistData)
    {
        var workrealatedlistobj={list:opts.flowlistData,selectedArr:[]};
        WorkFlow.renderWorkrelatedList(workrealatedlistobj,$("#selected-related-content"));
    }
    /*WorkFlow.renderUploadAttach(opts.uploadConfig,that);*/
    /*if(opts.rpcache)
    {
        WorkFlow.renderProcess(opts.rpcache,$("#stepContent"));
    }*/
    if(opts.feedback)
    {
        WorkFlow.renderProcess({feedback:opts.feedback,nofeedback:opts.nofeedback},$("#stepContent"));
    }


    WorkFlow.renderHideInput(opts,that);
    cb(true);
};
$.fn.workflowNext=function(args,cb)
{
   var that=$(this);
   WorkFlow.renderNext(args,that);
   cb(true);
};
$.fn.workflowStart=function(args,cb)
{
    var that=$(this);
    WorkFlow.renderStart(args,that);
};
$.fn.workflowStartList=function(args,cb)
{
    var that=$(this);
    WorkFlow.renderStartList(args,that);
};
