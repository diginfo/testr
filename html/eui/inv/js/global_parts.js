dwap.page.columns=[{field:"PART_ID",title:"Part ID"},{field:"PRODUCT_CODE",title:"Product Code"}],dwap.page.filters=[{field:"TOTAL",type:"numberbox",options:{precision:0},op:["equal","notequal","less","greater"]}],dwap.page.integer=function(e){var t=eui.integer(e);return"0.00"===t?"-":t},dwap.page.docols=function(e){ajaxget("/",{_sqlid:"admin^siteids",_func:"get"},function(t){var a=[{field:"PART_ID",title:"Part ID"},{field:"PRODUCT_CODE",title:"Product Code"},{field:"DESCRIPTION",title:"Description",width:200,fixed:!0},{field:"UOM_ID",title:"UOM"},{field:"TOTAL",align:"right",width:80,fixed:!0,title:"Total Bal",formatter:dwap.page.integer}];t.map(function(e,t){var i="BAL_QTY_"+(e=e.toUpperCase()),l="MCOST_"+e,r={align:"right",width:80,fixed:!0,field:i,title:e.replace("OMS","OMS-"),formatter:dwap.page.integer};a.push(r),dwap.page.filters.push({field:i,type:"label"}),dwap.page.filters.push({field:l,type:"label"})}),e(a)})},dwap.page.partgrid=function(e,t){progress(!0);var a=$("#partbal");a.datagrid({remoteFilter:!0,pagination:!0,pagePosition:"top",page:1,pageSize:25,pageList:[10,25,50,100],onBeforeLoad:function(e){$(this).datagrid("options").columns;e.filterRules&&(jsonParse(e.filterRules).map(function(t){var a={equal:"_EQ_",notequal:"_NEQ_",greater:"_GT_",less:"_LT_"}[t.op]||"_LIKE_";"TOTAL"==t.field?e[" BAL_QTY"+a]=t.value:e[t.field+a]=t.value}),delete e.filterRules),e._page=e.page,e._rows=e.rows||50,delete e.page,delete e.rows},_toolbar:"#tbar",fit:!0,fitColumns:!0,queryParams:frm2dic($("form#partFilter")),url:"/?_sqlid=inv^globalPartBal&_func=get",checkOnSelect:!1,singleSelect:!0,method:"get",striped:!0,columns:[e],onLoadSuccess:function(e){progress(!1)}}),a.datagrid("enableFilter",dwap.page.filters),a.datagrid("getPager").pagination({layout:["sep","first","prev","sep","links","sep","next","last","sep"],buttons:[{text:"Clear",iconCls:"icon-clear",handler:function(){$("#partbal").datagrid("removeFilterRule"),$("#partbal").datagrid("doFilter")}},"-",{text:"Excel",iconCls:"icon-xls",handler:function(){a.datagrid("toExcel","global_parts.xls")}},"-"]})},$(document).ready(function(){progress(!0),setTimeout(function(){dwap.page.docols(function(e){dwap.page.partgrid(e)})})});