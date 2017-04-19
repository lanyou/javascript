window.moveTo(0,0);
if(document.all){
	top.window.resizeTo(screen.availWidth,screen.availHeight); 
}else if(document.layers||document.getElementById){
	if(top.window.outerHeight<screen.availHeight||top.window.outerWidth<screen.availWidth){
		top.window.outerHeight = screen.availHeight;
		top.window.outerWidth = screen.availWidth;
	}
}
var startDate=new Date();
var isPopLoginDialog=false;

// 简化 console.log 写法
window.ll = function f() {
    ll.history = ll.history || [];
    ll.history.push(arguments);
    if (this.console) {
        var a = arguments, c;
        try {
            a.callee = f.caller;
        } catch (b) {}
        c = [].slice.call(a);
        if (typeof console.log === "object") {
            log.apply.call(console.log, console, c);
        } else {
            console.log.apply(console, c);
        }
    }
};

// 屏蔽 console.log错误
(function(e) {
    function g(){}
    for (var h = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), i; !!(i = h.pop()); ) {
        e[i] = e[i] || g;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch (b) {
        return window.console = {};
    }
    try {
        ll();
        return ll;
    } catch (b) {
        return ll = {};
    }
}());


// 模块加载器
(function() {
    var moduleMap = {};
    var noop = function (){};
    window.TQ = {
        define: function(name, dependencies, factory) {
            if (!moduleMap[name]) {
                var module = {
                    name: name,
                    dependencies: dependencies,
                    factory: factory
                };
                moduleMap[name] = module;
            }
            return moduleMap[name];
        },
        use:function(name,callback){
            return moduleMap[name].factory.apply(callback);
        }
    };
})();


