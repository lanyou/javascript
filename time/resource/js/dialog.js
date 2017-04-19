;(function ($) {
	$.createDialog = function(o) {
		var dfop = {
			id:"",
			title : "",
			width : 300,
			height : 400,
			modal : true,
			stack : true,
			resizable : false,
			bgiframe: true,
			position:'center',
			dragStart:function(){
				$(".tip-error").remove();
				$(".tip-yellowsimple").remove();
				$("*[createMsg='true']").attr("createMsg","false");
			},
			close:function(){
				docObj.empty();
			    docObj.dialog("destroy");
			    docObj.remove();
			},
			url:false
		}
		$.extend(dfop, o);
		var docObj=$("<div id='"+dfop.id+"'/>");
		docObj.appendTo("body");
		if(o.close){
			dfop.close = function(){
				o.close.call(dfop.close,docObj);
				docObj.empty();
			    docObj.dialog("destroy");
			    docObj.remove();
			    $(".tip-error").remove();
				$(".tip-yellowsimple").remove();
				$("*[createMsg='true']").attr("createMsg","false");
			};
		}
	    getAjax(dfop.url,docObj);
		function getAjax(url,docObj) {
			docObj.empty();
			docObj.html('<div style="margin-top:40px;margin-left:'+((dfop.width-100)/2)+'px"><img src="'+RESOURCE_PATH+'/resource/images/loading.gif" alt="加载中..." /></div>');
			docObj.bgiframe();
			docObj.dialog(dfop);
			docObj.width(docObj.width()).css({"overflowX":"hidden"});
			$.ajax( {
				url : url,
				cache: false,
				success : function(result) {
					proccessLoginResult(result,function(){docObj.html(result)});
				}
			});
		}
	};
	$.confirm=function(o){
		var dfop={
		    level: "info",//TODO 确认 warn 警告,alert,info
		    message: "",
		    title:"确认",
		    okFunc: false,
		    cancelFunc:false,
		    cancelBtnName:"取消",
		    okbtnName :"确定"
		};
		$.extend(dfop, o);
		var div=
			'<div title="'+dfop.title+'" >'
			+'<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>'
			+dfop.message
			+'</p>'
			+'</div>';
		var buttonStr="{'"+dfop.okbtnName+"':function(){" +
		'if(o.okFunc){'+
		'o.okFunc.call(dfop.okFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"},'"+dfop.cancelBtnName+"':function(){" +
		'if(o.cancelFunc){'+
		'o.cancelFunc.call(dfop.cancelFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"}}";

		var buttons=eval("("+buttonStr+")");

		dfop = {
			autoOpen: true,
			resizable : false,
			modal: true,
			buttons: buttons
		};
		$.extend(dfop, o);

		$(div).dialog(dfop);
	};
	$.notice=function(o){
		var dfop={
			level: 'info',//warn,alert,info
		    okbtnName: "确定",
		    title:'警告',
		    message: "",
		    okFunc: false
		};
		$.extend(dfop, o);
		var div=
			'<div title="'+dfop.title+'">'
			+'<p><span class="ui-icon ui-icon-alert" style="float:left; margin-right: .3em;"></span>'
			+dfop.message
			+'</p>'
			+'</div>';
		var buttonStr="{'"+dfop.okbtnName+"':function(){" +
		'if(o.okFunc){'+
		'o.okFunc.call(dfop.okFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"}}";

		var buttons=eval("("+buttonStr+")");

		dfop = {
				autoOpen: true,
				resizable : false,
				modal: true,
				buttons: buttons
		};
		$.extend(dfop, o);

		$(div).dialog(dfop);
	};
	$.yesNoCancelDlg=function(o){
		var dfop={
			level: 'info',//warn,alert,info
		    yesFunc: false,
		    noFunc: false,
		    cancelFunc:false,
		    message: "",
		    title:"",
		    yesBtnName: "是",
		    noBtnName:"否",
		    cancelBtnName: "取消"
		};
		$.extend(dfop, o);
		var div=
			'<div title="'+dfop.title+'">'
			+'<p><span class="ui-icon ui-icon-alert" style="float:left;margin-right: .3em;"></span>'
			+dfop.message
			+'</p>'
			+'</div>';
		var buttonStr="{'"+dfop.yesBtnName+"':function(){" +
		'if(o.yesFunc){'+
		'o.yesFunc.call(dfop.yesFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"},'"+dfop.noBtnName+"':function(){" +
		'if(o.noFunc){'+
		'o.noFunc.call(dfop.noFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"},'"+dfop.cancelBtnName+"':function(){" +
		'if(o.cancelFunc){'+
		'o.cancelFunc.call(dfop.cancelFunc,$(this));'+
		'}'+
		"$(this).dialog('destroy');$(this).remove();"+
		"}}";

		var buttons=eval("("+buttonStr+")");

		dfop = {
			autoOpen: true,
			resizable : false,
			modal: true,
			buttons: buttons
		};
		$.extend(dfop, o);

		$(div).dialog(dfop);
	};
	$.fn.createDialog = function(o) {
	    var selfId=this.selector.substring(1,this.selector.length);
	    if(this[0]==undefined){
	    	$("body").append('<div id="'+selfId+'"></div>');
	    }
	    var self=$("#"+selfId);
		var dfop = {
			title : "",
			width : 300,
			height : 400,
			modal : true,
			resizable : false,
			close : function(){},
			ajaxType:"get",//post or get
			postData:{},
			stack : true,
			url:false,
			position:'center',
			shouldEmptyHtml:true,
			dragStart:function(){
				$(".tip-error").remove();
				$(".tip-yellowsimple").remove();
				$("*[createMsg='true']").attr("createMsg","false");
				self.css("opacity",'0.1');
				self.parent().removeClass("fadeIn");
			},
			dragStop:function(){
				self.css("opacity",'1');
			},
			loadComplete:function(){
			},
			open:function(){
				self.parent().addClass("fadeIn");
			}
		};
		$.extend(dfop, o);
		
		//wangxiaohu add operatingTimeLog 20140429
		var uba_startDateTime = new Date().getTime(), isHasBox = false, forIndex = 0, writeIndex = 0, minEventUseTime = 200, maxEventUseTime = 1000 * 60 * 5, uba_all_element = 'textarea,input[type="text"],select,object', uba_all_title = '@UBA_ALL_TITLE';
		$("#"+selfId).attr('uba_tabId', new Date().getTime()).attr('uba_tabId_index', 0);
		function _UBA_sendAjax(doName){
			if(o != null && typeof(UBA_dealNull) == 'function' && typeof(UBA_WEB_ACCESS_OPERATING_PATH) == 'string' && typeof(UBA_ARRAY_HAS_URL) == 'function' && (UBA_ARRAY_HAS_URL(window.location.hash+o.title) || UBA_ARRAY_HAS_URL(window.location.hash+uba_all_title))){
				var _time = new Date().getTime(), _ubaModuleName = UBA_dealNull($("#thisCrumbs:visible").text()).replace(new RegExp("(undefined|当前位置|当前层级| |:|：|\t|\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))", "g"), "");
				$.ajax({type: 'POST', url: UBA_WEB_ACCESS_OPERATING_PATH+'uba_operatingTime.png?orgName='+ encodeURI(UBA_dealNull($("#CURRENT_SYSTEM_NAME").attr("orgName"))) 
										+ '&userName=' + encodeURI(UBA_dealNull($("#CURRENT_SYSTEM_NAME").attr('user')))
										+ '&doName=' + encodeURI(doName)
										+ '&sysName=' + encodeURI(UBA_dealNull($("#CURRENT_SYSTEM_NAME").val()))
										+ '&modelName=' + encodeURI(_ubaModuleName == '>>' ||　_ubaModuleName == '>>>' || $("#contentDiv").text().length == 0 ? ($("div.workbenchMain").length == 1 ? '首页' : '') : _ubaModuleName)
										+ '&nowStep=' + encodeURI(UBA_dealNull(o.title))
										+ '&title=' + encodeURI(UBA_dealNull(o.title))
										+ '&trajectoryInfo=' + encodeURI('[' + UBA_dealNull($("#"+selfId).attr('uba_trajectoryInfo')).substr(1).replace(new RegExp('&', 'g'),'%26').replace(new RegExp('\\?', 'g'),'%3F').replace(new RegExp('=', 'g'),'%3D')+ "]")
										+ "&time=" + (_time - uba_startDateTime)
										+ "&tabId=" + $("#"+selfId).attr('uba_tabId') + '_'+ $("#"+selfId).attr('uba_tabId_index')
										+ "&url=" + UBA_dealNull(o.url).replace(new RegExp('&', 'g'),'%26').replace(new RegExp('\\?', 'g'),'%3F').replace(new RegExp('=', 'g'),'%3D'), dataType: 'jsonp'});
				uba_startDateTime = _time;
				$("#"+selfId).attr('uba_tabId_index', parseInt($("#"+selfId).attr('uba_tabId_index'))+1);
				$("#"+selfId).attr('uba_trajectoryInfo', '');
			}
		}
		function UBA_bind_FOCUS(){
			if($(this).is('object') && $(this).attr('id').indexOf('Uploader') != -1 && 'application/x-shockwave-flash' == $(this).attr('type')){
				var _fileDom = $("#" + $(this).attr('id').replace('Uploader', ''));
				if(_fileDom != null && _fileDom.length != 0 && _fileDom.attr('type') == 'file'){
					_fileDom.attr("UBA_TABLE_ID", selfId).attr("UBA_useTime_startTime", new Date().getTime()).attr("uba_writeIndex", writeIndex);
					writeIndex++;
				}
			} else {
				$(this).attr('UBA_useTime_startTime', new Date().getTime()).attr('UBA_useTime_startValue', $(this).is('select') ? $(this).find('option:selected').text() : $(this).val());
			}
		}
		function UBA_bind_FIND_TEXT(jqDom){
			forIndex ++;
			var _domText = UBA_dealNull(jqDom.prev('div:visible').find('label.form-lbl:visible,label.form-lb1:visible').text()).replace('*', '').replace(new RegExp('(：| |\r|\t|\n|\s)', 'g'), '');
			if(_domText == '' && forIndex < 12){
				if(jqDom.prev('div:visible').children().length != 0){
					return UBA_bind_FIND_TEXT(jqDom.prev('div:visible'));
				} else {
					var _tempText = jqDom.prev('div:visible').children().length == 0 ? UBA_dealNull(jqDom.prev('div:visible').text()).replace('*', '').replace(new RegExp('(：| |\r|\t|\n)', 'g'), '') : '';
					return _tempText == '' ? UBA_bind_FIND_TEXT(jqDom.prev('div:visible')) : _tempText;
				}
			}
			return _domText;
		}
		function UBA_bind_BLUR(){
			var _endTime = new Date().getTime() - $(this).attr('UBA_useTime_startTime');
			if(!isNaN(_endTime) && !$(this).is('object') && _endTime >= minEventUseTime && _endTime <= maxEventUseTime){
				var _text = UBA_bind_FIND_TEXT($(this).parent('div')).replace(new RegExp('("|\')', 'g'), '“');forIndex = 0;
				var uba_trajectoryInfo_Arr = eval("["+(UBA_dealNull($("#"+selfId).attr('uba_trajectoryInfo')) == '' ? UBA_dealNull($("#"+selfId).attr('uba_trajectoryInfo')) : UBA_dealNull($("#"+selfId).attr('uba_trajectoryInfo')).substr(1))+"]"), isHasSameIndexData = false;
				for(var _ii = 0; _ii < uba_trajectoryInfo_Arr.length; _ii++){
					if(uba_trajectoryInfo_Arr[_ii].writeIndex != null && uba_trajectoryInfo_Arr[_ii].writeIndex == writeIndex){
						isHasSameIndexData = true;
						break;
					}
				}
				if(!isHasSameIndexData){
					var _logData = '{"text": "'+ (_text == '' ? '未知操作' : _text) +'", "useTime": "' + _endTime /*+'", "oldValue": "'+$(this).attr('UBA_useTime_startValue')*/+'", "newValue": "'+($(this).is('select') ? $(this).find('option:selected').text() : ''/*$(this).val()*/).replace(new RegExp('("|\')', 'g'), '“')+ '", "writeIndex": '+ writeIndex +', "tabIndex": '+$("#"+selfId).attr('uba_tabId_index')+"}";
					$("#"+selfId).attr('uba_trajectoryInfo', UBA_dealNull($("#"+selfId).attr('uba_trajectoryInfo')) + "," +  _logData);
					writeIndex++;
				}
			}
		}
		function UBA_bind_event(_dom){
			_dom.die('focus', UBA_bind_FOCUS).live('focus', UBA_bind_FOCUS).die('blur', UBA_bind_BLUR).live('blur', UBA_bind_BLUR);
		}
		//wangxiaohu end
		
		dfop.close=function(){
		    if(o.close){
			   o.close.call(dfop.close,$(this));
		    }
		    if(dfop.shouldEmptyHtml){
		    	$(this).empty();
		    }
		    $(".tip-error").remove();
		    $(".tip-yellowsimple").remove();
		    $("*[createMsg='true']").attr("createMsg","false");
		    self.parent().removeClass("fadeIn");
		    self.dialog("destroy");
		    $(".peopleSelectDlg").remove();
/*		    self.parents(".ui-dialog").nextAll("#jSIPContainer").remove();*/		
			//wangxiaohu add 20140429 关闭事件处理
			if(typeof(UBA_ARRAY_HAS_CLOSE) == 'function' && (UBA_ARRAY_HAS_CLOSE(window.location.hash+o.title) || UBA_ARRAY_HAS_CLOSE(window.location.hash+uba_all_title))  && !isClickSave) {
				_UBA_sendAjax('关闭');
			}
			isClickSave = false;
			if(typeof(UBA_ARRAY_GET_DOM) == 'function'){
				var _uba_dom = UBA_ARRAY_GET_DOM(window.location.hash+o.title) == null ? UBA_ARRAY_GET_DOM(window.location.hash+uba_all_title) : UBA_ARRAY_GET_DOM(window.location.hash+o.title);
				if(_uba_dom != null){
					if(_uba_dom === 'all'){
						$("#"+selfId).find(uba_all_element).die('focus', UBA_bind_FOCUS).die('blur', UBA_bind_BLUR);
					} else {
						$("#"+selfId).find(_uba_dom).die('focus', UBA_bind_FOCUS).die('blur', UBA_bind_BLUR);
					}
				}
			}
			//wangxiaohu end
		}
		if($.cookie('bigFontStyle')>=16){
			dfop.width=dfop.width+80;
		}

		getAjax(dfop.url,self);
		function getAjax(url,docObj) {
			docObj.empty();
			docObj.html('<div style="margin-top:40px;margin-left:'+((dfop.width-100)/2)+'px"><img src="'+RESOURCE_PATH+'/resource/images/loading.gif" alt="加载中..." /></div>');
			docObj.dialog(dfop);
			docObj.width(docObj.width());
			//docObj.next().find("button:contains('保存')").click(function(){var butt=$(this);$(this).attr("disabled",true);setTimeout(function(){butt.removeAttr('disabled');},5000);});
			$.ajax( {
				url : url,
				type: dfop.ajaxType,
				cache: false,
				data:dfop.postData,
				success : function(result) {
					proccessLoginResult(result,function(){docObj.html(result);});
					docObj.children("#dialog-form:first").removeAttr("title");
					dfop.loadComplete();
					self.unbind("scroll").scroll(function(){
						$(".tip-error").remove();
						$(".ui-autocomplete").hide();
					})
					//wangxiaohu 文档加载完毕处理 2013-04-29
					uba_startDateTime = new Date().getTime();
					isHasBox = $("#"+selfId+" .dlgBox").length != 0;
					if(typeof(UBA_ARRAY_GET_DOM) == 'function'){
						var _uba_dom = UBA_ARRAY_GET_DOM(window.location.hash+o.title) == null ? UBA_ARRAY_GET_DOM(window.location.hash+uba_all_title) : UBA_ARRAY_GET_DOM(window.location.hash+o.title);
						if(_uba_dom != null){
							if(_uba_dom === 'all'){
								UBA_bind_event($("#"+selfId).find(uba_all_element));
							} else {
								UBA_bind_event($("#"+selfId).find(_uba_dom));
							}
						}
					}
					//wangxiaohu end
				}
			});
		}
		return self;
	};
})(jQuery);