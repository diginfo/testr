dwap.page.valid=function(e){var t=$("#butgo"),a=$("#GEN_ID");e?(t.linkbutton("enable"),a.addClass("test")):(t.linkbutton("disable"),a.removeClass("test"))},dwap.page.genselect=function(e,t){var a={prefixSuffix:dwap.bhave.prefixSuffix||"",suffixPrefix:dwap.bhave.suffixPrefix||"",padsep:dwap.bhave.padsep||"n",descnull:dwap.bhave.descnull||"---N/A---",idnull:dwap.bhave.idnull||"<>"};e.gendata={id:clone(e.ids),desc:clone(e.descs),uom:"EA",idset:[0],descset:[0]},$.each(t,function(){var t=$(this),o=t.combobox("getRec"),n=t.combobox("options");if(o){var i=e.ids.indexOf(n.type_id);if(e.gendata.idset.push(i),o.value==a.idnull?e.gendata.id[i]="":e.gendata.id[i]=o.value,"MATERIAL"==e.class_id)e.gendata.uom="IN";else if("LENGTH"==n.type_id&&0==o.text.toLowerCase().indexOf("per")){var s=o.text.split(/^per */i);2==s.length&&(e.gendata.uom=s[1].toUpperCase())}i=e.descs.indexOf(n.type_id);e.gendata.descset.push(i);var d=o.text.trim();if(d==a.descnull)return e.gendata.desc[i]="";var l=e.types[n.type_id],c={n:{p:"",s:""},b:{p:" ",s:" "},l:{p:" ",s:""},r:{p:"",s:" "}}[a.padsep];"PREFIX"==l[0]?d=[c.p,l[1],a.prefixSuffix,o.text,c.s].join(""):"SUFFIX"==l[0]&&(d=[c.p,o.text,a.suffixPrefix,l[1],c.s].join("")),e.gendata.desc[i]=d}else nulls=!0});var o="",n="";e.gendata.id.map(function(t,a){e.gendata.idset.indexOf(a)>-1&&(o+=t.toUpperCase())}),e.gendata.desc.map(function(t,a){e.gendata.descset.indexOf(a)>-1&&(n+=t)}),$("#GEN_ID").textbox("setValue",o),$("#GEN_DESC").textbox("setValue",n),$("#GEN_UOM").textbox("setValue",e.gendata.uom),dwap.page.valid($("form#generator").form("validate"))},$(document).ready(function(){$("#GEN_CLASS_ID").combobox({ids:[],descs:[],url:"/",queryParams:{_sqlid:"inv^pn_partclass",_func:"get"},loadFilter:function(e){return e.map(function(e){e.text=e.CLASS_ID,e.value=e.CLASS_ID}),e},onSelect:function(e){var t=$(this).combobox("options");t.class_id=e.value,$("form#results").form("clear"),$("#GEN_TRACEABLE").combobox("setValue",e.TRACEABLE),dwap.page.valid(!1),$("form#generator.hide").removeClass("hide"),ajaxget("/",{_sqlid:"inv^pn_gendata",_func:"get",CLASS_ID:e.value},function(a){var o=$("form#generator");if(o.empty(),0==a.param.length)return alert("No parameters for "+e.value);t.descs=a[e.value].descs,t.ids=a[e.value].ids,t.types=a[e.value].types;var n=[],i=[];a.param.map(function(e){var t=n.indexOf(e.TYPE_ID);t<0&&(n.push(e.TYPE_ID),t=-1+i.push({label:e.TYPE_ID.toLowerCase(),type:"combobox","data-options":{data:[],type_id:e.TYPE_ID,editable:!1,required:!0}})),i[t]["data-options"].data.push({text:e.PARA_ID,value:e.CODE_STR})});var s=$("#pngenwin"),d=1,l=410;i.length>5&&(d=2,l=780),o.css("column-count",d),dynadd(o,i),s.length>0&&s.window("resize",{width:l});var c=o.find("input.combobox-f");$.each(c,function(){$(this).combobox("options").onSelect=function(){dwap.page.genselect(t,c)}})})}}),$("#butgo").linkbutton({text:"Apply",iconCls:"icon-tick",disabled:!0,onClick:function(){var e=$("#GEN_CLASS_ID").combobox("options").gendata,t=$("#ID");if(t.length>0)try{t.textbox("readonly",!0),t.textbox("setValue",e.id.join("").toUpperCase()),$("#DESCRIPTION").textbox("setValue",e.desc.join("")),$("#UOM_ID").combobox("select",e.uom);var a=$("#GEN_TRACEABLE").combobox("getValue");$("#TRACEABLE").combobox("setValue",a),$("#TRACEABLE").combobox("readonly",!0),$("#pngenwin").window("close")}catch(e){alert("Error adding part info.")}else msgbox(e.id.join("")+"<br/><br/>"+e.desc.join(""))}}),$("#GEN_ID").textbox(),$("#GEN_DESC").textbox(),$("#GEN_UOM").textbox(),$("#GEN_TRACEABLE").combobox(),$("#butcancel").linkbutton({text:"Cancel",iconCls:"icon-cancel",onClick:reload})});