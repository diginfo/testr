dwap.page.dodgrid=function(){$("#txgrid").datagrid({toolbar:"#tbar",fit:!0,fitColumns:!0,queryParams:frm2dic($("form#gfilter")),url:"/?_func=get&_sqlid=inv^invtrans",checkOnSelect:!1,singleSelect:!0,method:"get",striped:!0,columns:[[{field:"EDIT",title:"Edit",checkbox:!0},{field:"PART_ID",title:"Part ID",width:200,fixed:!0},{field:"TRANSACTION_ID",title:"Tx ID",width:80,fixed:!0},{field:"TRANSACTION_DATE",title:"Tx Date",formatter:iso2str,width:80,fixed:!0},{field:"DOCUMENT_ID",title:"Doc ID",width:120,fixed:!0},{field:"TRANS_TYPE",title:"Tx Type",width:120,fixed:!0},{field:"QTY",title:"Tx Qty",width:120,fixed:!0}]],onBeforeLoad:function(t){if(!t.sdate)return!1},onCheck:function(t,i){$(this).data("idx",t),$("form#parttrans").attr("mode","upd").form("load",i),setTimeout(function(){butEn("sxd")},300)},onLoadSuccess:function(){$("form#parttrans").form("clear")}})},$(document).ready(function(){$("#but_save").linkbutton({onClick:function(){var t=$("form#parttrans"),i=frm2dic(t),r=$("#txgrid");r.datagrid("updateRow",{index:r.data("idx"),row:i}),t.form("options").queryParams={_func:"upd",_sqlid:"inv^invtrans",TRANSACTION_ID:i.TRANSACTION_ID},t.form("submit"),$("#txgrid").datagrid("reload",frm2dic($("form#gfilter")))}}),$("#but_del").linkbutton({onClick:function(){var t=$("form#parttrans"),i=frm2dic(t);$("#txgrid");t.form("options").queryParams={_func:"del",_sqlid:"inv^invtrans",TRANSACTION_ID:i.TRANSACTION_ID},t.form("submit"),$("#txgrid").datagrid("reload",frm2dic($("form#gfilter")))}}),$("form#parttrans").on("done",function(t,i){but_clr()}),setTimeout(function(){dwap.page.dodgrid(),$("form#gfilter").form({onChange:function(){$("#txgrid").datagrid("reload",frm2dic($("form#gfilter")))}})})});