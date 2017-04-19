//jquery ui datepicker plug

$.ajaxSetup({
	cache:false
});
jQuery.extend( {
	selectMenu:function(selectedId){
		$("#topMenu a").removeClass("select");
		$("#"+selectedId).addClass("select");
		//$(".sysMenuList").hide();
	}
});

$(function(){
//	$("#shouldLogin").ajaxComplete(function(event, xhr, ajaxOptions){
//		 if(xhr&&xhr.readyState == 4){
//			 if(xhr.status==200){
//				if(xhr.responseText!=undefined && xhr.responseText.indexOf("document.location.href='/login.jsp")>=0){
//					document.location.href='/login.jsp?errorMessage=您的帐号已失效或者已经在别的地方登录!';
//				}
//				startDate=new Date();
//			 }
//		}
//	});
	$("#currentOrgId").live("change",function(){
		if(typeof(onOrgChanged) != 'undefined'){
			onOrgChanged.call(null,this.value,$("#currentOrgId option:selected").attr("isGrid")=="true");
		}
	});
	$("#currentIncidentTypeId").live("change",function(){
		if(typeof(onIncidentTypeChanged) != 'undefined'){
			onIncidentTypeChanged.call(null,node.attributes.id);
		}
	});
	$("a:disabled").unbind().addClass("huise");
});

///////////////////////////////////////////////////
var placeName = '';
var tabName = '';

function deleteOperatorByEncrypt(gridName,allValue,fieldName){
	 var id="";
    if(allValue.length>1){
		  for (i = 0; i < allValue.length; i++) {
			  var rowdata=$("#"+gridName+"List").jqGrid('getRowData',allValue[i]); 
			  if(i==allValue.length-1)
				  id+=rowdata[fieldName];
			  else
				  id+=rowdata[fieldName]+",";
		  }
    }else{
   	 var rowdata=$("#"+gridName+"List").jqGrid('getRowData',allValue); 
        id=rowdata[fieldName];
    }
    return id;
}

function getOrgIdsByIds(gridName,allValue,fieldName){
	var orgIds="";
	 if(allValue.length>1){
		  for (i = 0; i < allValue.length; i++) {
			  var rowdata=$("#"+gridName+"List").jqGrid('getRowData',allValue[i]); 
			  if(i==allValue.length-1)
				  orgIds+=rowdata[fieldName];
			  else
				  orgIds+=rowdata[fieldName]+",";
		  }
   }else{
  	 var rowdata=$("#"+gridName+"List").jqGrid('getRowData',allValue); 
  	 orgIds=rowdata[fieldName];
   }
	 return orgIds;
}

function getCurrentOrgId(){
	var currentOrgId=$("#currentOrgId").val();
	if(currentOrgId){
		return currentOrgId;
	}else{
		return "";
	}
}
function getCurrentIncidentId(){
	var incidentTypeId=	$("#currentIncidentTypeId").val();
	if(incidentTypeId){
		return incidentTypeId;
	}else{
		return "";
	}
}

function getCurrentSelectedOrgId(){
	var currentOrgId=$("#currentIncidentTypeId").val();
	if(currentOrgId){
		return currentOrgId;
	}else{
		return "";
	}
}

function getCurrentTreeOrgId(){
	var currentOrgId=$("input[id='currentOrgId']").val();
	if(currentOrgId){
		return currentOrgId;
	}else{
		return "";
	}
}

function isNullObject(obj){
	if (obj==null || typeof(obj)=="undefined"){
		return true;
	}
	return false;
}

function popLoginDialog(){
	$.createDialog({
		id:"login-dlg",
		url:PATH+'/loginDLG.jsp?date='+new Date(),
		title:"登录超时，请重新登录",
		width:450,
		height:300,
		closeOnEscape:false,
		closeText:false,
		resizable: false
	});
	var cookie_skin = $.cookie("cssSkin");
	switch (cookie_skin) {
		case "default":
			$(".login").parent().css("background","#EAF4FD");
			break;
		case "blue":
			$(".login").parent().css("background","#EEF2FB");
			break;
		case "green":
			$(".login").parent().css("background","#F8FBEC");
			break;
	}
	$(".ui-dialog-titlebar-close").click(function(){document.location.href="/"});
}

function proccessLoginResult(result,callback){
	if(result && result.indexOf("notHasLogin")>=0){

	}else{
		callback();
	}
}