$.extend({
	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;
	
		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		// Allow a pre-filtering function to sanitize the response
		// s is checked to keep backwards compatibility
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		// The filter can actually parse the response
		if ( typeof data === "string" ) {
			// Get the JavaScript object, if JSON is used.
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			// If the type is "script", eval it in global context
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	},
	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) {
			s.error.call( s.context, xhr, status, e );
		}

		// Fire the global callback
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxError", [xhr, s, e] );
		}
	},
	layout:function(option){
		function layoutFun(){			
			var documentHeight=document.body.clientHeight-$(".ui-layout-north").outerHeight()-$(".ui-layout-south:visible").outerHeight();
			var rightWidth=document.documentElement.clientWidth-$(".ui-layout-west:visible").width()-10;
			$(".ui-layout-center,.slideResizer").height(documentHeight-5);
			$(".ui-layout-center").width(rightWidth);
			$(".slideResizer .slideToggler").css("margin-top",documentHeight/2);
			//$(".ui-layout-north .sysMenuList").width(document.documentElement.clientWidth);//ie6 bug
			if(window._currentGrid!=undefined && !window._currentGrid.closest(".leaderCon")[0] && !window._currentGrid.closest(".workbenchTabList")[0] && window._currentGrid.closest(".ui-layout-center")[0]){
				window._currentGrid.setGridWidth(rightWidth-$(".superviseCenterRight:visible").width()-$("#contentDiv .center-left").width()-$("#contentDiv .center-content-right").width()-20).setGridHeight($(".ui-layout-center").height()-$("#nav:visible").outerHeight()-$("#thisCrumbs:visible").outerHeight()-$(".content-top").height()-$("#content-top").height()-$(".groupNav").height()-$("#commonPopulation:visible").height()-$(".ui-tabs-nav").outerHeight()-$("#viewPrimaryMemer").prev().outerHeight()-$("#contractCommonPopulation").outerHeight(true)-$("#statistics").outerHeight(true)-65);
			}
		}
		layoutFun();
		$(window).resize(function(){
			clearTimeout(window._layoutTimer);
			window._layoutTimer=setTimeout(function(){
				layoutFun();
			},300);
		});
		$(".slideResizer .slideToggler").toggle(function(){//缩进条按钮事件
			$(".ui-layout-west").hide();
			$(".slideResizer .slideToggler").addClass("slideTogglerCur").attr("title","展开");
			layoutFun();
			$(window).trigger("resize");
		},function(){
			$(".ui-layout-west").show();
			$(".slideResizer .slideToggler").removeClass("slideTogglerCur").attr("title","缩进");
			
			layoutFun();
			$(window).trigger("resize");
		});
	},
	versionIntroduction:function(options){
		var dfop={
			data:[
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version1.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version2.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version3.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version4.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version5.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version6.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version7.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version8.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version9.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version10.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version11.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version13.png" />'},
				{url:'javascript:;',content:'<img src="/resource/system/images/version/3.1.0/version14.png" />'}
			],
			close:function(){
				
			}
		};
		$.extend(dfop, options);
		var $stepFocusBox;
		function init(){//初始化
			if($("#stepFocusBox")[0]){
				$stepFocusBox=$("#stepFocusBox");
			}else{
				$stepFocusBox=$('<div class="focusBox" id="stepFocusBox"><div class="innerBox"><a href="javascript:;" title="关闭" class="close" id="stepFocusBoxClose"></a><a class="prev" href="javascript:;"></a><a class="next" href="javascript:;"></a><ul class="pic" id="stepBox"></ul><ul class="hd" id="stepBoxPager"></ul></div></div><div class="version-overlay"></div>');
				$("body").prepend($stepFocusBox);
			}
		}
		function bindEvent(){//绑定事件
			$("#stepFocusBox").hover(function(){
				$(this).find(".prev,.next").show();
			},function(){
				$(this).find(".prev,.next").hide();
			});
			$('#stepBox').imageready(function () {
				if(navigator.userAgent.indexOf('MSIE 6')>-1){
		    		$("#stepBox img").each(function(){
		    			var thisW=$(this).width();
		    			var thisH=$(this).height();
		    			setPNG(this,thisW,thisH);
		    		})
				}
		    });
		    $("#stepClose,#stepFocusBoxClose").click(close);
			$("#stepFocusBox").bgiframe();
			$("#stepFocusBox").slide({mainCell:".pic",effect:"left",pnLoop:false, autoPlay:false, delayTime:300, trigger:"click"});
		}
		function build(){//构建内容
			function buildStep(stepIndex){
				var $thisStep=$("<li />");
				$self.append($thisStep);
				$("#"+selfId+"Pager").append('<li title="'+stepIndex+'" />');
				return $thisStep;
			}
			function buildStepCtt($step,thisData,index){
				var $link=$("<a />").attr("href",thisData.url).html(thisData.content),
					$thisStepCtt=$("<div />").addClass("step").append($link);
				if((index+1)%3==2){
					$thisStepCtt.addClass("right");
				}
				$step.append($thisStepCtt);
			}
			var stepIndex=1,$step=buildStep(1);
			for(var i=0;i<dfop.data.length;i++){
				buildStepCtt($step,dfop.data[i],i);
				if(i==dfop.data.length-1){
					$closeBtn=$('<a href="javascript:;" class="stepBtn" id="stepClose">立即使用</a>');
					$step.append($closeBtn);
				}
				if((i+1) % 3==0){
					$step=buildStep(++stepIndex);
				}
			}
		}
		function close(){
			dfop.close();
			$("#stepFocusBox").fadeOut("slow",function(){
				$(this).remove();
			});
			$(".version-overlay").remove();
		}
		init();
		var selfId='stepBox';
		var $self=$("#"+selfId);
		build();
		bindEvent();
	},
	messageBox : function(options) {
		var dfop={
			message: false,
			level: "success",
			speed: 500,
			life:3000
		};
		$.extend(dfop, options);
		if(options=='close'){
			$("#jGrowl").removeAttr("style").empty();
			return false;
		}
		if(!$("#jGrowl")[0]){
			$("body").append("<div id='jGrowl'></div>")
		}else{
			$("#jGrowl").removeAttr("style").empty();
		}
		if(typeof(dfop.message) == 'string'){
			var _tmpString = (dfop.message.indexOf("<") == 0 ? $(dfop.message).text() : dfop.message).replace(new RegExp("(\t|\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))", "g"), "");
			dfop.message = _tmpString.indexOf("{") == 0 ? eval("("+_tmpString+")") : _tmpString;
		}
		dfop.message = dfop.message.message ? dfop.message.message : dfop.message;
		dfop.level = dfop.message.expLevel ? dfop.message.expLevel : dfop.level;
		dfop.message='<div class="'+dfop.level+'"><span></span>'+dfop.message+'</div>';
		$("#jGrowl").addClass("jGrowl").append(dfop.message).animate({top:0},dfop.speed);
		function hideMessageBox(){
			clearTimeout(window._messageBox);
			window._messageBox=setTimeout(function(){
				$("#jGrowl").remove();
			},dfop.life);
		}
		hideMessageBox();
		$("#jGrowl").hover(function(){
			clearTimeout(window._messageBox);
		},function(){
			hideMessageBox();
		})
	},
	tab:function(option){
		  var defaultOption={
		   tab:"",
		   box:"",
		   hover:""
		  }
		  $.extend(defaultOption,option);
		  var _tab=$(defaultOption.tab);
		  var _box=$(defaultOption.box);
		  var _hover=defaultOption.hover;
		  var _index;
		  _tab.click(function(){
		   _index=_tab.index(this);// 获取当前点击的索引值
		   $(this).addClass(_hover).siblings().removeClass(_hover);
		   _box.eq(_index).show().siblings().hide();
		  }).eq(0).click();
	},
	dialogLoading:function(option){
		var _init=function(){
			$("body").prepend('<div class="dialog_loading"><div id="dialogLoading" style="margin-top:250px;"></div></div>')
			var opts = {
			  lines: 12,
			  length: 13,
			  width: 5,
			  radius: 5,
			  corners: 1, 
			  rotate: 0, 
			  direction: 1,
			  color: '#333',
			  speed: 1,
			  trail: 100,
			  shadow: false,
			  hwaccel: false,
			  className: 'spinner',
			  zIndex: 2e9,
			  top: 'auto',
			  left: 'auto' 
			};
			var target = document.getElementById('dialogLoading');
			var spinner = new Spinner(opts).spin(target);
		};
		if(typeof(option)=='string'){
				if(option=="open"){
					_init();
					$(".dialog_loading").show();
				}
				if(option=="close"){
					$(".dialog_loading").remove();
				}
		}
	},
	loadingComp:function(option){
		var _init=function(){
			$("body").prepend('<div class="dialog_loading"><div class="loadingcon"></div></div>')
		};
		if(typeof(option)=='string'){
				if(option=="open"){
					_init();
					$(".dialog_loading").show();
				}
				if(option=="close"){
					$(".dialog_loading").remove();
				}
		}
	},
	navDropdownBtn:function(){
		$(".nav-dropdownBtn").live("mouseover",function(event){
			var that=this;
			clearTimeout(window._navBtnOutTimer);
			window._navBtnInTimer=setTimeout(function(){
				var top=$(that).position().top+$(that).height();
				var left=$(that).position().left-15;
				$(".nav-sub-buttons").hide();
				$(that).next(".nav-sub-buttons").css({
					top:top,
					left:left
				}).fadeIn(200);
			},200)
		}).live("mouseout",function(){
			clearTimeout(window._navBtnInTimer);
			window._navBtnOutTimer=setTimeout(function(){
				$(".nav-sub-buttons").hide()
			},500)
		})
		$(".nav-sub-buttons").live("mouseover",function(){
			clearTimeout(window._navBtnOutTimer);
		})
		$(".nav-sub-buttons").live("mouseout",function(){
			window._navBtnOutTimer=setTimeout(function(){
				$(".nav-sub-buttons").hide()
			},500)
		})
	},
	pulldownFun:function(option){
		var dfop={
			onHover:"on"
		}
	    var op=this.op=$.extend(dfop,option||{});
	    var on  = $(op.on),
	        dlg = $(op.dialog),
	        onHov=op.onHover,
	        mouseover_tid = [],
	        i   = 0;
	    
	    on.hover(
	        function(){
	            if(op.offset){
	                var offset=on.offset();
	                dlg.css({'top':offset.top+(+op.offset),'left':offset.left-(+op.offset-13)})
	            }
	            dlg.slideDown(50)
	            clearTimeout(mouseover_tid[i]);
	            $(op.on).addClass(onHov);
	        }, function(){
	            mouseover_tid[i] = setTimeout(function(){
	                dlg.slideUp(50)
	            },20)
	            $(op.on).removeClass(onHov);
	        }
	    )
	    dlg.hover(
	        function(){
	            clearTimeout(mouseover_tid[i]);
	            $(op.on).addClass(onHov);
	        }, function(){
	            mouseover_tid[i] = setTimeout(function(){
	                dlg.slideUp(150)
	            },200)
	            $(op.on).removeClass(onHov);
	        }
	    )
	}
});
function enableSaveButton(option) {
	var dlgFirstButton = $('.ui-dialog-buttonpane:visible').find('button:first');
	if (dlgFirstButton == null) {
		return;
	}
	if (option) {
		dlgFirstButton.show();
	} else {
		dlgFirstButton.hide();
	}
}
$.fn.extend({
	uiMultiselect:function(o){
		var self=$(this);
		var dfop = {
			click: function(event, ui){},
			beforeopen: function(){$(".ui-multiselect-menu:visible .ui-multiselect-close").click();},
			open: function(){},
			beforeclose: function(){},
			close: function(){},
			checkAll: function(){},
			uncheckAll: function(){},
			optgrouptoggle: function(event, ui){
				/*
				var values = $.map(ui.inputs, function(checkbox){
				return checkbox.value;
				}).join(", ");
				$callback.html("Checkboxes " + (ui.checked ? "checked" : "unchecked") + ": " + values);
				*/
			},
			selectedList:3,
			checkAllText: '全选',
			uncheckAllText: '清空',
			noneSelectedText: '请选择',
			selectedText: '# 已选择'
		}
		$.extend(dfop,o);
		self.multiselect(dfop);
	},
	gridRowRightClick:function(o){
		var self=$(this);
		var dfop = { 
			width: 150, 
			items: [
				{text: "新增记录", icon: "/resource/system/js/contextmenu/css/images/icons/add.png", alias: "add", action: function(){
					$("#add").click();
				}},
				{text: "修改记录", icon: "/resource/system/js/contextmenu/css/images/icons/edit.png", alias: "edit", action: function(){
					var selectId=self.data("selectid");
					if(selectId && typeof updateOperator=='function'){
						updateOperator(selectId);
					}
				}},
				{text: "删除记录", icon: "/resource/system/js/contextmenu/css/images/icons/del.png", alias: "del", action: function(){
					var selectId=self.data("selectid");
					if(selectId && typeof deleteOperator=='function'){
						deleteOperator(selectId);
					}
				}},
				{text: "高级搜索", icon: "/resource/system/js/contextmenu/css/images/icons/search.png", alias: "search", action: function(){
					$("#search").click();
				}},
				{text: "刷新", icon: "/resource/system/js/contextmenu/css/images/icons/refresh.png", alias: "reload", action: function(){
					$("#reload").click();
				}}
			], 
			onShow: applyrule,
			onContextMenu: BeforeContextMenu
		};
		$.extend(dfop,o);
		
		function applyrule(menu) {               
			if (this.id == "target2") {
				menu.applyrule({ 
					name: "target2",
					disable: true,
					items: ["1-2", "2-3", "2-4", "1-6"]
				});
			}else {
				menu.applyrule({ 
					name: "all",
					disable: true,
					items: []
				});
			}
		}
		
		function BeforeContextMenu() {
			return this.id != "target3";
		}
		self.contextmenu(dfop);
	},
	resetFormData:function(o){
		var self=$(this);
		var dfop={
			not:''
		}
		$.extend(dfop,o);
		self.find(":input").not(':button, :submit, :reset, :hidden').not(dfop.not).val('').removeAttr('checked').removeAttr('selected');  
	},
	serializeObject:function(option) {
		var defaultOption = {
			excludeWhenNull:false
		};
		$.extend(defaultOption,option);
		function excludeWhenNull(name,value){
			if(defaultOption.excludeWhenNull){
				for(var i=0;i<defaultOption.excludeWhenNull.length;i++){
					if(defaultOption.excludeWhenNull[i]==name&&(value==""||value==null||value==undefined)){
						return false;
					}
				}
			}
			return true;
		}
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
			if(excludeWhenNull(this.name,this.value)){
		        if (o[this.name]) {
		            if (!o[this.name].push) {
		                o[this.name] = [ o[this.name] ];
		            }
	            	o[this.name].push(this.value || '');
		        } else {
					o[this.name] = this.value || '';
		        }
			}
	    });
	    return o;
	},
	
	getTabId:function(indexId){
		return $($($(this).children()[0]).children()[indexId]).find("a").attr("id");
	},
	
	tabFunction:function(options,formName){
		if(null!=formName){
			$.extend(options,{
				select: function(event, ui) {
					if($("#"+formName).hasClass('ui-tabs-hide')){
						enableSaveButton(true);
					}else{
						enableSaveButton(false);
					}
				}
			});
		}
		var defaultOption={
			select: function(event, ui) {$(".tip-yellowsimple,.tip-error").remove();$("input[createMsg='true']",$(this)).attr("createMsg","false")}
		};
		$.extend(defaultOption,options);
		$(this).tabs(defaultOption);
	},

	popup:function(popDom,closeButton){
			$(this).click(function(){
				$(popDom).hide();
				$(this).parent().children(popDom).show();
				$(this).parent().css("z-index","1");
				$(popDom).bgiframe();
			});
			$(closeButton).click(function(){
				$(this).parent().parent().hide();
			});
		},
	messageTip : function(options,methods){
		var self=$(this);
		var defaultOption={
			url:"#",
			show:true,
			width:120,
			cache:true,
			arrowPositionLeft:70,
			notAcceptNote:{title:"未受理短信",link:"javascript:void(0)",num:0,limits:false},
			notAcceptOnlineAppeals:{title:"未受理平台消息",link:"javascript:void(0)",num:0,limits:false},
			backlog:{title:"待办事项",link:"javascript:void(0)",num:0,limits:false},
			myAuditDelay:{title:"待审核事项",link:"javascript:void(0)",num:0,limits:false},
			data:{smsReceivedBoxNum:0,personnelMessageNum:0,myNeedDoNum:0,myAuditDelayNum:0},
			sessionTimeout:7200000,
			showTip:true
		};
        $.extend(defaultOption,options);
        //短信暂时不需要
        //defaultOption.notAcceptNote.num=defaultOption.data.smsReceivedBoxNum;
        if(defaultOption.data){
	        defaultOption.notAcceptOnlineAppeals.num=defaultOption.data.personnelMessageNum;
	        defaultOption.backlog.num=defaultOption.data.myNeedDoNum;
	        defaultOption.myAuditDelay.num=defaultOption.data.myAuditDelayNum;
        }
        var data=defaultOption.data;
 	   
		if(data!=null){
			data.messageNum = data.myNeedDoNum+data.personnelMessageNum+data.smsReceivedBoxNum+data.myAuditDelayNum;
			if(data.messageNum>0){
				clearInterval(window.messageInterval);
				window.messageInterval=setInterval(function(){$("#message #msg").toggle("fade")},600)
			}else{
				clearInterval(window.messageInterval);
			}
			$(".header-right-toolMenu #msg").html(data.messageNum);
		}
		if(!defaultOption.showTip){
			return false
		}
        var cookieName="messageTip";
		if($.cookie(cookieName)==null || methods=='show'){
			$.cookie(cookieName,true, { path: '/', expires: 10 });
		}
		if($.cookie(cookieName)=='false'){
			return false;
		}
        var live=function(cookieName){
			$(".message-tip .tip-close").click(function(){
				$(".message-tip").remove();
				$.cookie(cookieName,false, { path: '/', expires: 10 });
			});
			$("#noAcceptNote").bind("click",function(){
				showPageByTopMenu('interactionManagement-smsInboxManagement');
			});
			$("#unreadPlatformNews").bind("click",function(){
				showPageByTopMenu('interactionManagement-pmInboxManagement');
			});
			$("#backlogMessage").bind("click",function(){
				showPageByTopMenu('serviceWork-myIssueListManagement');
			});
			$("#myAuditDelayMessage").bind("click",function(){
				showPageByTopMenu('serviceWork-myAuditDelayListManagement');
			});
	    }
	   
		var notAcceptNoteHtml='';
        var notAcceptOnlineAppealsHtml='';
        var backlogHtml='';
        var myAuditDelayHtml='';
        if(defaultOption.notAcceptNote.limits){
        	notAcceptNoteHtml='<li>'+defaultOption.notAcceptNote.title +' <a href="'+defaultOption.notAcceptNote.link+'" id="noAcceptNote"><span>'+defaultOption.notAcceptNote.num+'</span></a> 条  </li>';
        }
        if(defaultOption.notAcceptOnlineAppeals.limits){
        	notAcceptOnlineAppealsHtml='<li>'+defaultOption.notAcceptOnlineAppeals.title +' <a href="'+defaultOption.notAcceptOnlineAppeals.link+'" id="unreadPlatformNews"><span>'+defaultOption.notAcceptOnlineAppeals.num+'</span></a> 条</li>';
        }
       if(defaultOption.backlog.limits){
    	    backlogHtml='<li>'+defaultOption.backlog.title +' <a href="'+defaultOption.backlog.link+'" id="backlogMessage"><span>'+defaultOption.backlog.num+'</span></a> 条</li>';
       }
       if(defaultOption.myAuditDelay.limits){
    	   myAuditDelayHtml='<li>'+defaultOption.myAuditDelay.title +' <a href="'+defaultOption.myAuditDelay.link+'" id="myAuditDelayMessage"><span>'+defaultOption.myAuditDelay.num+'</span></a> 条</li>';
       }

       var html='<div class="message-tip">'
	    	   +'<div class="tip-top"></div>'
    	   	   +'<div class="tip-msgCon">'
	    	   +'<h3 class="tip-tit"><strong class="tip-callBells"></strong>消息提醒<a href="javascript:;" class="tip-close"></a></h3>'
	    	   +'<ul class="tip-content">'
	    	   + notAcceptNoteHtml
			   + notAcceptOnlineAppealsHtml
			   + backlogHtml
			   + myAuditDelayHtml
	    	   +'</ul>'
	    	   +'</div>'
	    	   +'<div class="tip-bottom"></div>'
    	   +'</div>';
       
		if($(".message-tip")[0]){
			$(".message-tip").remove();
		}
        $(html).hide().appendTo("body").fadeIn(300);
       	live(cookieName);
	},
	workBenchMessageTip : function(options,methods){
		var self=$(this);
		var defaultOption={
			url:"#",
			show:true,
			width:120,
			cache:true,
			arrowPositionLeft:70,
			notAcceptOnlineAppeals:{title:"未受理平台消息",link:"javascript:void(0)",num:0,limits:false},
			backlog:{title:"待办事项",link:"javascript:void(0)",num:0,limits:false},
			data:{personnelMessageNum:0,myNeedDoNum:0},
			sessionTimeout:7200000,
			showTip:true
		};
        $.extend(defaultOption,options);
        //短信暂时不需要
        //defaultOption.notAcceptNote.num=defaultOption.data.smsReceivedBoxNum;
        if(defaultOption.data){
	        defaultOption.notAcceptOnlineAppeals.num=defaultOption.data.personnelMessageNum;
	        defaultOption.backlog.num=defaultOption.data.myNeedDoNum;
        }
        var data=defaultOption.data;
 	   
		if(data!=null){
			data.messageNum = data.myNeedDoNum+data.personnelMessageNum;
			if(data.messageNum>0){
				clearInterval(window.messageInterval);
				window.messageInterval=setInterval(function(){$("#message #msg").toggle("fade")},600)
			}else{
				clearInterval(window.messageInterval);
			}
			$(".header-right-toolMenu #msg").html(data.messageNum);
		}
		if(!defaultOption.showTip){
			return false
		}
        var cookieName="messageTip";
		if($.cookie(cookieName)==null || methods=='show'){
			$.cookie(cookieName,true, { path: '/', expires: 10 });
		}
		if($.cookie(cookieName)=='false'){
			return false;
		}
        var live=function(cookieName){
			$(".message-tip .tip-close").click(function(){
				$(".message-tip").remove();
				$.cookie(cookieName,false, { path: '/', expires: 10 });
			});
			$("#unreadPlatformNews").bind("click",function(){
				showPageByTopMenu('interactionManagement-pmInboxManagement');
			});
			$("#backlogMessage").bind("click",function(){
				showPageByTopMenu('serviceWork-myIssueListManagement');
			});
	    }
	   
        var notAcceptOnlineAppealsHtml='';
        var backlogHtml='';
        if(defaultOption.notAcceptOnlineAppeals.limits){
        	notAcceptOnlineAppealsHtml='<li>'+defaultOption.notAcceptOnlineAppeals.title +' <a href="'+defaultOption.notAcceptOnlineAppeals.link+'" id="unreadPlatformNews"><span>'+defaultOption.notAcceptOnlineAppeals.num+'</span></a> 条</li>';
        }
       if(defaultOption.backlog.limits){
    	    backlogHtml='<li>'+defaultOption.backlog.title +' <a href="'+defaultOption.backlog.link+'" id="backlogMessage"><span>'+defaultOption.backlog.num+'</span></a> 条</li>';
       }

       var html='<div class="message-tip">'
	    	   +'<div class="tip-top"></div>'
    	   	   +'<div class="tip-msgCon">'
	    	   +'<h3 class="tip-tit"><strong class="tip-callBells"></strong>消息提醒<a href="javascript:;" class="tip-close"></a></h3>'
	    	   +'<ul class="tip-content">'
			   + notAcceptOnlineAppealsHtml
			   + backlogHtml
	    	   +'</ul>'
	    	   +'</div>'
	    	   +'<div class="tip-bottom"></div>'
    	   +'</div>';
       
		if($(".message-tip")[0]){
			$(".message-tip").remove();
		}
        $(html).hide().appendTo("body").fadeIn(300);
       	live(cookieName);
	},
	dialogtip:function(option){
		var defaultOption={
			className: 'tip-error',
			showOn: 'none',
			alignTo: 'target',
			hideTimeout:0,
			showTimeout:0,
			alignX: 'center',
			alignY: 'bottom',
			offsetX: 0,
			offsetY: 5
		}
		$.extend(defaultOption,option);
		$(this).poshytip(defaultOption);
	},
	showTip:function(option){
		var self=$(this);
		var defaultOption={
			className: 'tip-yellowsimple',
			hideTimeout:0,
			showTimeout:0,
			offsetX: 5,
			offsetY: 5,
			showOn: 'focus',
			alignTo: 'target',
			alignX: 'right',
			alignY: 'center',
			positionRight:false
		};
		var outTimer,inTimer;
		$.extend(defaultOption,option);
		self.poshytip(defaultOption);
		self.hover(function(){
			clearTimeout(outTimer);
			self.poshytip('show');
		},function(){
			outTimer=setTimeout(function(){
				self.poshytip('hide')
			},3000);
			$(".tip-yellowsimple").hover(function(){
				clearTimeout(outTimer);
				self.poshytip('show');
			},function(){
				outTimer=setTimeout(function(){
					self.poshytip('hide')
				},1000);
			});
		});
		self.removeAttr("title");
	},
	inputtip:function(option){
		var inputtipName="inputtip";
		var inputtipValue=$.cookie("inputtip");
		if(inputtipValue==null){
			$.cookie(inputtipName,true, { path: '/', expires: 10 });
		}
		if(inputtipValue=='false'){
			return;
		}else{
			var self=$(this);
			var defaultOption={
				className: 'tip-yellowsimple',
				hideTimeout:0,
				showTimeout:0,
				offsetX: 5,
				offsetY: 5,
				showOn: 'focus',
				alignTo: 'target',
				alignX: 'right',
				alignY: 'center',
				liveEvents:true
			}
			$.extend(defaultOption,option);
			var tipMsg = self.attr("tipMsg");
			if(tipMsg && tipMsg!=""){
				defaultOption.content=tipMsg;
			}
			self.poshytip(defaultOption);
			self.bind("change",function(){
				$(this).poshytip('hide');
			})
			$(".tip-yellowsimple").bgiframe();
			// $(this).removeAttr("title");
		}
	},
	
	setButtonEnabled:function(enabled){
		if (enabled){
			$(this).buttonEnable();
		}else{
			$(this).buttonDisable();
		}
	},

	isButtonEnabled:function(){
		return !($(this).attr("disabled")=="true" || $(this).attr("disabled")=="disabled");
	},
	
	buttonDisable:function(){
		$(this).addClass("huise").addClass("disable").attr("disabled",true).removeAttr("href");
		$(this).hover(
				function () {
				$(this).removeClass("hover");
				},
				function () {
				$(this).removeClass("hover");
				}
		);
	},
	buttonEnable:function(){
		$(this).removeClass("huise").removeClass("disable").attr("disabled",false).attr("href","javascript:void(0)");
		$(this).hover(
			function () {
			$(this).addClass("hover");
			},
			function () {
			$(this).removeClass("hover");
			}
		);
	},
	datePicker : function(o) {
		var self = $(this);
		var dfop={
			showWeek: false,
			changeMonth: true,
			changeYear: true,
			yearSuffix: '',
			dateFormat:'yy-mm-dd',
			showButtonPanel: true,
			showClearButton:true
		};
		$.extend(dfop,o);
		if(!$("#ui-datepicker-div").attr("id")){
			$.datepicker.initialized = false;
		}
		$(this).datepicker(dfop);
	},
	dateTimePicker : function(o) {
		var self = $(this);
		var dfop={
			showWeek: false,
			changeMonth: true,
			changeYear: true,
			yearSuffix: '',
			dateFormat:'yy-mm-dd',
			showButtonPanel: true,
			showClearButton:true,
			timeFormat: 'HH:mm:ss',
			stepHour: 1,
			stepMinute: 1,
			stepSecond: 15,
			showSecond:false,
			showMinute:true,
			currentText: '今天',
			clearText: '清除',
			closeText: '确定',
			amNames: ['上午', 'A'],
			pmNames: ['下午', 'P'],
			timeSuffix: '',
			timeOnlyTitle: '选择时间',
			timeText: '时间',
			hourText: '时：',
			minuteText: '分：',
			secondText: '秒：',
			controlType:{
				create: function(tp_inst, obj, unit, val, min, max, step){
					$('<input class="ui-timepicker-input" value="'+val+'" style="width:50%">')
						.appendTo(obj)
						.spinner({
							min: min,
							max: max,
							step: step,
							change: function(e,ui){ // key events
									// don't call if api was used and not key press
									if(e.originalEvent !== undefined)
										tp_inst._onTimeChange();
									tp_inst._onSelectHandler();
								},
							spin: function(e,ui){ // spin events
									tp_inst.control.value(tp_inst, obj, unit, ui.value);
									tp_inst._onTimeChange();
									tp_inst._onSelectHandler();
								}
						});
					return obj;
				},
				options: function(tp_inst, obj, unit, opts, val){
					if(typeof(opts) == 'string' && val !== undefined)
							return obj.find('.ui-timepicker-input').spinner(opts, val);
					return obj.find('.ui-timepicker-input').spinner(opts);
				},
				value: function(tp_inst, obj, unit, val){
					if(val !== undefined){
						tp_inst._onTimeChange();
						return obj.find('.ui-timepicker-input').spinner('value', val);
					}
					return obj.find('.ui-timepicker-input').spinner('value');
				}
			}
		};
		$.extend(dfop,o);
		$(this).datetimepicker(dfop);
		if(self.val()!=''){
			var thisValue=self.val();
			var arr=thisValue.split(" ");
			var date=arr[0].split("-");
			var time=arr[1].split(":");
			self.datetimepicker('setDate',new Date(parseInt(date[0],10),parseInt(date[1],10)-1,parseInt(date[2],10),time[0],time[1],time[2]));
		}
		
	},
	accordionFunction:function(selector,content,option){
		// 左边菜单
		var self=$(this);
		var defaultOption={
				collapsible: true,
				header: "> " + content + " > " + selector,
				autoHeight: false
		};
		$.extend(defaultOption,option);
		self.accordion(defaultOption);
	},
	hoverDisplay:function(biaoqian){
		// 显示隐藏
	   $(this).children(biaoqian).hide();
	   $(this).hover(function(){
			$(this).children(biaoqian).stop(true,true).slideDown(400);
		},function(){
			$(this).children(biaoqian).stop(true,true).slideUp("fast");
		});
	},
	hoverChange:function(hoverClass){
		// 指向更改class
	   $(this).hover(
		  function () {
			$(this).css("cursor","hand");
			$(this).addClass(hoverClass);
		  },
		  function () {
			$(this).removeClass(hoverClass);
		  }
		);
	},
	popUpMore:function(options){
		var self=$(this);
		var selfId=$(this).attr("id");
		var conId=selfId+new Date().getTime();
		var popUpCon='';
		var thisWindow = {
			l: $(window).scrollLeft(),
			t: $(window).scrollTop(),
			w: $(window).width(),
			h: $(window).height()
		};
		var defaultOption = {
			data:[],
			className: 'tip-yellowsimple',
			hideTimeout:0,
			showTimeout:0,
			offsetX: 5,
			offsetY: 0,
			showOn: 'none',
			alignTo: 'target',
			alignX: 'right',
			alignY: 'center',
			openNew:true,
			content:function(){}
		}
		$.extend(defaultOption,options);
		var target='_blank';
		if(defaultOption.openNew!=true){
			target='_self'
		}
		defaultOption.content=function(){
			for(var i=0;i<defaultOption.data.length;i++){
				if(defaultOption.data[i].dailyDirectoryid){
					popUpCon=popUpCon+'<li><a href="'+defaultOption.data[i].url+'" id="'+selfId+'_item'+defaultOption.data[i].id+'" thisId = "'+defaultOption.data[i].id+'" dailyDirectoryId="'+defaultOption.data[i].dailyDirectoryid+'" target="'+target+'">'+defaultOption.data[i].text+'</a></li>';
				}else{
					popUpCon=popUpCon+'<li><a href="'+defaultOption.data[i].url+'" id="'+selfId+'_item'+defaultOption.data[i].id+'" thisId = "'+defaultOption.data[i].id+'" target="'+target+'">'+defaultOption.data[i].text+'</a></li>';
				}
			}
			return '<div class="popupcon" id="'+conId+'">'+'<a class="tip_close"></a>'+popUpCon+'</div>';
		};
		bindItemEvent=function(){
			for(var i=0;i<defaultOption.data.length;i++){
				var thisItem=$(".popupcon").find("li:eq("+i+") a");
				thisItem.bind("click",defaultOption.data[i].clickFun);
			}
		};

		var init=function(){
			var tipMsg = self.attr("tipMsg");
			if(tipMsg && tipMsg!=""){
				inputOption.content=tipMsg;
			}
			self.poshytip(defaultOption);
			$(".tip-yellowsimple").bgiframe();
		};
		var style=function(){
			var thisTop=$("#"+conId).closest(".tip-yellowsimple:first").css("top");
			thisTop=Number(thisTop.substring(0,thisTop.length-2));
		}
		self.bind("click",function(){// alert(33333333)
			$(".tip-yellowsimple:first").remove();
			popUpCon='';
			if(self.offset().left+300>thisWindow.w){
				defaultOption.alignX="left";
			}
			else{
				defaultOption.alignX="right";
			};
			init();
			self.poshytip("show");
			style();
			bindItemEvent();
			$("#"+conId+" .tip_close:first").bind("click",function(){
				self.poshytip("hide");
				$("#"+conId).closest(".tip-yellowsimple:first").remove();
			})
		});
	},
	passwordCheck:function(options){
		digitalspaghetti.password.el.passwordMinChar=null;
		digitalspaghetti.password.el.passwordStrengthBar=null;
		var self=$(this);
		var selfId=$(this).attr("id");
		var selfScore=0;
		var defaultOption={
			displayMinChar: false,
			minChar: 6,
			minCharText: '密码个数最少为 %d 个字符',
			colors: ["#ff0000", "#ff0099", "#99cc00", "#00ccff", "#00ccff"],
			scores: [20, 20, 50, 50],
			verdicts:	['弱', '弱', '中等', '强', '强'],
			raisePower: 1.4,
			debug: false,
			scoreVal:0,
			keyUp:function(selfScore){}
		}
		$.extend(defaultOption,options);
		self.pstrength(defaultOption);
		var word,score;
		self.keyup(function(){
			var word=self.attr("value");
			// defaultOption.scoreVal=self.pstrength.validationRules(word,score);
			selfScore=defaultOption.scoreVal;
			defaultOption.keyUp(selfScore);
		});
	},
	hoverEvent:function(thisEvent){
		var self=$(this);
		var selfId=self.children("a:first").attr("name");
		self.hover(
			function(){
				self.addClass("hover");
				self.children("span:first").addClass("delItem");
				self.children("span:first").bind("click",thisEvent);
			},
			function(){
				self.removeClass("hover");
				self.children("span:first").removeClass("delItem");
				self.children("span:first").unbind("click");
			}
		)
	},
	datepickers:function(o){
		var self=$(this);
		var dfop={
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			showWeek:false,
			yearSuffix: '',
			numberOfMonths: 1,
			datas:'.dates',
			yearRange: '1900:2030',
			maxDate:'+0d',
			onSelect: function(selectedDate) {
				
			},
			onClose:function(selectedDate){
				var option = $(this).data("flag") == "from" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
				if(dates.not(this).attr("value")=='' && $(this).attr("value") != ''){
					dates.not(this).focus();
				}
			}
		}
		$.extend(dfop,o);
		self.eq(0).data("flag","from");
		var dates=self.datepicker(dfop);
		self.eq(0).datepicker("option",dfop.from);
		self.eq(1).datepicker("option",dfop.to);
	},
	dateWeek:function(o){
		var self=$(this);
		var dfop={
			timer:1000
		}
		$.extend(dfop,o)
		var init=function(){
			var todayDate = new Date();
			var date = todayDate.getDate();
			var month = todayDate.getMonth() + 1;
			var year = todayDate.getFullYear();
			var weeks = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
			var hh = todayDate.getHours();
			var mm = todayDate.getMinutes();
			var ss = todayDate.getTime() % 60000;
			ss = (ss - (ss % 1000)) / 1000;
			var clock = hh + ':';
			if (mm < 10){
				clock += '0';
			}
			clock += mm + ':';
			if (ss < 10){
				clock += '0';
			}
			clock += ss;
			var string;
			string = year + "-" + month + "-" + date + "," + clock;
			self.html(string);
			return string;
		}
		setInterval(init,dfop.timer);
	},
	scrollWay:function(options){
		
		var $this=$(this);
		var maxLength= 0,
            upCount  = 0;

		dfop={
			floor:'.displayFloor',
			up:'',
			down:'',
			left:'',
			right:'',
			upLine:'1',
			leftLine:'11',
			speed:'3000',
			num:'1',
			pObject:'table',
			cObject:'tr',
			crObject:'td'
		};
		$.extend(dfop,options);
		
		/*button*/
		var _btnUp = $("#"+dfop.up),_btnDown = $("#"+dfop.down), _btnLeft = $("#"+dfop.left), _btnRight = $("#"+dfop.right);
		
		/*elements*/
		var scrollObj =$this.find(dfop.pObject);
		var floorCon=$(dfop.floor);
		
		var displayFloor=$("<ul/>").addClass("floorList").appendTo(floorCon);
		
		var marginUpSpace = parseInt(scrollObj
				.find(dfop.cObject+":first")
				.css("marginTop"),10)+parseInt(scrollObj
						.find(dfop.cObject+":first")
						.css("marginBottom"),10);
		
		var marginLeftSpace	= parseInt(scrollObj
				.find(dfop.cObject+":first "+dfop.crObject+":first")
				.css("marginLeft"),10)+parseInt(scrollObj
						.find(dfop.cObject+":first "+dfop.crObject+":first")
						.css("marginRight"),10);
		
		var paddingLeftSpace = parseInt(scrollObj
				.find(dfop.cObject+":first "+dfop.crObject+":first")
				.css("paddingLeft"),10)+parseInt(scrollObj
						.find(dfop.cObject+":first "+dfop.crObject+":first")
						.css("paddingRight"),10);
		
		var paddingUpSpace	= parseInt(scrollObj
				.find(dfop.cObject+":first "+dfop.crObject+":first")
				.css("paddingTop"),10)+parseInt(scrollObj
						.find(dfop.cObject+":first "+dfop.crObject+":first")
						.css("paddingBottom"),10);
		
		var borderTopSpace = parseInt(scrollObj
				.find(dfop.cObject+":first "+dfop.crObject+":first")
				.css("border-bottom-width"),10);


		var trHeight = parseInt(scrollObj
				.find(dfop.cObject+":first")
				.height(),10);

		// 合并前默认宽度
		var tdWidth	= parseInt(scrollObj
				.find(dfop.cObject+":first")
				.find(dfop.crObject)
				.outerWidth(),10);
		
		var allTdColspan = scrollObj.find(dfop.cObject+":first").find(dfop.crObject).attr("colspan");
		
		//合并后获取最小宽度
		if(allTdColspan > 1){
			//判断全部被合并的情况下
			tdWidth	=parseInt(scrollObj.find(dfop.cObject+":first").find(dfop.crObject).outerWidth(),10)/allTdColspan;
			
		}else{
			//判断非全部合并获取最小宽度
			scrollObj.find(dfop.cObject+":first").find(dfop.crObject).each(function(index){
				var _allTd = scrollObj.find(dfop.cObject+":first").find(dfop.crObject);
				
				if(_allTd.eq(index).outerWidth() > _allTd.eq(index-1).outerWidth()){
					tdWidth = _allTd.eq(index-1).outerWidth();
				}
			})
		}
		
		var lineTrH=marginUpSpace+trHeight+borderTopSpace;
		var lineTdW=tdWidth;
		var m=trSingleHeightLine = dfop.upLine ? parseInt(dfop.upLine, 10):parseInt($this.height()/lineTrH,10);
		var n=tdSingleWidthLine = dfop.leftLine ? parseInt(dfop.leftLine, 10):parseInt($this.width()/lineTdW,10);

		var upHeight = trSingleHeightLine * lineTrH;
		var leftWidth = tdSingleWidthLine * lineTdW;
		var spd = dfop.speed ? parseInt(dfop.speed,10):600;

        $this.data("len",scrollObj.find(dfop.cObject).length/parseInt(dfop.num,10));

		/*max length*/
		scrollObj.find(dfop.cObject).each(function(index){
			var thisLength=$(this).children(dfop.crObject).size();
			if(maxLength<thisLength){
				maxLength=thisLength;
			}
		});
		var leftCount=maxLength/dfop.num;
		/*create Floor*/
		function screateFloor(){
			var length=scrollObj.find(dfop.cObject).length;
			scrollObj.find(dfop.cObject).each(function(index){
				var index=length-index;
				var createLi=$("<li/>")
						.html("<div>第</div><div>"+index+"</div><div>层</div>")
						.appendTo(displayFloor)
						.height(lineTrH-1);
						
				createLi.children("div").css("lineHeight",lineTrH/3+'px');
				
				$(this).find(dfop.crObject).each(function(Tindex){
					var Tindex=Tindex+1;
					if(Tindex<10){
						if($(this).parent().find("td.split")[0]){
							
							if($(this).find("input:first").attr("value")==""){
								$(this).find("input:first").attr("value",(index)+'0'+parseInt(Tindex,10)+"[暂无数据!]");
							}
						}else{
							
							if($(this).find("input:first").attr("value")==""){
								$(this).find("input:first").attr("value",index+'0'+parseInt(Tindex,10)+"[暂无数据!]");
							}
						}
						
					}else{
						if($(this).parent().find("td.split")[0]){
							
							if($(this).find("input:first").attr("value")==""){
								$(this).find("input:first").attr("value",(index+1)+''+parseInt(Tindex,10)+"[暂无数据!]");
							}
						}else{
							
							if($(this).find("input:first").attr("value")==""){
								$(this).find("input:first").attr("value",index+''+parseInt(Tindex,10)+"[暂无数据!]");
							}
						}
					}
				})
			})
		}
		screateFloor();
		
		/*scroll Floor*/
		function scrollUp() {

			if (!scrollObj.is(":animated")) {
                upCount = $this.data("len");
				if (m < upCount) {

					m += trSingleHeightLine;
					scrollObj.animate({ marginTop: "-=" + upHeight + "px" }, spd);
					displayFloor.animate({ 
						marginTop: "-=" + upHeight + "px" 
						}, spd);
					
					if(m==upCount){
						_btnUp.removeClass("upEnable")
							.addClass("upDisable upHover");
					}else{
						_btnUp.addClass("upEnable")
							.removeClass("upDisable");
						
						_btnDown.addClass("downEnable")
							.removeClass("downDisable");
					}
				}
			} 
		}
		function scrollDown() { 
			if (!scrollObj.is(":animated")) {
				if (m > trSingleHeightLine) {
					m -= trSingleHeightLine; 
					scrollObj.animate({
							marginTop: "+=" + upHeight + "px"
						}, spd);
					displayFloor.animate({
							marginTop: "+=" + upHeight + "px"
						}, spd);
					
					if(m==trSingleHeightLine){
						_btnDown.removeClass("downEnable")
						.addClass("downDisable downHover");

					}else{
						_btnDown.addClass("downEnable")
						.removeClass("downDisable");
						
			
						_btnUp.addClass("upEnable")
						.removeClass("upDisable");
						
					}
					
				}
			} 
		}
		function scrollLeft() { 
			
			if (!scrollObj.is(":animated")) {
				if (n < leftCount) {
					n += tdSingleWidthLine;
					scrollObj.animate({
							marginLeft:"-="+leftWidth+"px"
						}, spd);
					
					if(n==leftCount){
						_btnLeft.removeClass("leftEnable")
							.addClass("leftDisable leftHover");
					}else{
						_btnLeft.addClass("leftDisable")
							.removeClass("leftEnable");
						_btnRight.addClass("rightEnable")
							.removeClass("rightDisable");
					}
					
				}
			}
		}
		function scrollRight() {
			if (!scrollObj.is(":animated")) { 
				if (n > tdSingleWidthLine) {
					n -= tdSingleWidthLine; 
					scrollObj.animate({
							marginLeft: "+=" + leftWidth + "px" 
						}, spd);
					if(n==tdSingleWidthLine){
						_btnRight.removeClass("rightEnable")
							.addClass("rightDisable rightHover");
					}else{
						_btnRight.addClass("rightEnable")
							.removeClass("rightDisable");
						_btnLeft.addClass("leftEnable")
							.removeClass("leftDisable");
					}	
				}
			} 
		}
		function scorllLeftFunc(){
			if(n<leftCount){
				scrollLeft();
				scrollRight();
			}else{
				return false;
			}
		}
		
		function scorllRightFunc(){
			if(n>dfop.leftLine){
				scrollRight();
			}else{
				return false;
			}
		}
		
		/*triggle event*/	
		function triggleEvent(){
			_btnUp.unbind("click").bind("click", scrollUp); 
			_btnDown.unbind("click").bind("click", scrollDown); 
			_btnLeft.unbind("click").bind("click", scorllLeftFunc); 
			_btnRight.unbind("click").bind("click", scorllRightFunc); 
		}
		triggleEvent();
	}
});
$.extend({
	sigmaReportLayout:function(){
		// 列表信息 和 柱图 饼图 外层容器计算高度
		$(".SigmaReport .highcharts-container").height(
			$(".ui-layout-center").outerHeight() - $("#chartsTabs .ui-tabs-nav").outerHeight() - $("#thisCrumbs").outerHeight()-$("#globalOrgBtnMod").outerHeight()-45
		).width(
			$(".ui-layout-center").outerWidth()-$("#chartsTabs ul:eq(0)").width() -40
		);
	},
	gridboxHeight:function(){
		var sigmaReportHeight=$(".ui-layout-center").outerHeight() - $("#chartsTabs .ui-tabs-nav").outerHeight() - $("#thisCrumbs").outerHeight()-$("#globalOrgBtnMod").outerHeight()-42
		$(".SigmaReport").height(sigmaReportHeight);
	},
	// 点击隐藏input框中的文字
	showTxtValue:function(){
		var f = $("input.show_search_btn");
		var t = $("input.show_search_btn").attr("value");
		f.focusin(function(){
			if(f.attr("value")==t){
				f.attr({"value":""})
			}
		}).focusout(function(){
		if(f.attr("value")==""){
			f.attr("value",t)
			}
		})
	}
});
$.fn.imageready = function (callback, userSettings) {
	function loaded() {
		unloadedImages--, !unloadedImages && callback()
	}
	function bindLoad() {
		this.one("load", loaded);
		if ($.browser.msie) {
			var src = this.attr("src"),
				param = src.match(/\?/) ? "&" : "?";
			param += options.cachePrefix + "=" + (new Date).getTime(), this.attr("src", src + param)
		}
	}
	var options = $.extend({}, $.fn.imageready.defaults, userSettings),
		$images = this.find("img").add(this.filter("img")),
		unloadedImages = $images.length;
	return $images.each(function () {
		var $this = $(this);
		if (!$this.attr("src")) {
			loaded();
			return
		}
		this.complete || this.readyState === 4 ? loaded() : bindLoad.call($this)
	})
};
$.fn.imageready.defaults = {
	cachePrefix: "random"
};


