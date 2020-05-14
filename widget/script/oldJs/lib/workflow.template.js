var WorkFlowTemplate=
    {
        //工作流表单模板
        valueTpl:function()
        {
            var tpl= (function tpl() {/*
                  <div class="card" {{? it.type==='enable'}}id="doForm"{{?}}>
                    <div class="workflow-item">
                        <h3 style="width:100%;padding:0.75rem;width:100%;" class="icon workflow-item-title {{? it.type==='enable'}}icon-edit workflow-item-title-active{{?? it.type==='value'}}icon-message workflow-item-title-active{{?? it.type==='empty'}}icon-clock{{?}}">
                            {{? it.type==='enable'}}表单办理{{?? it.type==='value'}}表单详情{{?? it.type==='empty'}}待办表单{{?}}
                        </h3>
                        <div {{? it.type==='enable'}} class="workflow-sub-item list-block workflow-item-active" {{?? it.type==='value'}} class="workflow-sub-item list-block workflow-item-active" {{?? it.type==='empty'}} class="workflow-sub-item list-block" {{?}} style="display:none;">
                            {{? it.checkitem}}
                            <script>
                                var checkitem='{{=it.checkitem}}';
                                if(checkitem)
                                {

                                    var checkItemArr=checkitem.split(',');

                                    checkItemObj={};

                                    for(var x=0;x<checkItemArr;x++)
                                    {
                                        if(typeof checkItemArr[x]==="string")
                                        {
                                            var cCheckItemArr=checkItemArr[x].split('=');
                                            checkItemObj[cCheckItemArr[0]]=cCheckItemArr[1];
                                        }
                                    }
                                }
                            </script>
                            {{?}}
                            <ul>
                            {{if(it.data){}}
                            {{ for(var x=0;x<it.data.length;x++) { }}
                                {{ if(x!='remove'&&it.data[x]["data-hide"]!="1") { }}
                                    <li data-jump-title='{{=it.data[x]["data-title"]}}' data-type="{{=it.data[x]['data-type']}}" class="value{{=it.data[x]["data-id"]}}">
                                      <div class="item-content  {{? it.data[x]['data-type']=='select'|| it.data[x]['data-type']=='user'}}item-link{{?}}">
                                        <div class="{{if(it.data[x]["data-type"]=="user") { }}item-inner {{ }else{ }}item-block{{ } }}">
                                          <div class="item-title label">
                                            {{=it.data[x]["data-title"]}}
                                            <span {{? it.type==='enable'}} id="data-noempty-dot{{=x}}"{{?}} data-noempty-dot='{{=it.data[x]["data-title"]}}' style="color:red;margin-right:5px;display:none;">*</span>
                                            {{? it.data[x]["data-type"]==="listview"&&it.type==="enable"&&it.banphone==="0"}}
                                            <span class="fa fa-plus pull-right"   onclick="openPopup('listview-popup{{=it.data[x].itemid}}')"></span>
                                            {{?}}
                                          </div>

                                          <div {{? it.data[x]["data-type"]==="listview"}} id="listview{{=it.data[x]["itemid"]}}"{{?}} class="item-input {{? it.data[x]["data-type"]==="listview"}} list-view-content {{?? it.data[x]["data-type"]=='date'&&it.type==='enable'}}workflow-datepicker{{?}} {{? it.data[x]["data-type"]=='user'&&it.type==='enable'}}userselect{{?}}" {{?it.data[x]["data-type"]=='date'&&it.type==='enable'}} data-date-format="{{=it.data[x]["data-date-format"]}}"{{?}}>
                                            {{? it.data[x]["data-type"]==="user"&&it.type==='value'}}

                                            {{?? it.data[x]["data-type"]==="listview"}}

                                                <input class="origin-value" type="hidden" name="data_{{=it.data[x]["itemid"]}}" value="{{=it.data[x]["origin-value"]}}">
                                                {{var dataTitle=it.data[x]["data-title"].replace(/\(/g,"").replace(/\)/g,"");}}
                                                <ul data-lv-title="{{=it.data[x]["data-lv-title"]}}" data-type='{{=it.data[x]["data-type"]}}'  data-title='{{=dataTitle}}'>
                                                    {{~it.data[x]["value-mobile-valarr"]:value:index }}
                                                         <li data-title="{{=it.data[x]["data-lv-title"]}}" class="item-content list-view-item" data-no="{{=value['序号']}}"  data-toggle="list-view-sub-item{{=value['序号']}}" style="padding-left:0">
                                                             <div class="item-media"><i class="icon icon-f7"></i></div>
                                                             <div class="item-inner">
                                                                 <div class="item-title">
                                                                 <div class="working-step">{{=value['序号']}}</div>

                                                                 {{for(var j in value){}}
                                                                 {{if(j!=="序号"){}}
                                                                  {{=j}}:{{=value[j]}}|
                                                                 {{ } }}
                                                                 {{ } }}
                                                                 </div>
                                                                 {{?it.type==="enable"}}
                                                                 <div class="item-after kill-maopao">
                                                                     <a class="remove-list-view-item" onclick="removeListviewItem(this)">删除</a>
                                                                 </div>
                                                                 {{?}}
                                                             </div>
                                                         </li>
                                                         <li>
                                                            <ul class="list-view-sub-content">
                                                         {{ for(var i in value){ }}
                                                          <li class="list-view-sub list-view-sub-item{{=value['序号']}}" data-no="{{=value['序号']}}" {{? i==="序号"}} style="display:none;"{{?}}>
                                                              <div class="item-content">
                                                                  <div class="item-media"><i class="icon icon-form-name"></i></div>
                                                                  <div class="item-block">
                                                                      <div class="item-title label">{{=i}} {{if((it.data[x]['value-mobile-coltype'][i]==="user"||it.data[x]['value-mobile-coltype'][i]==="department")&&it.type==="enable"){ }} <span class="fa fa-plus pull-right listview-select-{{=it.data[x]['value-mobile-coltype'][i]}}"
                                                                        {{var lvStrArr=[];}}
                                                                        {{for(var lvuseritem3=0,lvuserArr3=value[i].split(",");lvuseritem3<lvuserArr3.length;lvuseritem3++){ }}
                                                                            {{if(it.data[x]['value-mobile-coltype'][i]==="user"){ }}
                                                                                {{if(Ibos.data.user[lvuserArr3[lvuseritem3]]){ lvStrArr.push({uid:Ibos.data.user[lvuserArr3[lvuseritem3]].id.replace("u_",""),realname:Ibos.data.user[lvuserArr3[lvuseritem3]].text}); }}

                                                                                {{ } }}
                                                                            {{ }else{}}
                                                                                 {{if(Ibos.data.department[lvuserArr3[lvuseritem3]]){ lvStrArr.push({depid:Ibos.data.department[lvuserArr3[lvuseritem3]].id.replace("d_",""),depname:Ibos.data.department[lvuserArr3[lvuseritem3]].text}); }}

                                                                                {{ } }}
                                                                            {{ } }}
                                                                        {{ } }}
                                                                        {{lvStrArr=JSON.stringify(lvStrArr);}}
                                                                         data-selected='{{=lvStrArr}}'

                                                                       data-input-id="select-input-{{=value['序号']}}-{{=i}}" data-content-id="select-content-{{=value['序号']}}-{{=i}}" id="listview-select-btn-{{=value['序号']}}-{{=i}}"  style="color:#00a7f7;"></span>{{ } }}</div>
                                                                      <div class="item-input {{?it.data[x]['value-mobile-coltype'][i]=='date'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh:ii)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh:ii:ss)'||it.data[x]['value-mobile-coltype'][i]=='date(hh:ii)'}}workflow-listview-datepicker{{?}} {{?it.banphone!=="0"}}content-disabled{{?}}">
                                                                      {{if(it.type==="enable"){ }}
                                                                          {{if(it.data[x]['value-mobile-coltype'][i]==='select'){ }}
                                                                          <select class="selected-item-input" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">
                                                                              {{ for(var optsitem=0,colvalueArr=it.data[x]['value-mobile-colvalue'][i]?it.data[x]['value-mobile-colvalue'][i].split(","):[];optsitem<colvalueArr.length;optsitem++){}}
                                                                                <option value="{{=colvalueArr[optsitem]}}" {{if(value[i]===colvalueArr[optsitem]){ }}selected{{ } }}>{{=colvalueArr[optsitem]}}</option>
                                                                              {{ } }}
                                                                             </select>
                                                                           {{ }else if(it.data[x]['value-mobile-coltype'][i]==='checkbox'||it.data[x]['value-mobile-coltype'][i]==='radio'){ }}
                                                                                <ul data-type="checkbox" class="selected-item-input" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" >
                                                                                {{ for(var optsitemCheckbox=0,colvalueArrCheckbox=it.data[x]['value-mobile-colvalue'][i]?it.data[x]['value-mobile-colvalue'][i].split(","):[];optsitemCheckbox<colvalueArrCheckbox.length;optsitemCheckbox++){}}
                                                                                <li>
                                                                                    <label class="label-checkbox item-content">
                                                                                      <input class="checkbox-input" value="{{=colvalueArrCheckbox[optsitemCheckbox]}}"
                                                                                      {{var valueArr=value[i].split(",");}}
                                                                                      {{for(var valItem=0;valItem<valueArr.length;valItem++){}}
                                                                                        {{if(valueArr[valItem]===colvalueArrCheckbox[optsitemCheckbox]){ }}checked{{ } }}
                                                                                      {{}}}
                                                                                      name="{{=i}}" type="{{=it.data[x]['value-mobile-coltype'][i]}}"  >
                                                                                      <div class="item-media"><i class="icon icon-form-checkbox"></i>{{=colvalueArrCheckbox[optsitemCheckbox]}}</div>
                                                                                    </label>
                                                                                 </li>
                                                                                {{ } }}
                                                                                </ul>
                                                                           {{ }else if(it.data[x]['value-mobile-coltype'][i]==='textarea'){ }}
                                                                           <textarea  class="selected-item-input" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" placeholder="请输入{{=i}}" value="{{=value[i]}}">{{=value[i]}}</textarea>
                                                                          {{ }else if(it.data[x]['value-mobile-coltype'][i]==='number'){ }}
                                                                              <input  class="selected-item-input" min="0" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="number" placeholder="请输入{{=i}}" value="{{=value[i]}}">
                                                                          {{ }else if(it.data[x]['value-mobile-coltype'][i]==='user'||it.data[x]['value-mobile-coltype'][i]==='department'){ }}
                                                                              <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416;margin:0 !important" >
                                                                                <div class="lv-selected-item-content" id="select-content-{{=value['序号']}}-{{=i}}" data-target-id="select-input-{{=value['序号']}}-{{=i}}" data-btn-id="listview-select-btn-{{=value['序号']}}-{{=i}}">

                                                                                   {{for(var lvuseritem2=0,lvuserArr2=value[i].split(",");lvuseritem2<lvuserArr2.length;lvuseritem2++){ }}
                                                                                        {{if(it.data[x]['value-mobile-coltype'][i]==="user"){ }}
                                                                                            {{if(Ibos.data.user[lvuserArr2[lvuseritem2]]){ var userid2=Ibos.data.user[lvuserArr2[lvuseritem2]].id.replace("u_",""); }}
                                                                                                <div class="select-item"  data-id="{{=userid2}}">{{=Ibos.data.user[lvuserArr2[lvuseritem2]].text}}</div>
                                                                                            {{ } }}
                                                                                        {{ }else{}}
                                                                                             {{if(Ibos.data.department[lvuserArr2[lvuseritem2]]){ var depid2=Ibos.data.department[lvuserArr2[lvuseritem2]].id.replace("d_",""); }}
                                                                                            <div class="select-item" data-id="{{=depid2}}" >{{=Ibos.data.department[lvuserArr2[lvuseritem2]].text}}</div>
                                                                                            {{ } }}
                                                                                        {{ } }}
                                                                                    {{ } }}
                                                                                </div>
                                                                              </div>
                                                                              <input data-name="{{=i}}"  class="selected-item-input" type="hidden" value="{{=value[i]}}" id="select-input-{{=value['序号']}}-{{=i}}">
                                                                          {{ }else if(it.data[x]['value-mobile-coltype'][i]==='calc'){ }}
                                                                          <b class="selected-item-input" data-type="lv-calc" data-lv-calc="{{=it.data[x]['value-mobile-colvalue'][i]}}" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">{{=value[i]}}</b>
                                                                          {{ }else{ }}
                                                                             <input  class="selected-item-input" data-format="{{=it.data[x]['value-mobile-coltype'][i]}}" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="text" placeholder="请输入{{=i}}" value="{{=value[i]}}">
                                                                          {{ } }}
                                                                      {{ }else{ }}
                                                                          {{if(it.data[x]['value-mobile-coltype'][i]==="user"||it.data[x]['value-mobile-coltype'][i]==="department"){}}
                                                                             <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416;margin:0 !important" >
                                                                                <div class="selected-item-content" id="select-content-{{=i}}">
                                                                                    {{for(var lvuseritem=0,lvuserArr=value[i].split(",");lvuseritem<lvuserArr.length;lvuseritem++){ }}
                                                                                        {{if(it.data[x]['value-mobile-coltype'][i]==="user"){ }}
                                                                                            {{if(Ibos.data.user[lvuserArr[lvuseritem]]){ }}
                                                                                                <div class="select-item" data-id="{{=Ibos.data.user[lvuserArr[lvuseritem]].id}}">{{=Ibos.data.user[lvuserArr[lvuseritem]].text}}</div>
                                                                                            {{ } }}
                                                                                        {{ }else{}}
                                                                                             {{if(Ibos.data.department[lvuserArr[lvuseritem]]){ }}
                                                                                            <div class="select-item" data-id="{{=Ibos.data.department[lvuserArr[lvuseritem]].id}}" >{{=Ibos.data.department[lvuserArr[lvuseritem]].text}}</div>
                                                                                            {{ } }}
                                                                                        {{ } }}
                                                                                    {{ } }}
                                                                                </div>
                                                                              </div>
                                                                          {{}else { }}
                                                                          <span {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">{{=value[i]}}</span>
                                                                          {{ } }}
                                                                      {{ } }}
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </li>
                                                         {{ } }}
                                                            </ul>
                                                         </li>

                                                    {{~}}

                                                </ul>
                                                {{for(var sumitem in it.data[x]["value-mobile-sumflag"]){}}
                                                        {{? it.data[x]["value-mobile-sumflag"][sumitem]==="1"}}
                                                        <div class="sum"  style="width:100%;">
                                                            <div style="padding:15px;" class="clearfix">

                                                                <input class="pull-right" style="border:1px solid black;width:100px !important;" value="0" type="text" disabled data-sum="{{=sumitem}}" data-content="{{=it.data[x]["itemid"]}}">

                                                                 <span style="color:lightgray;font-size:10px;margin-right:5px;" class="pull-right">{{=sumitem}}(总计)</span>
                                                            </div>
                                                        </div>
                                                        {{?}}
                                                  {{ }}}
                                            {{??it.data[x]["data-type"]==="textarea"&&it.type==='enable'}}
                                            {{var dataTitle=it.data[x]["data-title"].replace(/\(/g,"").replace(/\)/g,"");}}
                                            <b {{?it.banphone!=="0"}}class="content-disabled"{{?}} id="phrasebook_textarea_{{=x}}" data-type='{{=it.data[x]["data-type"]}}'  data-title='{{=dataTitle}}' {{? it.data[x]["data-type"]=='calc' }} data-value="{{=it.data[x]['data-value']}}"{{?}}>{{if(it.data[x]["data-type"]==="checkbox"&&it.type==='value'){ }}{{? it.data[x]["value"]==="on"}}是{{?? it.data[x]["value"]===""}}否{{?}}{{}else{}} {{=it.data[x]["value"]}} {{}}} </b>
                                            {{if(it.banphone==="0"){ }}
                                            <div style="margin:0.5rem;" class="button button-fill" onclick="openSelectPhrasebook('phrasebook_textarea_{{=x}}')">常用语</div>
                                            {{}}}
                                            {{??it.data[x]["data-type"]==="signimg"&&it.type==='enable'}}
                                            {{var dataTitle=it.data[x]["data-title"].replace(/\(/g,"").replace(/\)/g,"");}}
                                            <b {{?it.banphone!=="0"}}class="content-disabled"{{?}} id="phrasebook_textarea_{{=x}}" data-type='{{=it.data[x]["data-type"]}}'  data-title='{{=dataTitle}}' {{? it.data[x]["data-type"]=='calc' }} data-value="{{=it.data[x]['data-value']}}"{{?}}>{{if(it.data[x]["data-type"]==="checkbox"&&it.type==='value'){ }}{{? it.data[x]["value"]==="on"}}是{{?? it.data[x]["value"]===""}}否{{?}}{{}else{}} {{=it.data[x]["value"]}} {{}}} </b>
                                            {{if(it.banphone==="0"){ }}
                                            <div style="margin:0.5rem;" class="button button-fill" onclick="openSelectPstamp('pstamp_textarea_{{=x}}')">签章</div>
                                            {{}}}
                                            {{??}}
                                            {{var dataTitle=it.data[x]["data-title"].replace(/\(/g,"").replace(/\)/g,"");}}
                                            <b {{?it.banphone!=="0"}}class="content-disabled"{{?}} data-type='{{=it.data[x]["data-type"]}}'  data-title='{{=dataTitle}}' {{? it.data[x]["data-type"]=='calc' }} data-value="{{=it.data[x]['data-value']}}"{{?}}>{{if(it.data[x]["data-type"]==="checkbox"&&it.type==='value'){ }}{{? it.data[x]["value"]==="on"}}是{{?? it.data[x]["value"]===""}}否{{?}}{{}else{}} {{=it.data[x]["value"]}} {{}}} </b>
                                            {{?}}
                                          </div>


                                        </div>
                                      </div>
                                      {{? it.data[x]["data-type"]=="user"}}

                                            <div class="item-content select-item-content" style="display:block !importance;">
                                              <div class="selected-item-content" id="data_{{=it.data[x]['data-id']}}" >

                                              </div>
                                            </div>
                                      {{?}}

                                       {{? it.type==='enable'}}
                                        <script>
                                           $("#data-noempty-dot{{=x}}").each(function()
                                           {
                                                checkItemObj=typeof(checkItemObj)=="undefined"?{}:checkItemObj;
                                                var key=$(this).attr("data-noempty-dot");
                                                if(checkItemObj[key])
                                                {
                                                   var value=checkItemObj[key];
                                                   if(value=="notempty")
                                                   {
                                                      $(this).show();
                                                   }
                                                }

                                           });
                                        </script>
                                        {{?}}

                                      {{? it.data[x]["data-type"]==="user"&&it.type==='value'}}
                                      <script>
                                        var selectData='{{=it.data[x]["value"]}}';
                                        if(selectData)
                                        {
                                            var selectDataArr=selectData.split(",");
                                            var selectDataStr='',dataList='';
                                            if(selectData.indexOf("u_")===-1)
                                            {
                                                dataList=Ibos.data.department;
                                            }
                                            else
                                            {
                                                dataList=Ibos.data.user;
                                            }
                                            for(var x in selectDataArr)
                                            {

                                                if(dataList[selectDataArr[x]])
                                                {
                                                    selectDataStr+='<div class="select-item-no-close" style="margin-left:3px;">'+dataList[selectDataArr[x]].text+'</div>'
                                                }
                                                else
                                                {
                                                    selectDataStr+='<div class="select-item-no-close" style="margin-left:3px;">'+selectDataArr[x]+'</div>';
                                                }

                                            }
                                            $("#data_{{=it.data[x]['data-id']}}").html(selectDataStr);
                                            if($("#data_{{=it.data[x]['data-id']}}").height()>150)
                                            {
                                                $("#data_{{=it.data[x]['data-id']}}").addClass("user-much-hide");
                                                $("#data_{{=it.data[x]['data-id']}}").click(function()
                                                {
                                                    $(this).toggleClass("user-much-hide");
                                                });
                                            }
                                        }
                                      </script>
                                      {{?}}

                                    </li>
                                {{ }else{ }}
                                   <div style="display:none">
                                    {{=it.data[x]['value']}}
                                   </div>
                                {{ } }}

                              {{ } }}
                              {{ } else{ }}
                              <li style="padding:1rem;text-align:center">暂没内容</li>
                              {{ } }}
                            </ul>
                         </div>
                      </div>
                    </div>


             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //空模板
        nullTpl:function()
        {
            var tpl=(function(){/*
                <div style="width:100%;height:10rem;text-align:center">
                            <img style="display:inline-block;height:30%;margin-top:3rem;" src="../../image/oldImage/noContent_yet.png">
                            <br>
                            <span>暂没内容</span>
                        </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //列表控件新增表单模板
        newListViewTpl:function()
        {
            var tpl=(function(){/*
                {{for(var x=0;x<it.data.length;x++){}}
                {{if(it.data[x]["data-type"]==="listview"){}}
                 <div class="pop-up pop-move-down  flex-v-content listview-popup{{=it.data[x]["itemid"]}}" id='listview-popup{{=it.data[x]["itemid"]}}' style="z-index:10201;margin:0;padding:0;">
                     <h3 style="padding:10px">新增{{=it.data[x]["data-title"]}}</h3>
                     <div class="list-block"  style="height:90%;overflow-y:auto;margin:0;padding-bottom:40px;">
                        <ul style="background-color:white;" data-add-title="{{=it.data[x]["data-title"]}}" class="list-view-sub-content">
                         {{ for(var i in it.data[x]["value-mobile-colvalue"]){ }}
                           <li class="" {{? i==="序号"}} style="display:none;"{{?}}>
                               <div class="item-content">
                                   <div class="item-media"><i class="icon icon-form-name"></i></div>
                                   <div class="item-block">
                                       <div class="item-title label">
                                       {{=i}}
                                       {{if((it.data[x]['value-mobile-coltype'][i]==="user"||it.data[x]['value-mobile-coltype'][i]==="department")&&it.type==="enable"){ }} <span class="fa fa-plus pull-right listview-select-{{=it.data[x]['value-mobile-coltype'][i]}}" data-selected='[]' data-input-id="select-add-input-{{=i}}" data-content-id="select-add-content-{{=i}}" id="listview-add-select-btn-{{=i}}"  style="color:#00a7f7;font-size:18px !important;"></span>
                                       {{ } }}
                                       </div>
                                       <div class="item-input {{?it.data[x]['value-mobile-coltype'][i]=='date'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh:ii)'||it.data[x]['value-mobile-coltype'][i]=='date(yyyy-mm-dd hh:ii:ss)'||it.data[x]['value-mobile-coltype'][i]=='date(hh:ii)'}}workflow-listview-datepicker{{?}}">

                                           {{if(it.data[x]['value-mobile-coltype'][i]==='select'){ }}
                                           <select data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" class="lv-add-input" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">
                                               {{ for(var optsitem=0,colvalueArr=it.data[x]['value-mobile-colvalue'][i]?it.data[x]['value-mobile-colvalue'][i].split(","):[];optsitem<colvalueArr.length;optsitem++){}}
                                                 <option value="{{=colvalueArr[optsitem]}}">{{=colvalueArr[optsitem]}}</option>
                                               {{ } }}
                                              </select>
                                            {{ }else if(it.data[x]['value-mobile-coltype'][i]==='checkbox'||it.data[x]['value-mobile-coltype'][i]==='radio'){ }}
                                                 <ul class="lv-add-input" data-input-type="checkbox" data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">
                                                 {{ for(var optsitemCheckbox=0,colvalueArrCheckbox=it.data[x]['value-mobile-colvalue'][i]?it.data[x]['value-mobile-colvalue'][i].split(","):[];optsitemCheckbox<colvalueArrCheckbox.length;optsitemCheckbox++){}}
                                                 <li>
                                                     <label class="label-checkbox item-content">
                                                       <input class="checkbox-input"  value="{{=colvalueArrCheckbox[optsitemCheckbox]}}"  name="{{=i}}" type="{{=it.data[x]['value-mobile-coltype'][i]}}" >
                                                       <div class="item-media"><i class="icon icon-form-checkbox"></i>{{=colvalueArrCheckbox[optsitemCheckbox]}}</div>
                                                     </label>
                                                  </li>
                                                 {{ } }}
                                                 </ul>
                                            {{ }else if(it.data[x]['value-mobile-coltype'][i]==='textarea'){ }}
                                            <textarea data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" class="lv-add-input" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" placeholder="请输入{{=i}}" value=""></textarea>
                                           {{ }else if(it.data[x]['value-mobile-coltype'][i]==='number'){ }}
                                               <input data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" class="lv-add-input" min="0" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="number" placeholder="请输入{{=i}}" value="">
                                           {{ }else if(it.data[x]['value-mobile-coltype'][i]==='user'||it.data[x]['value-mobile-coltype'][i]==='department'){ }}
                                               <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416;margin:0 !important" >
                                                 <div class="lv-selected-item-content" id="select-add-content-{{=i}}" data-target-id="select-add-input-{{=i}}" data-btn-id="listview-add-select-btn-{{=i}}">




                                                 </div>
                                               </div>
                                               <input data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" data-name="{{=i}}" class="lv-add-input" type="hidden" value="" id="select-add-input-{{=i}}">
                                           {{ }else if(it.data[x]['value-mobile-coltype'][i]==='calc'){ }}
                                                <b class="lv-add-input" data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" data-type="lv-calc" data-lv-calc="{{=it.data[x]['value-mobile-colvalue'][i]}}" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}"></b>
                                           {{ }else{ }}
                                              <input data-colvalue="{{=it.data[x]['value-mobile-colvalue'][i]}}" data-type="{{=it.data[x]['value-mobile-coltype'][i]}}" class="lv-add-input" data-format="{{=it.data[x]['value-mobile-coltype'][i]}}" {{if(it.data[x]["value-mobile-sumflag"][i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="text" placeholder="请输入{{=i}}" >
                                           {{ } }}



                                       </div>
                                   </div>
                               </div>
                           </li>
                          {{ } }}
                         </ul>
                     </div>
                     <div class="popup-footer clearfix" style="position:absolute;bottom:0">
                         <span class="pull-left close-popup pop-up-close" data-pop-up-close="listview-popup{{=it.data[x]["itemid"]}}">关闭</span>
                         <span class="pull-right pop-up-close" data-pop-up-close="listview-popup{{=it.data[x]["itemid"]}}" data-sumflag='{{=it.data[x]["value-mobile-sumflagstr"]}}' data-title="{{=it.data[x]['data-lv-title']}}" onclick="addListItem(this,'listview-popup{{=it.data[x]["itemid"]}}','{{=it.data[x]["itemid"]}}')">确定</span>
                     </div>
                 </div>
                 {{}}}
                 {{}}}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //列表控件表单
        listViewItemTpl:function()
        {
            var tpl= (function() {/*
                              <li data-title="{{=it.listviewtitle}}" class="item-content list-view-item" data-no="{{=it['list']['no']}}" data-toggle="list-view-sub-item{{=it['list']['no']}}" style="padding-left:0">
                                  <div class="item-media"><i class="icon icon-f7"></i></div>
                                  <div class="item-inner">
                                      <div class="item-title">
                                      <div class="working-step">{{=it['list']['no']}}</div>
                                      {{for(var j in it.list){}}
                                      {{if(j!=="no"||j!=="序号"){ }}
                                       {{=j}}:{{=it.list[j]}}|
                                      {{ } }}
                                      {{ } }}
                                      </div>
                                      <div class="item-after kill-maopao">
                                          <a class="remove-list-view-item" onclick="removeListviewItem(this)">删除</a>
                                      </div>
                                  </div>

                                  <div  style="display:none"></div>


                              </li>
                              <li>
                              <ul class="list-view-sub-content">
                              {{ for(var i in it.list){ }}


                              <li class="list-view-sub list-view-sub-item{{=it['list']['no']}}" data-no="{{=it['list']['no']}}" {{? i==="序号"||i==="no"}} style="display:none;"{{?}}>
                                  <div class="item-content">
                                      <div class="item-media"><i class="icon icon-form-name"></i></div>
                                      <div class="item-block">
                                          <div class="item-title label">{{=i}} {{if(it.type[i]==="user"||it.type[i]==="department"){ }} <span class="fa fa-plus pull-right listview-select-{{=it.type[i]}}"
                                            {{var lvStrArr=[];}}
                                            {{for(var lvuseritem3=0,lvuserArr3=it.list[i].split(",");lvuseritem3<lvuserArr3.length;lvuseritem3++){ }}
                                                {{if(it.type[i]==="user"){ }}
                                                    {{if(Ibos.data.user[lvuserArr3[lvuseritem3]]){ lvStrArr.push({uid:Ibos.data.user[lvuserArr3[lvuseritem3]].id.replace("u_",""),realname:Ibos.data.user[lvuserArr3[lvuseritem3]].text}); }}

                                                    {{ } }}
                                                {{ }else{}}
                                                     {{if(Ibos.data.department[lvuserArr3[lvuseritem3]]){ lvStrArr.push({depid:Ibos.data.department[lvuserArr3[lvuseritem3]].id.replace("d_",""),depname:Ibos.data.department[lvuserArr3[lvuseritem3]].text}); }}

                                                    {{ } }}
                                                {{ } }}
                                            {{ } }}
                                            {{lvStrArr=JSON.stringify(lvStrArr);}}
                                             data-selected='{{=lvStrArr}}'

                                           data-input-id="select-input-add-{{=it['list']['no']}}-{{=i}}" data-content-id="select-content-add-{{=it['list']['no']}}-{{=i}}" id="listview-select-btn-add-{{=it['list']['no']}}-{{=i}}"  style="color:#00a7f7;"></span>{{ } }}</div>
                                          <div class="item-input {{?it.type[i]=='date'||it.type[i]=='date(yyyy)'||it.type[i]=='date(yyyy-mm)'||it.type[i]=='date(yyyy-mm-dd)'||it.type[i]=='date(yyyy-mm-dd hh)'||it.type[i]=='date(yyyy-mm-dd hh:ii)'||it.type[i]=='date(yyyy-mm-dd hh:ii:ss)'||it.type[i]=='date(hh:ii)'}}workflow-listview-datepicker{{?}}">

                                              {{if(it.type[i]==='select'){ }}
                                              <select class="selected-item-input" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">
                                                  {{if(typeof it.colvalue[i]==="string"){}}
                                                  {{ for(var optsitem=0,colvalueArr=it.colvalue[i]?it.colvalue[i].split(","):[];optsitem<colvalueArr.length;optsitem++){}}
                                                    <option value="{{=colvalueArr[optsitem]}}" {{if(it.list[i]===colvalueArr[optsitem]){ }}selected{{ } }}>{{=colvalueArr[optsitem]}}</option>
                                                  {{ } }}
                                                  {{}}}
                                                 </select>
                                               {{ }else if(it.type[i]==='checkbox'||it.type[i]==='radio'){ }}
                                                    <ul data-type="checkbox" class="selected-item-input" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">
                                                     {{if(typeof it.colvalue[i]==="string"){}}
                                                    {{ for(var optsitemCheckbox=0,colvalueArrCheckbox=it.colvalue[i]?it.colvalue[i].split(","):[];optsitemCheckbox<colvalueArrCheckbox.length;optsitemCheckbox++){}}
                                                    <li>
                                                        <label class="label-checkbox item-content">
                                                          <input class="checkbox-input" value="{{=colvalueArrCheckbox[optsitemCheckbox]}}"
                                                           {{if(typeof it.list[i]==="string"){}}
                                                               {{var valueArr=it.list[i].split(",");}}
                                                               {{for(var valItem=0;valItem<valueArr.length;valItem++){ }}
                                                                 {{if(valueArr[valItem]===colvalueArrCheckbox[optsitemCheckbox]){ }}checked{{ } }}
                                                               {{ } }}
                                                           {{ } }}
                                                          name="{{=i}}" type="{{=it.type[i]}}">
                                                          <div class="item-media"><i class="icon icon-form-checkbox"></i>{{=colvalueArrCheckbox[optsitemCheckbox]}}</div>
                                                        </label>
                                                     </li>
                                                    {{ } }}
                                                    {{ } }}
                                                    </ul>
                                               {{ }else if(it.type[i]==='textarea'){ }}
                                               <textarea class="selected-item-input" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" placeholder="请输入{{=i}}" value="{{=it.list[i]}}">{{=it.list[i]}}</textarea>
                                              {{ }else if(it.type[i]==='number'){ }}
                                                  <input class="selected-item-input" min="0" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="number" placeholder="请输入{{=i}}" value="{{=it.list[i]}}">
                                              {{ }else if(it.type[i]==='user'||it.type[i]==='department'){ }}
                                                  <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416;margin:0 !important" >
                                                    <div class="lv-selected-item-content" id="select-content-add-{{=it['list']['no']}}-{{=i}}" data-target-id="select-input-add-{{=it['list']['no']}}-{{=i}}" data-btn-id="listview-select-btn-add-{{=it['list']['no']}}-{{=i}}">
                                                         {{if(typeof it.list[i]==="string"){}}
                                                           {{for(var lvuseritem2=0,lvuserArr2=it.list[i].split(",");lvuseritem2<lvuserArr2.length;lvuseritem2++){ }}
                                                                {{if(it.type[i]==="user"){ }}
                                                                    {{if(Ibos.data.user[lvuserArr2[lvuseritem2]]){ var userid2=Ibos.data.user[lvuserArr2[lvuseritem2]].id.replace("u_",""); }}
                                                                        <div class="select-item"  data-id="{{=userid2}}">{{=Ibos.data.user[lvuserArr2[lvuseritem2]].text}}</div>
                                                                    {{ } }}
                                                                {{ }else{}}
                                                                     {{if(Ibos.data.department[lvuserArr2[lvuseritem2]]){ var depid2=Ibos.data.department[lvuserArr2[lvuseritem2]].id.replace("d_",""); }}
                                                                    <div class="select-item" data-id="{{=depid2}}" >{{=Ibos.data.department[lvuserArr2[lvuseritem2]].text}}</div>
                                                                    {{ } }}
                                                                {{ } }}
                                                            {{ } }}
                                                        {{ } }}
                                                    </div>
                                                  </div>
                                                  <input data-name="{{=i}}" class="selected-item-input" type="hidden" value="{{=it.list[i]}}" id="select-input-add-{{=it['list']['no']}}-{{=i}}">
                                              {{ }else if(it.type[i]==='calc'){ }}
                                                <b class="selected-item-input" data-type="lv-calc" data-lv-calc="{{=it.colvalue[i]}}" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}">{{=it.list[i]}}</b>
                                              {{ }else{ }}
                                                 <input class="selected-item-input" data-format="{{=it.type[i]}}" {{if(it.sumflag[i]==="1"){ }} data-sum-param="{{=i}}" {{ } }} data-name="{{=i}}" type="text" placeholder="请输入{{=i}}" value="{{=it.list[i]}}">
                                              {{ } }}
                                          </div>
                                      </div>
                                  </div>
                              </li>


                              {{ } }}
                              </ul>
                              </li>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //会签意见表单
        processContentTpl:function()
        {
            var tpl= (function() {/*
                   <div class="card" id="process-content">
                     <div class="workflow-item">
                        <h3 style="padding:0.75rem;width:100%;" class="icon icon-edit workflow-item-title-active">
                            办理意见
                        </h3>
                        <div class="workflow-sub-item list-block workflow-item-active {{?it.banphone!=="0"}}content-disabled{{?}}" style="display:none">
                            <textarea id="remindContent" name="content" placeholder="请输入办理意见"></textarea>
                            {{?it.banphone==="0"}}
                            {{?}}
                            <br>
                            <div style="height:150px;"></div>
                        </div>

                      </div>
                   </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //工作流表单区更多按钮
        workflowMainBtnTpl:function()
        {
            var tpl= (function() {/*

                <div class="col-33 item" data-target="attach-content" ><div class="bottomControlButton attchButton"></div><div class="bottomControlText">附件(<span id="attach-count">0</span>)</div></div>
                {{? it['rp']['opflag']=="1"&&it['process']['banphone']==="0"}}
                 <div class="col-33 item"  onclick="openWorkflowNext()" id="hostButton"><div class="bottomControlButton nextButton"></div><div class="bottomControlText">转交</div></div>
                 {{??it['process']['banphone']==="0"}}
                 <div class="col-33 item" onclick="finish()" id="siginButton"><div class="bottomControlButton readingOffice"></div><div class="bottomControlText">阅办</div></div>
                 {{?}}
                 {{?it['process']['banphone']==="0"}}
                <div class="col-33 item" data-target="operate-content"><div class="bottomControlButton lookMore"></div><div class="bottomControlText">更多</div></div>
                 {{?}}

            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //工作流表单区更多操作按钮
        workflowBtnTpl:function()
        {
            var tpl= (function() {/*
                <div class="row">
                {{? it['rp']['opflag']&&it['rp']['opflag']!=0}}

                {{?}}
               {{? it["process"]["processid"]!=="1"&&it['rp']['opflag']!=="0"}}
                     <span class="btn btn-tranparent more-btn open-about col-33 text-center"  onclick="selectReminder()">
                        <div class="moreButtonIcon moreHuitui"></div><br>
                        <span class="moreButtonText" style="font-size:14px">回退</span>
                     </span>
                     <span class="btn btn-tranparent more-btn open-about col-33 text-center"  onclick="sign()">
                        <div class="moreButtonIcon moreHuiqian"></div><br>
                        <span class="moreButtonText" style="font-size:14px">会签</span>
                     </span>
                     <span class="btn btn-tranparent more-btn open-about col-33 text-center"  onclick="oversee()" style="display:none;">
                        <div class="moreButtonIcon moreDuban"></div><br>
                        <span class="moreButtonText" style="font-size:14px">督办</span>
                     </span>
               {{?}}
               <!--{{? it["process"]["processid"]!=="1"&&it['rp']['opflag']!=="0"}}
                     <span class="btn btn-tranparent more-btn open-about col-25 text-center"  onclick="foujue()">
                        <span class="icon icon-edit"></span>
                        <br>
                        <span style="font-size:14px">否决</span>
                     </span>

               {{?}}-->
               {{? it.isdel===true}}
                     <span class="btn btn-tranparent more-btn open-about col-33 text-center"  onclick="deleteWorkflow()">
                        <span class="icon icon-remove"></span>
                        <br>
                        <span style="font-size:14px">删除</span>
                     </span>
               {{?}}
                     <span class="btn btn-tranparent more-btn open-about col-33 text-center"  onclick="transactor()">
                        <div class="moreButtonIcon moreChuanyue"></div><br>
                        <span class="moreButtonText" style="font-size:14px">传阅</span>
                     </span>

               </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
           /* {{? it['rp']['opflag']==="0"}}
        <span class="btn btn-primary open-about col-33" onclick="finish()">办理完毕</span>
            {{?}}
            {{? it['rp']['opflag']==="1"}}
        <span class="btn btn-success col-33"  onclick="openWorkflowNext()">转交下一步</span>
            {{?}}*/
        },
        //选择人员模板
        selectUserItemTpl:function()
        {
            var tpl= (function() {/*
                {{for(var x in it){ }}
                {{if(x!="remove"){ }}
                <div class="select-item" data-id="{{=it[x].uid}}">{{=it[x].realname}}</div>
                {{ } }}
                {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //选择部门模板
        selectDepItemTpl:function()
        {
            var tpl=(function() {/*
                {{for(var x in it){ }}
                {{if(x!="remove"){ }}
                <div class="select-item" data-id="{{=it[x].depid}}" >{{=it[x].depname}}</div>
                {{ } }}
                {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //选择回退步骤模板
        selectFollbackStepTpl:function()
        {
            var tpl= (function() {/*
             {{?it["process"]["allowback"]=="1"}}
                 <h3>回退上一步骤</h3>
                 <input type="hidden" id="backtype" value="1">
             {{??}}
             <h3>回退意见</h3>
             <textarea id="fallback_content" style="margin:0 !important;height:5rem;padding:15px;" value="" placeholder="请输入办理意见"></textarea>
              <h3>选择回退步骤</h3>
              <input type="hidden" id="backtype" value="2">
             <form id="form_pres">
                <ul  style="padding:10px;">
                    {{for(var x in it.backlist){ }}
                    {{if(x!="remove"){ }}
                     <li>
                        <label class="label-checkbox item-content">
                            <input {{? x==0}} checked {{?}}  type="radio" value="{{=it.backlist[x].id}}" name="prcs">
                            <div class="item-media"><i class="icon icon-form-checkbox"></i>&nbsp;{{=it.backlist[x].id}}、{{=it.backlist[x].name}}({{=it.backlist[x].username}})</div>
                        </label>
                    </li>
                    {{ } }}
                    {{ } }}
                </ul>
             </form>
             {{?}}
             <h3>选择提醒方式</h3>
             <ul style="padding:10px;">
                <li>
                 <div class="item-content" style="padding-left:0;">
                     <div class="item-block">
                       <div class="item-input" style="">
                         <ul>
                         <!--短信提醒功能（暂时已屏蔽）-->
                          	<li style="display:none">
                                <label class="label-checkbox item-content">
                                    <input name="back_remindways" value="1" type="checkbox" >
                                    <div class="item-media"><i class="icon icon-form-checkbox"></i>短信提醒</div>
                                </label>
                            </li>
                         	<li>
                                <label class="label-checkbox item-content">
                                    <input name="back_remindways" value="2" type="checkbox" checked>
                                    <div class="item-media"><i class="icon icon-form-checkbox"></i>APP推送提醒</div>
                                </label>
                            </li>
                         </ul>
                       </div>
                     </div>
                 </div>
                </li>
             </ul>
              <h3>提醒内容</h3>
              <textarea id="remind" style="margin:0 !important;height:5rem;padding:15px;" value="" placeholder="请输入提醒内容"></textarea>
              <p><a href="#" class="pull-left pop-up-close" data-pop-up-close="pop-about">关闭</a><a href="#" class="pull-right"  onclick="fallback()">进行回退操作</a></p>
              <p></p>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //选择否决步骤模板
        foujueStepTpl:function()
        {
            var tpl= (function() {/*
             {{?it["process"]["allowback"]=="1"}}
                 <h3>回退上一步骤</h3>
                 <input type="hidden" id="backtype1" value="1">
             {{??}}
              <h3>选择否决步骤</h3>
              <input type="hidden" id="backtype1" value="2">
             <form id="form_pres">
                <ul  style="padding:10px;">
                    {{for(var x in it.backlist){ }}
                    {{if(x!="remove"){ }}
                     <li>
                        <label class="label-checkbox item-content">
                            <input {{? x==0}} checked {{?}}  type="radio" value="{{=it.backlist[x].id}}" name="prcs">
                            <div class="item-media"><i class="icon icon-form-checkbox"></i>&nbsp;{{=it.backlist[x].id}}、{{=it.backlist[x].name}}({{=it.backlist[x].username}})</div>
                        </label>
                    </li>
                    {{ } }}
                    {{ } }}
                </ul>
             </form>
             {{?}}
             <ul style="padding:10px;">
                <li>
                 <div class="item-content" style="padding-left:0;">
                     <div class="item-block">
                       <div class="item-title label">提醒方式 </div>
                       <div class="item-input" style="">
                         <ul>
                         <!--短信提醒功能（暂时已屏蔽）-->
                              <li style="display:none">
                                <label class="label-checkbox item-content">
                                    <input name="back_remindways1" value="1" type="checkbox">
                                    <div class="item-media"><i class="icon icon-form-checkbox"></i>短信提醒</div>
                                </label>
                             </li>

                              <li>
                                <label class="label-checkbox item-content">
                                    <input name="back_remindways1" value="2" type="checkbox">
                                    <div class="item-media"><i class="icon icon-form-checkbox"></i>APP推送提醒</div>
                                </label>
                              </li>
                         </ul>
                       </div>
                     </div>
                 </div>
                </li>
             </ul>
             <h3>提交意见</h3>
             <textarea id="yijian" style="margin:0 !important;height:5rem;padding:15px;" value=""></textarea>
              <h3>提醒内容</h3>
              <textarea id="remind1" style="margin:0 !important;height:5rem;padding:15px;" value=""></textarea>
              <p><a href="#" class="pull-left pop-up-close" data-pop-up-close="pop-foujue">关闭</a><a href="#" class="pull-right pop-up-close" data-pop-up-close="pop-foujue" onclick="fallback1()">进行否决操作</a></p>
              <p></p>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //会签模板
        processTpl:function()
        {
            var tpl=(function(){/*

                            <div class="buttons-tab">
                                <a href="#sign" class="tab-link active button">已签</a>
                                <a href="#nosign" class="tab-link button">未签</a>

                              </div>
                              <div class="content-block">
                                <div class="tabs">
                                  <div id="sign" class="tab active">
                                    {{? JSON.stringify(it.feedback)!=="{}"&&JSON.stringify(it.feedback)!=="[]"}}
                                    <div class="time-tree-content">
                                      <div class="time-tree-items">
                                        {{ for(var x in it.feedback){ }}
                                        {{if(x!="remove"){ }}
                                        <div class="time-tree-item">
                                          <div class="time-tree-item-content">
                                            <div class="time-tree-point f f-ok">
                                            </div>
                                            <p>
                                              <span class="time-tree-title">{{=it.feedback[x].name}}({{=it.feedback[x].flagdesc}})</span><br>
                                              <span class="time-tree-title" style="font-weight:normal">【  {{?it.feedback[x].content!==" "}}{{=it.feedback[x].content}}{{?}} {{?it.feedback[x].content==""}}暂无意见{{?}} 】</span><br>
                                              <span class="time-tree-title">
                                                <strong >{{=it.feedback[x].autoValue}}</strong>|
                                                <strong>{{=it.feedback[x].edittime}}</strong>
                                              </span>
                                              <br>
                                            </p>
                                          </div>

                                        </div>
                                        {{}}}
                                        {{}}}
                                      </div>
                                    </div>
                                    {{?}}
                                    {{? it.feedback.length===0}}
                                        <div style="width:100%;height:10rem;text-align:center">
                                            <img style="display:inline-block;width:30%;margin-top:3rem;" src="../../image/oldImage/noContent_yet.png">
                                            <br>
                                            <span>暂没内容</span>
                                        </div>
                                    {{?}}
                                  </div>
                                  <div id="nosign" class="tab">
                                    <div class="content-block">
                                        <div id="sign" class="tab active">
                                    {{? JSON.stringify(it.nofeedback)!=="{}"&&JSON.stringify(it.nofeedback)!=="[]"}}
                                    <div class="time-tree-content">
                                      <div class="time-tree-items">
                                        {{ for(var x in it.nofeedback){ }}
                                        {{if(x!="remove"){ }}
                                        <div class="time-tree-item">
                                          <div class="time-tree-item-content">
                                            <div class="time-tree-point f f-wait">
                                            </div>
                                            <p>
                                              <span class="time-tree-title">{{=it.nofeedback[x].name}}({{=it.nofeedback[x].flagdesc}})</span><br>
                                              <span class="time-tree-title">
                                                <strong >{{=it.nofeedback[x].autoValue}}</strong>
                                              </span>
                                              <br>
                                            </p>
                                          </div>

                                        </div>
                                        {{}}}
                                        {{}}}
                                      </div>
                                    </div>
                                    {{?}}
                                    {{? it.nofeedback.length===0}}
                                        <div style="width:100%;height:10rem;text-align:center">
                                            <img style="display:inline-block;width:30%;margin-top:3rem;" src="../../image/oldImage/noContent_yet.png">
                                            <br>
                                            <span>暂没内容</span>
                                        </div>
                                    {{?}}
                                    </div>
                                  </div>

                              </div>




            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

            return tpl;
        },
        //标题模板
        headerTpl:function()
        {
            var tpl=(function(){/*
                           <h3>{{=it.name}}<br><span style="font-size:12px;font-weight:normal">拟稿人:<b>{{=it.realname}}</b></sppan></h3>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

            return tpl;
        },
        //公共附件模板
        attachTpl:function()
        {
            var tpl=(function(){/*
                                <h4  style="padding:0.22rem;border-top:1px solid #faebd7;">公共附件</h4>
                                {{?it&&Object.prototype.toString.call(it) === '[object Array]'}}
                                <div id="commonAttach">
                                    <div style="width:100%;height:40px;text-align:center;">
                                        <img style="display:inline-block;height:100%;" src="../../image/oldImage/noContent_yet.png">
                                    </div>
                                </div>
                                {{??}}
                                <div id="commonAttach">
                                {{for(var x in it){ }}
                                {{if(x!="remove"){ }}
                                 <div class="row attch-item">
                                     <div class="col-15">
                                         <span class="{{? it[x].filetype=='docx'||it[x].filetype=='doc'||it[x].filetype=='wps'}}word{{?? it[x].filetype=='pdf'}}pdf{{?? it[x].filetype=='xlsx'||it[x].filetype=='xlsm'||it[x].filetype=='xls'}}excel{{?? it[x].filetype=='png'||it[x].filetype=='jpg'}}img{{??}}nofile{{?}}"></span>
                                     </div>
                                     <div class="col-85 attch-name">
                                         <div class="row">{{=it[x].filename}}</div>
                                         <div class="row attach-detail">
                                             <span class="pull-left" id="from_name{{=x}}">
                                             </span>
                                             <span class="pull-left" style="margin-left:10px;">{{=it[x].filesize}}</span>
                                             <span class="pull-right">{{=it[x].date}}</span>
                                         </div>
                                         <script>
                                         if($("#from_name{{=x}}").length)
                                         {
                                             var user=Ibos.data.user;
                                             if(user['u_{{=it[x].uid}}'])
                                             {
                                                $("#from_name{{=x}}").text(user['u_{{=it[x].uid}}'].text);
                                             }

                                         }

                                         </script>
                                     </div>
                                     <div class="col-100 clearfix">
                                           {{?it[x].read&&it[x].read==true}}
                                            <div class="btn-upload-op">
                                                <a onclick="$api.fileDownload('{{=it[x].downurl}}' , '{{=it[x].filename}}')">查看</a>
                                            </div>
                                            {{?}}
                                            {{?it[x].down&&it[x].down==true}}
                                            <div class="btn-upload-op">
                                                <a onclick="$api.downloadAttach('{{=it[x].downurl}}' , '{{=it[x].filename}}')">下载</a>
                                            </div>
                                            {{?}}

                                            {{?it[x].delete&&it[x].delete==true}}
                                            <div  class="btn-upload-op btn-danger" style="background-color: #FFFFFF;display:none">
                                                <a onclick="deleteAttach(this,'{{=it[x].aid}}')">删除</a>
                                            </div>
                                            {{?}}
                                     </div>
                                 </div>

                                {{}}}
                                {{}}}
                                </div>
                                {{?}}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //参阅附件模板
        attachReadTpl:function()
        {
            var tpl=(function(){/*
                                <h4 style="padding:0.22rem;border-top:1px solid #faebd7;">参阅附件</h4>
                                {{?it&&Object.prototype.toString.call(it) === '[object Array]'}}
                                 <div  id="readAttach">
                                    <div style="width:100%;height:40px;text-align:center;">
                                        <img style="display:inline-block;height:70%;" src="../../image/oldImage/noContent_yet.png">
                                    </div>
                                 </div>
                                {{??}}
                                <div id="readAttach">
                                {{for(var x in it){}}
                                {{if(x!="remove"){ }}
                                 <div class="row attch-item">
                                     <div class="col-15">
                                         <span class="{{? it[x].filetype=='docx'||it[x].filetype=='doc'}}word{{?? it[x].filetype=='pdf'}}pdf{{?? it[x].filetype=='xlsx'||it[x].filetype=='xlsm'||it[x].filetype=='xls'}}excel{{?? it[x].filetype=='png'||it[x].filetype=='jpg'}}img{{??}}nofile{{?}}"></span>
                                     </div>
                                     <div class="col-85 attch-name">
                                         <div class="row">{{=it[x].filename}}</div>
                                         <div class="row attach-detail">
                                             <span class="pull-left" id="from_name{{=x}}">

                                             </span>
                                             <span class="pull-left" style="margin-left:10px;">{{=it[x].filesize}}</span>
                                             <span class="pull-right">{{=it[x].date}}</span>
                                         </div>
                                         <script>
                                          if($("#from_name{{=x}}").length)
                                          {
                                                var user=Ibos.data.user;
                                                if(user['u_{{=it[x].uid}}'])
                                                {
                                                     $("#from_name{{=x}}").text(user['u_{{=it[x].uid}}'].text);
                                                }

                                          }


                                         </script>
                                     </div>
                                     <div class="col-100 clearfix">

                                            {{?it[x].read&&it[x].read==true}}
                                            <div class="btn-upload-op">
                                                <a onclick="$api.fileDownload('{{=it[x].downurl}}' , '{{=it[x].filename}}')">查看</a>
                                            </div>
                                            {{?}}
                                             {{?it[x].down&&it[x].down==true}}
                                            <div class="btn-upload-op">
                                                <a onclick="$api.downloadAttach('{{=it[x].downurl}}' , '{{=it[x].filename}}')">下载</a>
                                            </div>
                                            {{?}}
                                            {{?it[x].delete&&it[x].delete==true}}
                                            <div  class="btn-upload-op btn-danger" style="display:none">
                                                <a onclick="deleteReadAttach(this,'{{=it[x].aid}}')">删除</a>
                                            </div>
                                            {{?}}
                                     </div>
                                 </div>

                                {{}}}
                                {{}}}
                                </div>
                                {{?}}

            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //查看附件模板
        viewattachTpl:function()
        {
            var tpl=(function(){/*
                            {{for(var x in it){ }}
                            <div class="row upload-item">
                                 <div class="col-15">
                                     <span class="{{? it[x].filetype=='docx'||it[x].filetype=='doc'}}word{{?? it[x].filetype=='pdf'}}pdf{{?? it[x].filetype=='xlsx'||it[x].filetype=='xlsm'||it[x].filetype=='xls'}}excel{{?? it[x].filetype=='png'||it[x].filetype=='jpg'}}img{{??}}nofile{{?}} file-type"></span>
                                 </div>
                                 <div class="col-66">
                                     <div>{{=it[x].filename}}</div>

                                 </div>
                                 <div class="col-15">

                                    <div class="btn-upload-op"  data-aid="{{=it[x].aid}}" data-filename="{{=it[x].filename}}" data-downurl="{{=it[x].downurl}}" data-filetype="{{=it[x].filetype}}" onclick="watchFile(this)" class="upload-watch" id="see_{{=it[x].aid}}">
                                       <a>查看</a>
                                    </div>
                                    <div class="btn-upload-op" onclick="$api.downloadAttach('{{=it[x].downurl}}' , '{{=it[x].filename}}')">
                                       <a>下载</a>
                                    </div>

                                 </div>
                             </div>
                             {{}}}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //上传附件模板
        uploadattachTpl:function()
        {
            var tpl=(function(){/*
                            <div class="row upload-item">
                                 <div class="col-15">
                                     <span class="{{? it.filetype=='docx'||it.filetype=='doc'}}word{{?? it.filetype=='pdf'}}pdf{{?? it.filetype=='xlsx'||it.filetype=='xlsm'||it.filetype=='xls'}}excel{{?? it.filetype=='png'||it.filetype=='jpg'||it.filetype=='gif'}}img{{??}}nofile{{?}} file-type"></span>
                                 </div>
                                 <div class="col-85">
                                     <div>{{=it.filename}}</div>
                                     <div class="progress-bar">
                                         <div class="progress-number" style="width:0%;" id="{{=it.id}}"></div>
                                     </div>
                                 </div>
                                 <div class="col-100 clearfix">
                                    <div class="btn-upload-op remove-upload-btn" id="rm_{{=it.id}}" data-remove="" onclick="removeUploadItem(this)">
                                        <a>删除</a>
                                    </div>

                                    <div class="btn-upload-op" data-aid="" data-filename="" data-downurl="" data-filetype="" onclick="watchFile(this)" class="upload-watch" id="see_{{=it.id}}" style="display:none;">
                                       <a>查看</a>
                                    </div>

                                 </div>
                             </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        uploadReadattachTpl:function()
        {
            var tpl=(function(){/*
                            <div class="row upload-item">
                                 <div class="col-15">
                                     <span class="{{? it.filetype=='docx'||it.filetype=='doc'}}word{{?? it.filetype=='pdf'}}pdf{{?? it.filetype=='xlsx'||it.filetype=='xlsm'||it.filetype=='xls'}}excel{{?? it.filetype=='png'||it.filetype=='jpg'||it.filetype=='gif'}}img{{??}}nofile{{?}} file-type"></span>

                                 </div>
                                 <div class="col-85">
                                     <div>{{=it.filename}}</div>
                                     <div class="progress-bar">
                                         <div class="progress-number" style="width:0%;" id="{{=it.id}}"></div>
                                     </div>
                                 </div>
                                 <div class="col-100 clearfix">
                                    <div class="btn-upload-op remove-upload-btn" id="rm_{{=it.id}}" data-remove="" onclick="removeReadUploadItem(this)">
                                        <a>删除</a>
                                    </div>

                                    <div class="btn-upload-op" data-aid="" data-filename="" data-downurl="" data-filetype="" onclick="watchFile(this)" class="upload-watch" id="see_{{=it.id}}" style="display:none;">
                                       <a>查看</a>
                                    </div>

                                 </div>
                             </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //工作办理页面隐藏的值
        hideInputTpl:function()
        {
            var tpl=(function(){/*
                <input type="hidden" name="key" value="{{=it.key}}">
                <input type="hidden" id="runid" name="runid" value="{{=it['run'].runid}}">
                <input type="hidden" name="hidden" value="{{=it.hidden}}">
                <input type="hidden" name="readonly" value="{{=it.readonly}}">
                <input type="hidden" name="attachmentid" value="{{=it['run'].attachmentid}}">
                <input type="hidden" name="readattachmentid" id='readattachmentid' value="{{=it['run'].readattachmentid}}" />
                <input type="hidden" name="fbattachmentid" value="">
                <input type="hidden" name="topflag" value="{{=it['rp'].topflag}}">
                <input type="hidden" name="saveflag" value="save">
                <input type="hidden" name="formhash" value="">
                <input type="hidden" name="workrelatedstr" value="{{=it['run'].workrelated}}">
                <input type="hidden" name="deptid" value="{{=it['flow'].deptid}}">
                <input type="hidden" id="opflag" name="opflag" value="{{=it['rp']['opflag']}}">
                <input id="flowprocessId" disabled type="hidden" name="flowprocess" value="{{=it['rp'].flowprocess}}">
                <input type="hidden" name="workrelatedstr" id="workrelatedstr" value="{{=it.workrelatedstr}}">
                <input type="hidden" name="cxsliststr" id="cxsstr" value='{{=it.cxsliststr}}'>
                <input type="hidden"  id="cxsstrhelp" value="{{=it.cxsstr}}">
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //转交页面
        selectNextStepTpl:function()
        {
            var tpl=(function(){/*
                           <div class="card">
                                <div class="card-header">
                                    <ul>
                                        <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">办理意见</div>
                                                      <div class="item-input" style="width:100% !important">
                                                          <textarea style="width:100%;" id="scontent"  value="" placeholder="请输入办理意见"></textarea>
                                                          <div style="margin:0.5rem;width:100%;" class="button button-fill" onclick="openSelectPhrasebook('scontent')">常用语</div>
                                                      </div>
                                                    </div>
                                                </div>
                                         </li>
                                         <div class="item-title label">选择下一步骤</div>
                                    {{? it.process["syncdeal"]==="0"}}
                                        {{for(var x in it.list){}}
                                        {{if(x!="remove"){}}
                                           {{if(typeof(it.list[x].notpass)==="undefined"){ }}
                                            <li>
                                                <label class="label-checkbox item-content" data-click="view_user_table">
                                                    <input data-pingfa="0" id="input{{=y}}" data-targetshow="target{{=x}}" {{? typeof(it.list[x].notpass)!=="undefined"}}disabled{{?}} type="radio" value="{{=x}}" name="prcs_check" {{? it.list[x].checked==="true"}}checked{{?}}>
                                                    <div class="item-media"><i class="icon icon-form-checkbox" ></i>&nbsp;<span class="{{? typeof(it.list[x].notpass)!=="undefined"}}working-step-no{{??}}working-step{{?}}">{{? it.list[x].isover}}结束流程{{??}}{{=it.prcsto[x]}}{{? typeof(it.list[x].notpass)!=="undefined"}}-条件不符{{?}}{{?}}</span>{{=it.list[x].prcsname}}</div>
                                                </label>
                                             </li>
                                            {{}}}
                                        {{}}}
                                        {{}}}
                                    {{??}}
                                        {{for(var y in it.list){}}
                                        {{if(x!="remove"){}}
                                        <li>
                                            <label class="label-checkbox item-content" data-click="view_user_table">
                                                <input data-pingfa="1" id="input{{=y}}" data-targetshow="target{{=y}}" {{? typeof(it.list[y].notpass)!=="undefined"}}disabled{{?}} type="checkbox" value="{{=y}}" name="prcs_check" >
                                                <div class="item-media"><i class="icon icon-form-checkbox"></i>&nbsp;<span >{{? it.list[y].isover}}结束流程{{??}}{{? typeof(it.list[y].notpass)!=="undefined"}}-条件不符{{?}}{{?}}</span>{{=it.list[y].prcsname}}</div>
                                            </label>
                                         </li>
                                         {{}}}
                                        {{}}}
                                        <li>
                                        </li>
                                    {{?}}
                                    </ul>
                                </div>
                                <div class="card-content">
                                    {{for(var y in it.list){}}
                                    {{if(y!="remove"){}}
                                    {{if(!it.list[y].isover){}}
                                    <div id="target{{=y}}" class='prc-item {{if(it.process["syncdeal"]==="0"){}} {{ if(typeof it.list[y]["selectArr"]!="undefined" ) { }} {{if(it.list[y]["selectArr"].display=="none;"){}}hidden{{  } }} {{ }else{ }} hidden {{ } }} {{ }else{ }} hidden{{ } }}'>
                                        <h3 style="padding:0 0.75rem;">{{=it.list[y].prcsname}}</h3>
                                        <div>

                                            <div class="list-block">
                                                <ul>
                                                {{ if(typeof it.list[y]["selectArr"]!="undefined"){ }}
                                                    {{if(it.process["userlock"]=="1"){ }}
                                                    <li class="">
                                                      <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">类型</div>
                                                          <div class="item-input">
                                                              <select name="topflag{{=y}}">
                                                                   <option value="0">{{=it.list[y]["selectArr"].Host}}</option>
                                                                   <option value="1">{{=it.list[y]["selectArr"].Firstreceiverhost}}</option>
                                                                   <option value="2">{{=it.list[y]["selectArr"].Nohost}}</option>
                                                              </select>
                                                          </div>
                                                        </div>
                                                      </div>
                                                   </li>
                                                   {{ }else{ }}
                                                   <input type="hidden" value="{{=it.list[y]["selectArr"].topdef}}" name="topflag{{=y}}"/>
                                                   {{ } }}
                                                   <li id="topflag{{=y}}">
                                                       <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">{{=it.list[y]["selectArr"].Host}}</div>
                                                          <div class="item-input" {{if(it.list[y]["selectArr"].hostAttr!="disabled"){ }} id="hostSelect{{=y}}" {{ } }} style="position: absolute;height: 100%;">
                                                             <input style="visibility: hidden" type="text" id="prcs_user_op_select{{=y}}" data-select="prcsop">
                                                             <input type="hidden" id="prcs_user_op{{=y}}" name="prcs_user_op{{=y}}" value="{{=it.list[y]['selectArr'].prcsOpUser}}">
                                                          </div>
                                                           <input type="hidden" id="ishashost{{=y}}" name="ishashost{{=y}}" value="{{=it.list[y]['selectArr'].ishashost}}">
                                                        </div>
                                                      </div>
                                                   </li>

                                                   <li class="topflag{{=y}}">
                                                        <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416">
                                                            <div data-id="{{=y}}" class="selected-item-content" id="prcs_user_op_select_content{{=y}}" data-target="hostSelect{{=y}}">

                                                            </div>
                                                        </div>
                                                   </li>
                                                   <script>
                                                        var user=Ibos.data.user;
                                                        $(function()
                                                        {
                                                            var userStr=$("#prcs_user_op{{=y}}").val();
                                                            if(userStr)
                                                            {
                                                                var userId=userStr.split(","),

                                                                 selectObj=[];
                                                                if(userId.length)
                                                                {

                                                                    for(var userIdItem in userId)
                                                                    {
                                                                         var realname=user[userId[userIdItem]].text;
                                                                         var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                         userId[userIdItem]=userId[userIdItem].replace("u_","");
                                                                         selectObj.push({realname:realname,uid:userId[userIdItem]});
                                                                    }

                                                                    var temStr=tem(selectObj);
                                                                    $("#hostSelect{{=y}}").attr("data-selected",JSON.stringify(selectObj));
                                                                    $("#prcs_user_op_select_content{{=y}}").html(temStr);
                                                                }
                                                            }


                                                           var defaultArr{{=y}}={{=it.list[y].selectArr.prcsuser}};

                                                            var defaultObj{{=y}}=[];

                                                            for(var defaultItem in defaultArr{{=y}})
                                                            {

                                                                if(Ibos.data.user[defaultArr{{=y}}[defaultItem]])
                                                                {
                                                                    var realname=Ibos.data.user[defaultArr{{=y}}[defaultItem]].text;

                                                                    var userid=defaultArr{{=y}}[defaultItem].replace("u_","");
                                                                    var obj={uid:userid,realname:realname};
                                                                    defaultObj{{=y}}.unshift(obj);
                                                                }

                                                            }

                                                             var topdef="{{=it.list[y]["selectArr"].topdef}}"==="2"?true:false;

                                                            $("#hostSelect{{=y}}").userSelect({
                                                                type:"user",
                                                                mul:topdef,
                                                                defaultUser:defaultObj{{=y}},
                                                                depUrl:Quickos.api.url('mobile/Work/GetDeptListByFlow')+"&processid={{=it.prcsto[y]}}&flowid={{=it.flowid}}",
                                                                userUrl:Quickos.api.url('mobile/Work/GetUserListByFlow')+"&processid={{=it.prcsto[y]}}&flowid={{=it.flowid}}"
                                                            },function(data) {
                                                                var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                var temStr=tem(data);
                                                                var inputObj=$("#prcs_user_op{{=y}}");
                                                                inputObj.val(WorkFlow.handleData(data));
                                                                $("#prcs_user_op_select_content{{=y}}").html(temStr);
                                                            });
                                                        });
                                                   </script>
                                                   <li id="prcs_user{{=y}}" data-single="0" style="display:none">
                                                       <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">{{=it.list[y]["selectArr"].Agent}}</div>
                                                          <div class="item-input" id="agentSelect{{=y}}">
                                                               <input type="hidden" name="prcs_user{{=y}}" id="prcs_users{{=y}}" value="{{=it.list[y]['selectArr'].agentPrcsUserAuto}}"/>
                                                          </div>
                                                        </div>
                                                      </div>
                                                   </li>
                                                   <li  style="display:none">
                                                        <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416">
                                                            <div data-id="{{=y}}" class="selected-item-content" id="prcs_user_select{{=y}}" data-target="prcs_user{{=y}}">

                                                            </div>
                                                        </div>
                                                   </li>

                                                   <script>
                                                    $(function()
                                                    {

                                                          var agentUserStr=$("#prcs_users{{=y}}").val();
                                                          if(agentUserStr)
                                                          {
                                                                var agentUserId=agentUserStr.split(","),
                                                                 agentSelectObj=[];
                                                                if(agentUserId.length)
                                                                {

                                                                    for(var agentUserIdItem in agentUserId)
                                                                    {

                                                                         var realname=user[agentUserId[agentUserIdItem]].text;

                                                                         var agentTem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                         agentUserId[agentUserIdItem]=agentUserId[agentUserIdItem].replace("u_","");
                                                                         agentSelectObj.push({realname:realname,uid:agentUserId[agentUserIdItem]});
                                                                    }

                                                                    var agentTemStr=agentTem(agentSelectObj);
                                                                     $("#prcs_user{{=y}}").attr("data-selected",JSON.stringify(agentSelectObj));
                                                                    $("#prcs_user_select{{=y}}").html(agentTemStr);
                                                                }
                                                          }




                                                        $("#prcs_user{{=y}}").userSelect({
                                                            type:"user"

                                                        },function(data) {
                                                            var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                            var temStr=tem(data);
                                                            var inputObj=$(this).find("input");
                                                            inputObj.val(WorkFlow.handleData(data));
                                                            $("#prcs_user_select{{=y}}").html(temStr);
                                                        });
                                                    });
                                                   </script>
                                                  {{ } }}

                                                </ul>
                                            </div>
                                        </div>
                                     </div>
                                    {{}}}
                                    {{}}}
                                    {{}}}
                                </div>

                                <div class="card-footer">
                                    <div class="list-block"  style="width:100%;">
                                        <ul>
                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒对象</div>
                                                      <div class="item-input" style="">
                                                        <ul>


                                                            <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="reminds[1]" value="1" type="checkbox" checked>
                                                                   <div class="item-media"><i class="icon icon-form-checkbox" id="dqwtqwwqqw"></i>下一步骤主办人</div>
                                                               </label>
                                                            </li>


                                                             <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="reminds[2]" value="2" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>发起人</div>
                                                               </label>
                                                            </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒方式 </div>
                                                      <div class="item-input" style="">
                                                        <ul>
                                                        <!--短信提醒功能（暂时已屏蔽）-->
                                                             <li style="display:none">
                                                               <label class="label-checkbox item-content">
                                                                   <input name="remindways" value="1" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>短信提醒</div>
                                                               </label>
                                                            </li>

                                                             <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="remindways" checked value="2" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>APP推送提醒</div>
                                                               </label>
                                                             </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒内容</div>
                                                      <div class="item-input">
                                                          <textarea readonly="readonly" style="width:100%;" name="message" value="{{=it.msg}}">{{=it.msg}}</textarea>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                           </div>
                           <input type="hidden" name="syncdeal" value="{{=it.process['syncdeal']}}">
                           <input type="hidden" name="flowid" value="{{=it.flowid}}">
                           <input type="hidden" name="runid" value="{{=it.runid}}">
                           <input type="hidden" name="processid" value="{{=it.processid}}">
                           <input type="hidden" name="flowprocess" value="{{=it.flowprocess}}">
                           <input type="hidden" name="processto" value="{{=it['process'].processto}}">
                           <input type="hidden" name="prcsback" value="{{=it.prcsback}}">
                           <input type="hidden" name="prcs_choose" value="">
                           <input type="hidden" name="op" value="{{=it.op}}">
                           <input type="hidden" name="topflag" value="{{=it.topflag}}">
                           <input type="hidden" name="formhash" value="">
                           <input type="hidden" name="notAllFinished" value="{{=it.notAllFinished}}">
                           <input type="hidden" name="turnpriv" value="{{=it.process.turnpriv}}">
                           <input type="hidden" name="prcsStop" value="{{=it.prcsStop}}">
                           <input type="hidden" name="count" value="{{=it.count}}">


            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //转交页面
        selectNextStepTpls:function()
        {
            var tpl=(function(){/*
                           <div class="card">
                                <div class="card-header">
                                    <ul>
                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">办理意见</div>
                                                      <div class="item-input" style="width:100% !important">
                                                          <textarea style="width:100%" id="scontent"  value="" placeholder="请输入办理意见"></textarea>
                                                          <div style="margin:0.5rem;width:100%;" class="button button-fill" onclick="openSelectPhrasebook('scontent')">常用语</div>
                                                      </div>
                                                    </div>

                                                </div>
                                            </li>
                                    {{? it.process["syncdeal"]==="0"}}
                                        {{for(var x in it.list){}}
                                        {{if(x!="remove"){}}
                                           {{if(typeof(it.list[x].notpass)==="undefined"){ }}
                                            <li>
                                                <label class="label-checkbox item-content">
                                                    <input data-pingfa="0" data-targetshow="target{{=x}}" {{? typeof(it.list[x].notpass)!=="undefined"}}disabled{{?}} type="radio" value="{{=x}}" name="prcs_check" {{? it.list[x].checked==="true"}}checked{{?}}>
                                                    <div class="item-media"><i class="icon icon-form-checkbox"></i>&nbsp;<span class="{{? typeof(it.list[x].notpass)!=="undefined"}}working-step-no{{??}}working-step{{?}}">{{? it.list[x].isover}}结束流程{{??}}{{=it.prcsto[x]}}{{? typeof(it.list[x].notpass)!=="undefined"}}-条件不符{{?}}{{?}}</span>{{=it.list[x].prcsname}}</div>
                                                </label>
                                             </li>
                                            {{}}}
                                        {{}}}
                                        {{}}}
                                    {{??}}
                                        {{for(var y in it.list){}}
                                        {{if(x!="remove"){}}
                                        <li>
                                            <label class="label-checkbox item-content">
                                                <input data-pingfa="1" data-targetshow="target{{=y}}" {{? typeof(it.list[y].notpass)!=="undefined"}}disabled{{?}} type="checkbox" value="{{=y}}" name="prcs_check" >
                                                <div class="item-media"><i class="icon icon-form-checkbox"></i>&nbsp;<span class="{{? typeof(it.list[y].notpass)!=="undefined"}}working-step-no{{??}}working-step{{?}}">{{? it.list[y].isover}}结束流程{{??}}{{=it.prcsto[y]}}{{? typeof(it.list[y].notpass)!=="undefined"}}-条件不符{{?}}{{?}}</span>{{=it.list[y].prcsname}}</div>
                                            </label>
                                         </li>
                                         {{}}}
                                        {{}}}
                                        <li>
                                            <a class="pull-left" onclick="showAll()">全选</a>
                                            <a class="pull-right" onclick="hideAll()">全不选</a>
                                        </li>
                                    {{?}}
                                    </ul>
                                </div>
                                <div class="card-content">
                                    {{for(var y in it.list){}}
                                    {{if(y!="remove"){}}
                                    {{if(!it.list[y].isover){}}
                                    <div id="target{{=y}}" class='prc-item {{if(it.process["syncdeal"]==="0"){}} {{ if(typeof it.list[y]["selectArr"]!="undefined" ) { }} {{if(it.list[y]["selectArr"].display=="none;"){}}hidden{{  } }} {{ }else{ }} hidden {{ } }} {{ }else{ }} hidden{{ } }}'>
                                        <h3 style="padding:0 0.75rem;">{{=it.list[y].prcsname}}</h3>
                                        <div>

                                            <div class="list-block">
                                                <ul>
                                                {{ if(typeof it.list[y]["selectArr"]!="undefined"){ }}
                                                    {{if(it.process["userlock"]=="1"){ }}
                                                    <li class="">
                                                      <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">类型</div>
                                                          <div class="item-input">
                                                              <select name="topflag{{=y}}">
                                                                   <option value="0">{{=it.list[y]["selectArr"].Host}}</option>
                                                                   <option value="1">{{=it.list[y]["selectArr"].Firstreceiverhost}}</option>
                                                                   <option value="2">{{=it.list[y]["selectArr"].Nohost}}</option>
                                                              </select>
                                                          </div>
                                                        </div>
                                                      </div>
                                                   </li>
                                                   {{ }else{ }}
                                                   <input type="hidden" value="{{=it.list[y]["selectArr"].topdef}}" name="topflag{{=y}}"/>
                                                   {{ } }}
                                                   <li id="topflag{{=y}}">
                                                       <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">{{=it.list[y]["selectArr"].Host}}</div>
                                                          <div class="item-input" {{if(it.list[y]["selectArr"].hostAttr!="disabled"){ }} id="hostSelect{{=y}}" {{ } }} style="position: absolute;height: 100%;">
                                                             <input style="visibility: hidden" type="text" id="prcs_user_op_select{{=y}}" data-select="prcsop">
                                                             <input type="hidden" id="prcs_user_op{{=y}}" name="prcs_user_op{{=y}}" value="{{=it.list[y]['selectArr'].prcsOpUser}}">
                                                          </div>
                                                           <input type="hidden" id="ishashost{{=y}}" name="ishashost{{=y}}" value="{{=it.list[y]['selectArr'].ishashost}}">
                                                        </div>
                                                      </div>
                                                   </li>

                                                   <li class="topflag{{=y}}">
                                                        <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416">
                                                            <div data-id="{{=y}}" class="selected-item-content" id="prcs_user_op_select_content{{=y}}" data-target="hostSelect{{=y}}">

                                                            </div>
                                                        </div>
                                                   </li>
                                                   <script>
                                                        var user=Ibos.data.user;
                                                        $(function()
                                                        {
                                                            var userStr=$("#prcs_user_op{{=y}}").val();
                                                            if(userStr)
                                                            {
                                                                var userId=userStr.split(","),

                                                                 selectObj=[];
                                                                if(userId.length)
                                                                {

                                                                    for(var userIdItem in userId)
                                                                    {
                                                                         var realname=user[userId[userIdItem]].text;
                                                                         var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                         userId[userIdItem]=userId[userIdItem].replace("u_","");
                                                                         selectObj.push({realname:realname,uid:userId[userIdItem]});
                                                                    }

                                                                    var temStr=tem(selectObj);
                                                                    $("#hostSelect{{=y}}").attr("data-selected",JSON.stringify(selectObj));
                                                                    $("#prcs_user_op_select_content{{=y}}").html(temStr);
                                                                }
                                                            }


                                                           var defaultArr{{=y}}={{=it.list[y].selectArr.prcsuser}};

                                                            var defaultObj{{=y}}=[];

                                                            for(var defaultItem in defaultArr{{=y}})
                                                            {

                                                                if(Ibos.data.user[defaultArr{{=y}}[defaultItem]])
                                                                {
                                                                    var realname=Ibos.data.user[defaultArr{{=y}}[defaultItem]].text;

                                                                    var userid=defaultArr{{=y}}[defaultItem].replace("u_","");
                                                                    var obj={uid:userid,realname:realname};
                                                                    defaultObj{{=y}}.unshift(obj);
                                                                }

                                                            }
                                                            var topdef="{{=it.list[y]["selectArr"].topdef}}"==="2"?true:false;
                                                            console.log(topdef);
                                                            $("#hostSelect{{=y}}").userSelect({
                                                                type:"user",
                                                                mul:topdef,
                                                                defaultUser:defaultObj{{=y}},
                                                                depUrl:Quickos.api.url('mobile/Work/GetDeptListByFlow')+"&processid={{=it.prcsto[y]}}&flowid={{=it.flowid}}",
                                                                userUrl:Quickos.api.url('mobile/Work/GetUserListByFlow')+"&processid={{=it.prcsto[y]}}&flowid={{=it.flowid}}"
                                                            },function(data) {
                                                                var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                var temStr=tem(data);
                                                                var inputObj=$("#prcs_user_op{{=y}}");
                                                                inputObj.val(WorkFlow.handleData(data));
                                                                $("#prcs_user_op_select_content{{=y}}").html(temStr);
                                                            });
                                                        });
                                                   </script>
                                                   <li id="prcs_user{{=y}}" data-single="0">
                                                       <div class="item-content item-link">
                                                        <div class="item-inner">
                                                          <div class="item-title label">{{=it.list[y]["selectArr"].Agent}}</div>
                                                          <div class="item-input" id="agentSelect{{=y}}">
                                                               <input type="hidden" name="prcs_user{{=y}}" id="prcs_users{{=y}}" value="{{=it.list[y]['selectArr'].agentPrcsUserAuto}}"/>
                                                          </div>
                                                        </div>
                                                      </div>
                                                   </li>
                                                   <li>
                                                        <div class="item-content select-item-content" style="border-bottom:1px dotted #E32416">
                                                            <div data-id="{{=y}}" class="selected-item-content" id="prcs_user_select{{=y}}" data-target="prcs_user{{=y}}">

                                                            </div>
                                                        </div>
                                                   </li>

                                                   <script>
                                                    $(function()
                                                    {

                                                          var agentUserStr=$("#prcs_users{{=y}}").val();
                                                          if(agentUserStr)
                                                          {
                                                                var agentUserId=agentUserStr.split(","),
                                                                 agentSelectObj=[];
                                                                if(agentUserId.length)
                                                                {

                                                                    for(var agentUserIdItem in agentUserId)
                                                                    {

                                                                         var realname=user[agentUserId[agentUserIdItem]].text;

                                                                         var agentTem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                                         agentUserId[agentUserIdItem]=agentUserId[agentUserIdItem].replace("u_","");
                                                                         agentSelectObj.push({realname:realname,uid:agentUserId[agentUserIdItem]});
                                                                    }

                                                                    var agentTemStr=agentTem(agentSelectObj);
                                                                     $("#prcs_user{{=y}}").attr("data-selected",JSON.stringify(agentSelectObj));
                                                                    $("#prcs_user_select{{=y}}").html(agentTemStr);
                                                                }
                                                          }




                                                        $("#prcs_user{{=y}}").userSelect({
                                                            type:"user"

                                                        },function(data) {
                                                            var tem=doT.template(WorkFlowTemplate.selectUserItemTpl());
                                                            var temStr=tem(data);
                                                            var inputObj=$(this).find("input");
                                                            inputObj.val(WorkFlow.handleData(data));
                                                            $("#prcs_user_select{{=y}}").html(temStr);
                                                        });
                                                    });
                                                   </script>
                                                  {{ } }}

                                                </ul>
                                            </div>
                                        </div>
                                     </div>
                                    {{}}}
                                    {{}}}
                                    {{}}}
                                </div>

                                <div class="card-footer">
                                    <div class="list-block"  style="width:100%;">
                                        <ul>
                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒对象</div>
                                                      <div class="item-input" style="">
                                                        <ul>


                                                            <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="reminds[1]" value="1" type="checkbox" checked>
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>下一步骤主办人</div>
                                                               </label>
                                                            </li>


                                                             <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="reminds[2]" value="2" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>发起人</div>
                                                               </label>
                                                            </li>

                                                             <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="reminds[3]" value="3" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>全部传阅人</div>
                                                               </label>
                                                             </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>


                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒方式 </div>
                                                      <div class="item-input" style="">
                                                        <ul>
                                                        <!--短信提醒功能（暂时已屏蔽）-->
                                                             <li style="display:none">
                                                               <label class="label-checkbox item-content">
                                                                   <input name="remindways" value="1" type="checkbox">
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>短信提醒</div>
                                                               </label>
                                                            </li>

                                                             <li>
                                                               <label class="label-checkbox item-content">
                                                                   <input name="remindways" value="2" type="checkbox" checked>
                                                                   <div class="item-media"><i class="icon icon-form-checkbox"></i>APP推送提醒</div>
                                                               </label>
                                                             </li>
                                                        </ul>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="item-content" style="padding-left:0;">
                                                    <div class="item-block">
                                                      <div class="item-title label">提醒内容</div>
                                                      <div class="item-input">
                                                          <textarea style="width:100%;" name="message" value="{{=it.msg}}">{{=it.msg}}</textarea>
                                                      </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                           </div>
                           <input type="hidden" name="syncdeal" value="{{=it.process['syncdeal']}}">
                           <input type="hidden" name="flowid" value="{{=it.flowid}}">
                           <input type="hidden" name="runid" value="{{=it.runid}}">
                           <input type="hidden" name="processid" value="{{=it.processid}}">
                           <input type="hidden" name="flowprocess" value="{{=it.flowprocess}}">
                           <input type="hidden" name="processto" value="{{=it['process'].processto}}">
                           <input type="hidden" name="prcsback" value="{{=it.prcsback}}">
                           <input type="hidden" name="prcs_choose" value="">
                           <input type="hidden" name="op" value="{{=it.op}}">
                           <input type="hidden" name="topflag" value="{{=it.topflag}}">
                           <input type="hidden" name="formhash" value="">
                           <input type="hidden" name="notAllFinished" value="{{=it.notAllFinished}}">
                           <input type="hidden" name="turnpriv" value="{{=it.process.turnpriv}}">
                           <input type="hidden" name="prcsStop" value="{{=it.prcsStop}}">
                           <input type="hidden" name="count" value="{{=it.count}}">
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //发起工作模板
        workflowStartTpl:function()
        {
            var tpl=(function(){/*

                <div class="content-block-title">常用流程({{=it.common.length}})</div>
                <div class="padding-5">
                    <div class="flow-item-content">
                    {{~it.common:value:index}}
                        <div class="item" onclick="openWorkflowForm(this)"  data-flowid="{{=value.flowid}}" data-name="{{=value.name}}">
                            {{=value.name}}
                        </div>
                     {{~}}
                    </div>
                </div>


                    <div class="content-block-title">流程分类</div>
                    <div class="list-block media-list inset">
                        <ul>
                            {{~it.cate:value:index}}
                            <li onclick="openWorkflowStartList(this)" data-id="{{=index}}">
                                <a href="#" class="item-link item-content">
                                    <div class="item-media">
                                        <i class="fa fa-folder"></i>
                                    </div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title"><b>{{=value.name}}</b></div>
                                        </div>
                                        <div class="item-subtitle">共{{=value.flows.length}}个工作</div>
                                    </div>
                                </a>
                            </li>
                            {{~}}
                        </ul>
                    </div>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //发起工作列表模板
        workflowStartListTpl:function()
        {
            var tpl=(function(){/*
                 {{~it:value:index}}
                 <li onclick="openWorkflowForm(this)" data-flowid="{{=value.flowid}}" data-name="{{=value.name}}">
                      <div class="item-content">
                          <div class="item-media"></div>
                          <div class="item-inner">
                              <div class="item-title label">{{=value.name}}</div>
                          </div>
                      </div>
                  </li>
                  {{~}}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //可编辑列表项
        workflowListTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a data-type="" style="position:relative;" class="doc-list news-page-list article-item" href="javascript:void(0);">
                      <div data-key="{{=it[x].key}}" data-flowid='{{=it[x].flowid}}' data-processid='{{=it[x].processid}}' onclick="openWorkflow(this)">
                            <h3 style="width:85%;display:inline-block"><span style="color:dimgray;">{{=it[x].runName}}</span></h3>
                            <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                                <div class="red-tip"></div>
                            </span>
                            <br>
                            <i class="art-addtime" style="font-size:0.5rem;">
                            <span class="pull-left text-gray">
                                <span class="card-number">{{=it[x].flowprocess}}</span>

                                <span class="inline-block text-gray">{{=it[x].stepname}}</span>
                            </span>
                                <span class="pull-right text-lightgray">{{=it[x].begintime}}</span>
                            </i>
                        </div>
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //邮箱收件箱项
        emailItemListTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a data-type="" style="position:relative" data-emailid='{{=it[x].webid}}'  class="doc-list news-page-list article-item" href="javascript:void(0);"  onclick="openEmailDetail(this)">
                     <h3><span style="color:dimgray;">{{=it[x].subject}}</span></h3>
                     <span class="pull-right not-read-tip"></span>
                     <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                             <!--<input type="checkbox" class="pull-right" value="">-->
                             <div class="red-tip"></div>
                         </span>
                     <br>
                     <i class="art-addtime" style="font-size:0.5rem;">
                             <span class="pull-left text-gray">
                                 <span class="inline-block text-gray">{{=it[x].fromuser}}</span>
                             </span>
                         <span class="pull-right text-lightgray">{{=it[x].sendtime}}</span>
                     </i>
                     {{? it[x].isread}}
                     {{??}}
                     <div class="no-read-tip right-top"></div>
                     {{?}}
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //邮箱已发送项
        emailItemHadListTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a data-type="" style="position:relative" data-emailid='{{=it[x].webid}}'  class="doc-list news-page-list article-item" href="javascript:void(0);"  onclick="openEmailDetail(this)">
                     <h3><span style="color:dimgray;">{{=it[x].subject}}</span></h3>
                     <span class="pull-right not-read-tip"></span>
                     <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                             <!--<input type="checkbox" class="pull-right" value="">-->
                             <div class="red-tip"></div>
                         </span>
                     <br>
                     <i class="art-addtime" style="font-size:0.5rem;">
                             <span class="pull-left text-gray">
                                 <span class="inline-block text-gray">{{=it[x].toidsNames}}</span>
                             </span>
                         <span class="pull-right text-lightgray">{{=it[x].sendtime}}</span>
                     </i>
                     {{? it[x].isread}}
                     {{??}}
                     <div class="no-read-tip right-top"></div>
                     {{?}}
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },

        //邮箱收件箱项(草稿)
        emailItemDraftsListTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a data-type="" style="position:relative" data-emailid='{{=it[x].webid}}'  class="doc-list news-page-list article-item" href="javascript:void(0);"  onclick="openEmail(this)">
                     <h3><span style="color:dimgray;">{{=it[x].subject}}</span></h3>
                     <span class="pull-right not-read-tip"></span>
                     <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                             <!--<input type="checkbox" class="pull-right" value="">-->
                             <div class="red-tip"></div>
                         </span>
                     <br>
                     <i class="art-addtime" style="font-size:0.5rem;">
                             <span class="pull-left text-gray">
                                 <span class="inline-block text-gray">{{=it[x].fromuser}}</span>
                             </span>
                         <span class="pull-right text-lightgray">{{=it[x].sendtime}}</span>
                     </i>
                     {{? it[x].isread}}
                     {{??}}
                     <div class="no-read-tip right-top"></div>
                     {{?}}
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //不可编辑列表项
        workflowListMonitorTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a data-type="monitor" class="doc-list news-page-list article-item" href="javascript:void(0);" data-key="{{=it[x].key}}" onclick="openWorkflowDetail(this)">
                      <h3 style="width:85%;display:inline-block"><span style="color:dimgray;">{{=it[x].runName}}</span></h3>

                      <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                          <div class="red-tip"></div>
                      </span>
                      <br>
                     <i class="art-addtime" style="font-size:0.5rem;">
                             <span class="pull-left text-gray">
                                 <span class="card-number">{{=it[x].flowprocess}}</span>

                                 <span class="inline-block text-gray">{{=it[x].stepname}}</span>
                             </span>
                         <span class="pull-right text-lightgray">{{=it[x].begintime}}</span>
                     </i>
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //不可编辑列表项
        workflowListDetialTpl:function()
        {
            var tpl=(function(){/*
                 {{ for(var x in it){ }}
                 <a  data-type="" style="position:relative;" class="doc-list news-page-list article-item" href="javascript:void(0);">
                      <div data-flowid='{{=it[x].flowid}}' data-processid='{{=it[x].processid}}' data-key="{{=it[x].key}}" onclick="openWorkflowDetail(this)">
                        <h3 style="width:85%;display:inline-block"><span style="color:dimgray;">{{=it[x].runName}}</span></h3>
                        <span class="art-title" style="margin-top:0.3rem;margin-right:0.7rem;">
                            <div class="red-tip"></div>
                        </span>
                        <br>
                        <i class="art-addtime" style="font-size:0.5rem;">
                        <span class="pull-left text-gray">
                            <span class="card-number">{{=it[x].flowprocess}}</span>

                            <span class="inline-block text-gray">{{=it[x].stepname}}</span>
                        </span>
                            <span class="pull-right text-lightgray">{{=it[x].begintime}}</span>
                        </i>
                    </div>
                 </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //选择关联工作列表
        workflowCheckDocItem: function () {
            var tpl = (function () {/*
                 {{ for(var x in it.list){ }}
                 <a style="padding-right:25px;" onclick="openWorkflowDetail(this)" class="doc-list news-page-list article-item workflow-checkdoc-item" href="javascript:void(0);" data-id="{{=it.list[x].runid}}" data-key="{{=it.list[x].key}}">
                    <div>
                        <span class="art-title kill-maopao">
                            <label class="label-checkbox item-content" style="padding-left:0;">
                                <input {{for(var y in it.selectedArr){ }} {{if(it.selectedArr[y]===it.list[x].runid){}}  checked  {{ } }}   {{ } }} id="checkdoc{{=it.list[x].runid}}" name="workrelatedstr" value="{{=it.list[x].runid}}" type="checkbox" >
                                <div class="item-media" style="color:#303030 !important;font-size:16px"><i style="margin-right:10px;" class="icon icon-form-checkbox"></i>{{=it.list[x].name}}</div>
                            </label>
                        </span>
                        <br>
                        <i style="font-size:0.5rem;">发起人：{{=it.list[x].beginusername}}<span class="pull-right" style="font-size:0.5rem;color:darkgray !important;">{{=it.list[x].begintime}}</span></i>
                    </div>
                </a>
                 {{ } }}
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        },
        //选择关联审批列表
        workflowCxslistItem: function () {
            var tpl = (function () {/*

                 {{ for(var x in it.list){ }}
                 <a style="padding-right:25px;" class="doc-list news-page-list article-item" href="javascript:void(0);" data-id="{{=it.list[x].CASEID}}">
                    <div>
                        <span class="art-title">
                            <label class="label-checkbox item-content" style="padding-left:0;">
                                <input {{for(var y in it.selectedArr){ }} {{if(it.selectedArr[y]===it.list[x].CASEID){}}  checked  {{ } }}   {{ } }} data-json="" data-name="cxsstr{{=it.list[x].CASEID}}" name="cxsstr" value="{{=it.list[x].CASEID}}" type="checkbox" >
                                <div class="item-media"  style="color:#303030 !important;font-size:16px;"><i style="padding-right:10px;" class="icon icon-form-checkbox"></i>{{=it.list[x].FLOWNAME}}</div>
                            </label>
                            <script>
                                $("#cxs-content [data-name='cxsstr{{=it.list[x].CASEID}}']").attr("data-json","");
                                var cxsstr{{=it.list[x].CASEID}}={};
                                cxsstr{{=it.list[x].CASEID}}["CASEID"]='{{=it.list[x].CASEID}}';
                                cxsstr{{=it.list[x].CASEID}}["CASENUM"]='{{=it.list[x].CASENUM}}';
                                cxsstr{{=it.list[x].CASEID}}["CASENAME"]='{{=it.list[x].CASENAME}}';
                                cxsstr{{=it.list[x].CASEID}}["CASEADD"]='{{=it.list[x].CASEADD}}';
                                cxsstr{{=it.list[x].CASEID}}["JBR"]='{{=it.list[x].JBR}}';
                                cxsstr{{=it.list[x].CASEID}}["FLOWNAME"]='{{=it.list[x].FLOWNAME}}';
                                cxsstr{{=it.list[x].CASEID}}["URL"]='{{=it.list[x].URL}}';

                                $("#cxs-content [data-name='cxsstr{{=it.list[x].CASEID}}']").attr("data-json",JSON.stringify(cxsstr{{=it.list[x].CASEID}}));

                            </script>

                        </span>
                        <br>
                        <i  style="font-size:0.5rem;">业务号：{{=it.list[x].CASENUM}}<br>业务类型：{{=it.list[x].CASENAME}}<span class="pull-right" style="font-size:0.5rem;color:#303030 !important;">经办人：{{=it.list[x].JBR}}</span></i>
                    </div>
                 </a>
                 {{ } }}

            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
            return tpl;
        }

   };