function getDate() {
	var todayDate = new Date();
	var date = todayDate.getDate();
	var month = todayDate.getMonth() + 1;
	var year = todayDate.getFullYear();
	return year + "-" + (month > 10 ? month : "0"+month)  + "-" + (date > 10 ? date : "0"+date);
}

function compareTwoDates(endDate, startDate) {
	return Date.parse(endDate) <= Date.parse(endDate);
}

function compareDateWithNow(currentDate) {
	return Date.parse(currentDate) >= Date.parse(getDate());
}
function setOrgSelect(){
	if($("#currentOrgId").attr("text")){
		$("#contentDiv").find("#globalOrgBtnMod").find("span").text($("#currentOrgId").attr("text"));
		$("#globalOrgBtnMod.globalOrgBtnMod").html($("#currentOrgId").attr("text"));
	}
}

function setCrumbs(srcObj){
    var rootNode = $("#thisCrumbs"),
        firstElm = rootNode.find(".crumbs_first"),
        secondElm = rootNode.find(".crumbs_second"),
        threeElm = rootNode.find(".crumbs_three"),
        curElm = rootNode.find(".crumbs_cur"),
        srcObj = $(srcObj),
        firstTxt = $(".accordionMenuTit .tit").text();
    if(srcObj.parents(".issueMenu").length>0){
    	firstTxt = $("#topMenu .sysMenuList .select").text();
    }
    firstElm.text(firstTxt);
    curElm.text(srcObj.text());
    if( srcObj.parent().is("div") || srcObj.parents(".issueMenu").length>0){
        firstElm.addClass("secondNone");
        secondElm.addClass("secondNone");
        secondElm.empty();
        threeElm.empty();
    }else if(srcObj.parent().is("dd")){
    	 firstElm.removeClass("secondNone");
    	 secondElm.removeClass("secondNone");
    	 secondTxt = srcObj.parents(".uiContBase").prev().text();
     	 threeTxt = srcObj.parents(".hasChild").find("#childName").text();
     	 secondElm.text(secondTxt);
         threeElm.text(threeTxt);
    }else{
    	 firstElm.removeClass("secondNone");
    	 secondElm.addClass("secondNone");
         secondTxt = srcObj.parents(".uiContBase").prev().text();
         secondElm.text(secondTxt);
         threeElm.empty();
    }
}
function asyncOpen(srcObj, url) {
	if(url==undefined || url==''){
		$.messageBox({message:'系统地址出错，请联系管理员',level:'error'});
		return;
	}
	document.title = $(srcObj).text();
	$("#baseLine").nextAll(":not(.ui-autocomplete):not('.ui-datepicker')").remove();
	$("#baseLine").nextAll(":not(.ui-autocomplete):not('.ui-datepicker'):hidden").remove();
	$("#contentDiv").html("");
	$("#loading").show();
	if(window.ajaxRequest){
    	window.ajaxRequest.abort();
	}
	window.ajaxRequest=$.ajax({
		url : url,
		cache: false,
		async: false,
		success : function(result) {
			proccessLoginResult(result,function(){
				$("#loading").hide();
				$("#contentDiv").html(result);
				setOrgSelect();
                setCrumbs(srcObj);
                window.ajaxRequest=null;
			});
		},
		error:function(err){
			$(".dialog_loading").hide();
			window.ajaxRequest=null;
			$.messageBox({message:'系统出错，请刷新页面重试',level:'error'});
		}
	});
}

var Convert = {
    StringToJSON: function(str) {
		return eval('(' + str + ')');
    },
    ToJSONString: function(obj) {
        switch(typeof(obj))
        {
            case 'object':
                var ret = [];
                if (obj instanceof Array)
                {
                    for (var i = 0, len = obj.length; i < len; i++)
                    {
                        ret.push(Convert.ToJSONString(obj[i]));
                    }
                    return '[' + ret.join(',') + ']';
                }
                else if (obj instanceof RegExp)
                {
                    return obj.toString();
                }
                else
                {
                    for (var a in obj)
                    {
                        ret.push(a + ':' + Convert.ToJSONString(obj[a]));
                    }
                    return '{' + ret.join(',') + '}';
                }
            case 'function':
                return 'function() {}';
            case 'number':
                return obj.toString();
            case 'string':
                return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) {return ("\n"==a)?"\\n":("\r"==a)?"\\r":("\t"==a)?"\\t":"";}) + "\"";
            case 'boolean':
                return obj.toString();
            default:
                return obj.toString();

        }
    }
};