$.fn.peoSelect=function(o){
	var self=$(this);
	var selfId=self.attr("id");
	var selfHolder=$("#holder_"+selfId);
	var dfop={
		url:''
	}
	$.extend(dfop,o)
	var init=function(){
		var coordinate={
			left:selfHolder.offset().left,
			top:selfHolder.offset().top+selfHolder.outerHeight()
		}
		var peopleBox;
		$(".peopleSelectDlg").remove();
		peopleBox=$('<div class="peopleSelectDlg" id="'+selfId+'Dlg" />').css(coordinate).appendTo("body");
		$.ajax({
			url:dfop.url,
			data:dfop.postData,
			success:function(html){
				peopleBox.html(html);
				$(".peopleSelectDlg,.changeBtn,"+"#holder_"+selfId).click(function(event){
					event.stopPropagation();
				})
			}
		});
	}
	selfHolder.next().click(init);
	if( !dfop.noTextareaClick ){
		selfHolder.click(init);
	}
	selfHolder.delegate(".closebutton","click",function(event){
		var thisLi=$(this).closest("li");
		var data=thisLi.data("data");
		self.removePersonnelCompeleteValue(data);
		thisLi.remove();
		event.stopPropagation();
	})
}

$.fn.peopleSelect=function(orgId){
	var self=$(this);
	var selfId=self.attr("id");
	var dfop={
		url:'/common/commonPeopleSelect.jsp?orgId='+orgId,
		postData:{}
	};
	var init=function(){
		var coordinate={
			left:self.offset().left,
			top:self.offset().top+self.outerHeight()
		}
		var peopleBox;
		if($("#"+selfId+"Dlg")[0]){
			peopleBox=$("#"+selfId+"Dlg").css(coordinate);
			peopleBox.show();
		}else{
			peopleBox=$('<div class="peopleSelectDlg" id="'+selfId+'Dlg" />').css(coordinate).appendTo("body");
			$.ajax({
				url:dfop.url,
				data:dfop.postData,
				success:function(html){
					peopleBox.html(html);
				}
			});
		}
	};
	init();
};


