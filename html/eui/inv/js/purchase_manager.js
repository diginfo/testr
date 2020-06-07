dwap.page.receiptinfo=function(){var e=$(this),t=e.data("idx"),o=$("#polines").datagrid("getRows")[t];ajaxget("/",{_func:"get",_sqlid:"inv^receipt_info",PO_ID:o.PO_ID,LINE_NO:o.LINE_NO},function(t){e.tooltip({content:eui.table([{field:"RECEIPT_ID",title:"Receipt ID"},{field:"RECEIVED_DATE",title:"Rcvd Date",formatter:eui.date},{field:"RECEIVED_QTY",title:"Qty",style:"text-align:right;"}],t).appendTo("#content")}).tooltip("show")})},dwap.page.dbGrid=function(e){var t=$("#polines"),o=t.datagrid("options"),i=t.datagrid("getSelected"),a=(t.datagrid("getRowIndex",i),{P:["PART_ID","UNIT_PRICE"],S:["LINE_DESCRIPTION","WOREF","UNIT_PRICE"],J:["LINE_DESCRIPTION","WOREF","UNIT_PRICE"],E:["LINE_DESCRIPTION","UNIT_PRICE"]}[e]),d={P:["LINE_DESCRIPTION","WOREF"],S:["PART_ID"],J:["PART_ID"],E:["PART_ID","WOREF"]}[e],n={P:["WOREF"],S:["PART_ID"],J:["PART_ID"],E:["PART_ID","WOREF"]}[e];a&&a.map(e=>{o.tbar.form.find(`input[textboxname=${e}]`).textbox("readonly",!1),o.tbar.form.find(`input[textboxname=${e}]`).textbox("required",!0)}),d&&d.map(e=>{o.tbar.form.find(`input[textboxname=${e}]`).textbox("readonly",!1),o.tbar.form.find(`input[textboxname=${e}]`).textbox("required",!1)}),n&&n.map(e=>{o.tbar.form.find(`input[textboxname=${e}]`).textbox("readonly",!0)}),o.tbar.form.find('input[textboxname="DELIVERY_DATE"]').datebox("required",!1),o.tbar.form.find('input[textboxname="PART_DESCRIPTION"]').datebox("readonly",!0)},dwap.page.clearData=function(e){var t=$("#polines").datagrid("options");["PART_ID","UNIT_PRICE","LINE_DESCRIPTION","WOREF","PART_DESCRIPTION","PURCHASE_UOM"].map(e=>{t.tbar.form.find(`input[textboxname=${e}]`).textbox("setValue","")}),t.tbar.form.find('input[textboxname="DELIVERY_DATE"]').datebox("setValue","")},dwap.page.opts={twoColumns:!0,editor:"form",addData:{LINE_NO:"$autonum:10",LINE_STATUS:"OPEN",ORDER_QTY:1,PO_ID:"#ID"},striped:!0,url:"/?_sqlid=inv^polines&_func=get&_dgrid=y",rownumbers:!1,fitColumns:!0,fit:!0,columns:[[{field:"PO_ID",hidden:!0},{field:"LINE_NO",title:"#",width:30,fixed:!0,align:"center"},{field:"LINE_STATUS",title:"Ln Status",width:60,fixed:!0,editor:{type:"combobox",options:{panelHeight:"auto",required:!0,editable:!1,data:[{text:"CLOSE",value:"CLOSE"},{text:"OPEN",value:"OPEN",selected:!0}]}},coloff:!0},{field:"ORDER_TYPE",title:"Order Type",width:100,fixed:!0,editor:{type:"combobox",options:{panelHeight:"auto",required:!0,editable:!1,data:[{text:"PART ORDER",value:"P"},{text:"SUBCONTRACT",value:"S"},{text:"JOB RELATED",value:"J"},{text:"EXPENSE",value:"E"}],onSelect:function(e){dwap.page.clearData(e.value),dwap.page.dbGrid(e.value);var t=$("#_dgform > form input[textboxname=WOREF");"S"==e.value&&(t.qbe("options").queryParams.SUBCON="Y"),"J"==e.value&&delete t.qbe("options").queryParams.SUBCON,t.qbe("options").dlog.dg.datagrid("reload")}}},coloff:!0,formatter:function(e,t,o){return{P:"PART ORDER",S:"SUBCONTRACT",J:"JOB RELATED",E:"EXPENSE"}[e]}},{field:"ORDER_QTY",title:"Order Qty",width:60,fixed:!0,align:"right",editor:{type:"numberspinner",options:{precision:2,min:0,required:!0}}},{field:"TOTAL_RECEIVED_QTY",title:"Rcvd Qty",width:60,fixed:!0,align:"right",formatter:function(e,t,o){return e<1?"-":'<span style="width:14px;" class="icon-ship icon-dg click" data-idx="'+o+'"></span><span>'+e+"</span>"}},{field:"UNIT_PRICE",title:"Unit Price",align:"right",width:70,fixed:!0,formatter:eui.currency,editor:{required:!0,type:"numberbox",options:{value:0,precision:2,min:0,prefix:"$"}}},{field:"TOTAL_PRICE",align:"right",title:"Total Price",width:100,fixed:!0,formatter:function(e,t,o){return eui.currency(parseFloat(t.TOTAL_PRICE))}},{field:"DELIVERY_DATE",title:"Delivery Date",width:80,fixed:!0,editor:{type:"datebox",options:{required:!1}},formatter:eui.date},{field:"PART_ID",title:"Our Part ID",width:100,editor:{type:"qbe",options:{queryParams:{_sqlid:"inv^partid_qbe"},onDemand:!0,multiCol:!0,valueField:"ID",fields:[{field:"value",title:"Part ID",editor:"textbox"},{field:"DESCRIPTION",title:"Description",editor:"textbox",formatter:function(e){return e?e.substring(0,50):""}},{field:"ALIAS_DESC",title:"Alias",editor:"textbox"},{field:"TRACEABLE",title:"Traceable",editor:{type:"combobox",options:{panelHeight:"auto",data:[{value:"",text:"All",selected:!0},{value:"Y",text:"Yes"},{value:"N",text:"No"}]}}},{field:"DIM_TRACKED",title:"Dimensions",editor:{type:"combobox",options:{panelHeight:"auto",data:[{value:"",text:"All",selected:!0},{value:"Y",text:"Yes"},{value:"N",text:"No"}]}}},{field:"PART_CLASS_ID",title:"Part Class",editor:{type:"combobox",options:{panelHeight:"auto",data:[{value:"",text:"All",selected:!0},{value:"FG",text:"Finished Goods"},{value:"COMP",text:"Component"},{value:"CONSUMABLE",text:"Consumable"},{value:"MAKE_STAGED",text:"Make Staged"},{value:"MAKE_NOSTAGE",text:"Make Unstaged"}]}}},{field:"USER_1",title:"UDF 1",editor:"textbox"},{field:"USER_2",title:"UDF 2",editor:"textbox"},{field:"USER_3",title:"UDF 3",editor:"textbox"},{field:"USER_4",title:"UDF 4",editor:"textbox"},{field:"USER_5",title:"UDF 5",editor:"textbox"}],onSelect:function(e){var t=$("#polines"),o=t.datagrid("options"),i=t.datagrid("getSelected"),a=t.datagrid("getRowIndex",i);t.datagrid("getEditors",a),$("#CURRENCY_ID").combobox("getValue");ajaxget("/",{_sqlid:"inv^partall",_func:"get",ID:e.value},function(e){o.tbar.form.find('input[textboxname="PART_DESCRIPTION"]').textbox("setValue",e.DESCRIPTION),o.tbar.form.find('input[textboxname="PURCHASE_UOM"]').textbox("setValue",e.UOM_ID)})}}}},{field:"PURCHASE_UOM",title:"UOM",width:50,editor:{type:"textbox",options:{readonly:!1},coloff:!0}},{field:"WOREF",title:"Job ID",width:120,editor:{type:"qbe",options:{queryParams:{_sqlid:"vwltsa^opnrefs_qbe",STATUS:"R"},onDemand:!0,valueField:"WOREF",fields:[{field:"WORKORDER_BASE_ID",title:"Job ID",editor:"textbox"},{field:"WORKORDER_LOT_ID",title:"Lot ID",editor:"textbox"},{field:"WORKORDER_SUB_ID",title:"Sub ID",editor:"textbox"},{field:"SEQUENCE_NO",title:"Seq No",editor:"textbox"},{field:"RESOURCE_ID",title:"Resource ID",editor:"textbox"},{field:"STATUS",title:"Status",editor:{type:"combobox",options:{panelHeight:"auto",data:[{value:"R",text:"Released",selected:!0},{value:"C",text:"Closed"},{value:"X",text:"Cancelled"}]}}}],onSelect:function(e){},preload:!0}}},{field:"PART_DESCRIPTION",title:"Our Part Description",width:150,editor:{type:"textbox",options:{readonly:!1,multiline:!0,height:100}},coloff:!0},{field:"LINE_DESCRIPTION",title:"Line Description",width:150,editor:{type:"textbox",options:{readonly:!1,multiline:!0,height:100}},coloff:!0}]],onBeforeLoad:function(){if(!$("form#pohead").form("getData").ID)return!1},loadFilter:function(e){return 0==e.length||e.rows.map(function(e){for(var t in e._JOB=[],e._NCR=[],e._OPNDATA)e._JOB.push(e._OPNDATA[t]),e._OPNDATA[t]._NCRS&&(e._NCR=e._OPNDATA[t]._NCRS)}),e},onSelect:function(e,t){var o=$("#polines"),i=t.ORDER_TYPE;dwap.page.dbGrid(i),t.TOTAL_RECEIVED_QTY>0&&(o.datagrid("options").tbar.dgre_del.linkbutton("disable"),o.datagrid("options").tbar.dgre_edit.linkbutton("disable"))},onLoadSuccess:function(){$("tr td .icon-ship.icon-dg").off().on("click",dwap.page.receiptinfo)},onEndEdit:function(e,t,o){var i;0==(i=t.DELIVERY_DATE,"[object Date]"===Object.prototype.toString.call(i))&&delete t.DELIVERY_DATE;var a=clone(t);["PART_DESCRIPTION"].map(function(e){delete a[e]});var d=a.PO_ID;ajaxget("/?_sqlid=inv^poline",a,function(e){$("#polines").datagrid("reload",{PO_ID:d})})}},$(document).ready(function(){$("#ID").qbe({defid:"po_ids"}),$("#GST_ID").combobox({url:"/?_func=get&_sqlid=admin^gst&_combo=y",onSelect:function(e){$("#GST_RATE").numberbox("setValue",e.percentage)}}),$("#CURRENCY_ID").combobox({url:"/?_func=get&_sqlid=admin^curr&_combo=y",onSelect:function(e){$("#CURRENCY_RATE").numberbox("setValue",e.rate)}}),$("#STATUS").combobox({default:"R",data:[{text:"On Hold",value:"H"},{text:"Released",value:"R"},{text:"Closed",value:"C"},{text:"Cancelled",value:"X"}]}),$("#VENDOR_ID").combobox({url:"/?_func=get&_sqlid=inv^vendorid&_combo=y",onSelect:function(e){var t=e.value;$("form#pohead");ajaxget("/",{_sqlid:"inv^vendorall",_func:"get",ID:t},function(e){var t=$("#CURRENCY_ID"),o=$("#GST_ID");["NAME","CONTACT_PERSON","CONTACT_PHONE","CONTACT_fax","CONTACT_EMAIL"].map(t=>{$(`#${t.toUpperCase()}`).textbox("setValue",e[t])});["ADDR_1","ADDR_2","ADDR_3"].map(t=>{$(`#REMIT_${t.toUpperCase()}`).textbox("setValue",e[t])}),o.combobox("setValue",e.GST_ID),t.combobox("setValue",e.CURRENCY_ID),o.combobox("reselect"),t.combobox("reselect")})}}),$("#but_add").on("done",function(){$("#polines").datagrid("loadData",{total:0,rows:[]}),$("#STATUS").combobox("select","R"),$("#VENDOR_ID").textbox("readonly",!1),butEn("sx")}),$("form#pohead").on("loadDone",function(e,t){if(t.ID){if($("#VENDOR_ID").textbox("readonly"),butEn("adx"),$("#polines").datagrid("reload",{PO_ID:t.ID}),$("#pofiles").datagrid("docFiles",t.ID),"H"==t.STATUS)var o="bg-red";else o="";$("#STATUS").textbox("textbox").removeClass("bg-red").addClass(o);var i="disable";"C"!=t.STATUS&&(i="enable"),$("#polines").datagrid("options").tbar.dgre_add.linkbutton(i),$("#GST_ID").combobox("reselect"),$("#CURRENCY_ID").combobox("reselect")}}).on("changed",function(e,t){$(this).form("options").loading||butEn("sadx")}).on("success",function(e){var t="disable";"C"!=e.STATUS&&(t="enable"),$("#polines").datagrid("options").tbar.dgre_add.linkbutton(t)});var e=$("#polines");e.datagrid("rowEditor",dwap.page.opts),e.datagrid("options").tbar.dgre_add.linkbutton("disable"),e.datagrid("columns",$("#dgre_tb"))});