$.fn.serviceObjectSelect=function(o){
	var self=$(this);
	var selfId=self.attr("id");
	var selfHolder=$("#holder_"+selfId);
	
	var dfop={
		url:''
	}
	$.extend(dfop,o)
	var init=function(){
		var coordinate={
			left:selfHolder.offset().left,
			top:selfHolder.offset().top+selfHolder.outerHeight()
		}
		var peopleBox;
		$(".peopleSelectDlg").remove();
		peopleBox=$('<div class="peopleSelectDlg" id="'+selfId+'Dlg" />').css(coordinate).appendTo("body");
		if(selfId=="serviceObjects"){
			var related = $("input[name='serviceRecord.isPlaceOrPeople']:checked").val();
			dfop.url="/plugin/serviceTeam/serviceObject/dispatch.action?mode=selectObject&objectType=&serviceObjects=&isPlaceOrPeople="+related;
		}
		$.ajax({
			url:dfop.url,
			data:dfop.postData,
			success:function(html){
				peopleBox.html(html);
				$(".peopleSelectDlg,.changeBtn,"+"#holder_"+selfId).click(function(event){
					event.stopPropagation();
				})
			}
		});
	}
	selfHolder.next().click(init);
	if( !dfop.noTextareaClick ){
		selfHolder.click(init);
	}
	selfHolder.delegate(".closebutton","click",function(event){
		var thisLi=$(this).closest("li");
		var data=thisLi.data("data");
		self.removePersonnelCompeleteValue(data);
		thisLi.remove();
		event.stopPropagation();
	})
}

$.cacheScript = function(obj) {
	var cache = (obj.cache === undefined) ? 'true' : obj.cache;
	$.ajax({type: 'GET', url: RESOURCE_PATH+obj.url+version, success:obj.callback, dataType: 'script', ifModified: true, cache: cache});
};