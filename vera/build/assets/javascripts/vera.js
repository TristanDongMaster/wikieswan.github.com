;(function($){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    window._ = vera;
   
})(Zepto);


;(function($,vera){
	//button loading 
	$.fn.button = function(option){
		var text = '';
		if(typeof option === 'undefined'){
			return false;
		}
		if(option.disabled){
			text = this.text();
			this.attr('data-text',text).removeClass('btn-red').addClass('btn-diasbled').text('安全加载中...');
		}
		else {
			text = this.data('text');
			this.removeClass('btn-diasbled').addClass('btn-red').text(text);
		}

	};

	/**
	dom 	 : string 
	action 	 : string 'on' 'off'
	callback : function
	**/
	vera.buttonLoading = function(dom,action,callback){
		var wrap = $(dom).find('.btn-loading-wrap')
		//返回btn是否处于loading状态
		if(typeof action==='undefined' && typeof callback==='undefined'){
			return $(wrap).hasClass('btn-loading-wrap-on')
		}
		//on ,turn on loading
		if(action==='on'){
			$(wrap).addClass('btn-loading-wrap-on')
		}
		//off,turn off loading
		else if(action==='off'){
			$(wrap).removeClass('btn-loading-wrap-on')
		}
		if(typeof callback==='function'){
			callback();
		}
	}
})(Zepto,vera)
;(function($,vera){
	vera.checkbox = new Checkbox();

	//checkbox
	function Checkbox(){
		//checkbox checkkbox-default checkkbox-selected checkkbox-disabled
		var self = this;
		self.get = function(selector){
			var val = $(selector).find('.checkbox').hasClass('checkkbox-selected');
			return val;
		};
		self.set = function(selector,value){
			var checkkbox = $(selector).find('.checkbox');
			if(checkkbox.hasClass('checkkbox-disabled')){
				return false;
			}
			if(value){ // true
				checkkbox.removeClass('checkkbox-default').addClass('checkkbox-selected');
			}
			else{
				checkkbox.removeClass('checkkbox-selected').addClass('checkkbox-default');
			}
		};
		self.toggle = function(selector){
			var checkkbox = $(selector).find('.checkbox');
			if(checkkbox.hasClass('checkkbox-disabled')){
				return false;
			}
			if(checkkbox.hasClass('checkkbox-default')){
				checkkbox.removeClass('checkkbox-default').addClass('checkkbox-selected');
			}
			else{
				checkkbox.removeClass('checkkbox-selected').addClass('checkkbox-default');
			}
		};
	}
	$('[role="checkbox"]').tap(function(){
		vera.checkbox.toggle(this);
	});

})(Zepto,vera)
;(function(vera){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    vera.clearSpace = clearSpace;
    vera.formatInput = formatInput;

     //清除字符串内部的空格
    function clearSpace(str){
        var result = [], len = str.length;
        for(var i = 0; i < len; i++){
            if (str[i] == ' ') {
                continue;
            }
            result.push(str[i]);
        }
        return result.join('');
    }
    
    /**
    用户输入内容格式化
    参数:  str    String  用户输入内容
    格式:  stpe   String  格式化方式,'card_split'(default) 'mobile_split' idcard_split'
    */
    function formatInput (str, type) {
        type = type || 'card_split';
        var seg = [4,4,4,4,4,4];
        var maxlen = 50;
        switch(type){
            case 'card_split':
                seg = [4,4,4,4,4];
                maxlen = 19;
                break;
            case 'mobile_split':
                seg = [3,4,4];
                maxlen = 11;
                break;
            case 'idcard_split':
                seg = [6,8,4];
                maxlen = 18;
                break;
            default :
                break;
        }

        str = clearSpace(str).substr(0, maxlen);
        var start = 0;
        var result = [];
        for(var j = 0; j < seg.length; j++){
            var count = seg[j];
            var tmpstr = str.substr(start, count);
            if(tmpstr.length <= 0){
                break;
            }

            start = start + count;

            result.push(tmpstr);

            if(j == seg.length - 1){
                tmpstr = str.substr(start);
                if(tmpstr.length > 0){
                    result.push(tmpstr);
                }
            }

        }

        return result.join(' ');
    }
    
    
})(vera);


;(function($,vera){
	$('body').on('touchstart','[data-hover]',function(e){
		$(e.target).addClass('touching')
	});

	$('body').on('touchend','[data-hover]',function(e){
		$(e.target).removeClass('touching')
	});
})(Zepto,vera)
;(function($,vera){
	//input del
	$('body').on('focus','.v-ipt',function(e){
		var target = e.target;
		$(target).siblings('.del').removeClass('hide');
	}).on('blur','.v-ipt',function(e){
		var target = e.target;
		setTimeout(function(){
			$(target).siblings('.del').addClass('hide');
		},300);
	});
	$('body').on('input','.v-ipt',function(e){
		var target = e.target;
		$(target).siblings('.del').removeClass('hide');	
	});
	$('body').on('tap','.del',function(e){
		var target = e.target;
		$(target).addClass('hide').siblings('.v-ipt').val('');
	});
})(Zepto,vera)
;(function($,vera){
	
	//loading show hide
	function Loading(){
		var html = '<div class="loading">'+
						'<div class="loading-holder">'+
							'<div class="logo"></div>'+
							'<div class="text">'+
								'为您安全加载中'+
								'<div class="loading-style">'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
        this.obj =  $(html);
    };

    Loading.prototype = {
        show : function(){
            var _this = this;
            var _obj = this.obj;
            _obj.appendTo("body");
        },
        hide : function(){
            var _fn = this.fn;
            var _obj = this.obj;
            _obj.remove();
        	
        }
    };
    var loading = new Loading();
    vera.loading = function(option){
        if(typeof option==='undefined'){
        	return false;
        }
        if(option==='show'){
        	loading.show();
        }
        else if(option==='hide'){
        	loading.hide();
        }
    }
})(Zepto,vera)
;(function($,vera){
	var modalShowClass = 'modal-show';
	//modal
	function Modal(){
		var self = this;
		self.show = function(selector){
			$(selector).addClass(modalShowClass);
		}
		self.hide = function(selector){
			$(selector).removeClass(modalShowClass);
		}
	}
	vera.modal = new Modal();

	//modal
	//show hide
	$.fn.modal = function(option){
		if(option==='show'){
			this.addClass(modalShowClass);
		}
		else if(option==='hide'){
			this.removeClass(modalShowClass);
			$('body').css('overflow','auto')
		}
	};

	//modal dom ctrl
	$('body').on('tap','[data-modal]',function(e){
		var target = e.target,
			modalId = $(target).data('modal'),
			action = $(target).data('action');
		if (modalId==''){
			return false;
		}	
		if (action=='') {
			return false;
		}
		if(action==='show'){
			$(modalId).modal('show');
		}
		else if(action=='hide'){
			$(modalId).modal('hide');
		}
	});
})(Zepto,vera)
;(function($,vera){
	//tabs controller
	$('body').on('tap','.tab',function(e){
		var target = e.target,
			tabVal = $(target).data('tab'),
			$pannelLeft = $('[data-pannel="left"]'),
			$pannelRight = $('[data-pannel="right"]');
		if(tabVal===undefined){
			return false;
		}	
		$(target).addClass('active').siblings('.tab').removeClass('active');
		if(tabVal==='left'){
			$pannelLeft.removeClass('hide');
			$pannelRight.addClass('hide');
		}
		else{
			$pannelLeft.addClass('hide');
			$pannelRight.removeClass('hide');
		}
	});
})(Zepto,vera)
;(function($,vera){
	//trace
	var Trace = function(text,fn){
        this.obj =  $('<div class="trace">'+text+'</div>');
        this.fn = fn;
    };

    Trace.prototype = {
        show : function(){
            var _this = this;
            var _obj = this.obj;
            _obj.appendTo("body").addClass('trace-show');
        },
        hide : function(){
            var _fn = this.fn;
            var _obj = this.obj;
            _obj.removeClass('trace-show');
            setTimeout(function(){
                _obj.remove();
            },1000)
        	
            if(_fn){
                _fn();
            }
        }
    };
    vera.trace = $.trace = function(text,fn,myTime){
        myTime = myTime || 3000;
        var trace = new Trace( text,fn );
        trace.show();
        var timeout = setTimeout( function(){
            trace.hide();
            clearTimeout(timeout);
        },myTime );
    }
})(Zepto,vera)
;(function(vera){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    vera.validate = new Validate();

    function Validate(){
        
    }
    //银行卡
    Validate.prototype.bankcardNo = function (val){
        var reg = /^[1-9]\d{15}\d{0,3}\D{0}$/; //16-19
        var reg = /^[1-9]\d{13}\d{0,5}\D{0}$/; //14-19

        if(val.length === 0){
            return {
                result:false,
                msg:'请输入卡号'
            };
        }
        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入正确的卡号(14-19位)'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    
	//用户名
	Validate.prototype.fullname = function (val){
    	var reg = /^[\u4e00-\u9fa5•，]+$|^[\u4e00-\u9fa5.,]+$/;
        
        if(val.length === 0){
            return {
            	result:false,
            	msg:'请输入姓名！'
            };
        }
        if(!reg.test(val)){
            return {
            	result:false,
            	msg:'请输入格式正确的中文姓名！'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//身份证 
	Validate.prototype.iDCard = function (idCard) {
        
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        if (!regIdCard.test(idCard)) {
            return {
            	result:false,
            	msg:'请输入正确的身份证号！'
            };
        }

        if (idCard.length == 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return {
		            	result:true,
		            	msg:''
		            };
                } else {
                    return {
	            	result:false,
	            	msg:'请输入正确的身份证号！'
	            };
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return {
		            	result:true,
		            	msg:''
		            };
                } else {
                    return {
		            	result:false,
		            	msg:'请输入正确的身份证号！'
		            };
                }
            }
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//cvv2
	Validate.prototype.cvv2 = function (val){
        var reg = /^\d{3}$/;

        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入卡背面末尾3位数'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//信用卡有效期    
	Validate.prototype.exptime = function (val){
        var reg  = /^\d{4}$/
        if(!reg.test(val)){
            return {
            	result:false,
            	msg:'请输入4数的有效期，格式如：08/25,输入0825'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//手机号码     
	Validate.prototype.mobileNo = function (val){
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!reg.test(val)){
            return {
	        	result:false,
	        	msg:'请输入11位的手机号码'
	        };
        }
        return {
        	result:true,
        	msg:''
        };
    }

    //验证码
    Validate.prototype.authCode = function (val){
        var reg = /^\d{6}$/;

        if(val.length <= 0){
            return {
	        	result:false,
	        	msg:'请输入短信验证码'
	        };
        }

        if(!reg.test(val)){
            return {
	        	result:false,
	        	msg:'请输入6位短信验证码'
	        };
        }
        return {
        	result:true,
        	msg:''
        };
    }
    //密码长度校验
    Validate.prototype.passport = function(val){
        if(val.length<6||val.length>20){
            return {
                result:false,
                msg:'请输入合法长度的密码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    Validate.prototype.email = function (val) {
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return reg.test(val);
    }
    
})(vera);


;(function($,vera){
	//get uid
	function getID(){
		var num = new Date();
		num = num.getTime();
		return "dialog_" + num;
	}

	function defaultData(data){
		if(data==""|| data== null || data==undefined){
			data = {};
		}
		var result = {id:getID(),
				title:"",
				body:"<h1>内容为空</h1>",
				type:"dialog"
				};
		result = $.extend(true, result, data);
		this.result = result;
	}

	defaultData.prototype.getDialogHTML = function(){
		var data = this.result;
		var type = "";
		if(data.type == "blue"){
			type = "dialog-blue";
		}
		var dialogTemplate = '<div class="dialog-overlay '+ type +'   " id= '+data.id+'  role="dialog">'+
							 '<div class="dialog-container">'+
								'<div class="dialog-table-row">'+
									'<div class="dialog-table-cell">'+
										'<div class="dialog-content">';
		if(data.title != "" && data.title != undefined){
			dialogTemplate += '<div class="dialog-header">'+
									'<div class="dialog-title">'+
										'<span class="title">'+
										data.title +
										'</span>'+
										'<a href="javascript:void(0)" class="close-btn" data-dialog data-action="hide" >'+
											'<i class="icon-cross "  ></i>'+
										'</a>'+
									'</div>'+
								'</div>';
		}							
		dialogTemplate +='<div class="dialog-body">'+
						  data.body +
						'</div>';
		if(data.footer){
			var col50 = "col-50";
			if(data.footer.cancel==undefined||data.footer.ok==undefined){
				col50 = "";
			}
			dialogTemplate += '<div class="dialog-footer">';
			if(data.footer.cancel!=undefined && data.footer.ok!=undefined){
				dialogTemplate += '<a class="col ' + col50 + ' dialog-action action-left" data-dialog data-action="cancel">'+
										 data.footer.cancel + 
									'</a>';
				dialogTemplate += '<a class="col ' + col50 + ' dialog-action action-right" data-dialog data-action="ok">'+
										 data.footer.ok +
									'</a>';
			}
			else if(data.footer.ok!=undefined){
				dialogTemplate += '<a class="col ' + col50 + ' dialog-action" data-dialog data-action="ok">'+
										 data.footer.ok +
									'</a>';
			}
			else if(data.footer.cancel!=undefined){
				dialogTemplate += '<a class="col ' + col50 + ' dialog-action" data-dialog data-action="ok">'+
										 data.footer.cancel +
									'</a>';
			}
			dialogTemplate += 	'</div>';
		}
		dialogTemplate += '</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'</div>'+
		'</div>';
		$(dialogTemplate).appendTo("body");	
		this.bindDialogEvent();
	}

	defaultData.prototype.bindDialogEvent = function(){
		var data = this.result;
		var $obj = $("#" + data.id);
		if(data.event){
			if(data.event.show){
				$obj.on("dialog:show", function(){
					data.event.show();
				});
			}
			if(data.event.hide){
				$obj.on("dialog:hide", function(){
					data.event.hide();
				});
			}
			if(data.event.ok){
				$obj.on("dialog:ok", function(){
					data.event.ok();
				});
			}
			if(data.event.cancel){
				$obj.on("dialog:cancel", function(){
					data.event.cancel();
				});
			}
		}
	}

	vera.Dialog = function(data){
       var obj =  new defaultData(data);
       obj.getDialogHTML();
       return $("#" + obj.result.id);
    };

	//show hide
	$.fn.dialog = function(option, callback){
		$this = this;
		$container = $this.find(".dialog-container");
		if(option==='show'){
			$this.show();
			$container.addClass("dialog-show");
			if(callback){
				callback();
			}
			// trigger the show event
			$this.trigger('dialog:show');
			$('body').on("touchmove.dialog",function(e){ 
				if($(e.target).closest(".dialog-body").length&& ($(e.target).closest(".dialog-body").height()>=300)){
					return;  
				}
				else{
					 e.preventDefault();  
					}
		         return;
		    }); 
		}
		else if(option==='hide'||option==='cancel'||option==='ok'){
			$container.removeClass("dialog-show");
			var t = setTimeout(function(){
				$this.hide();
				clearTimeout(t);
			},300)
			
			if(callback){
				callback();
			}
			//trigger the hide event
			$this.trigger("dialog:" + option);
			if(option!='hide'){
				$this.trigger("dialog:hide");
			}
			$('body').off("touchmove.dialog"); 
		}
	};

	//dialog dom ctrl
	$('body').on('tap','[data-dialog]',function(e){
		if($(this).hasClass("disabled")){
			return;
		}
		var modalId = $(this).data('dialog'),
			action = $(this).data('action');
		if (modalId==''){
			modalId = "#" + $(this).closest(".dialog-overlay").attr("id");
		}	
		if (action==''||modalId==''|| modalId == undefined) {
			return false;
		}
		if(action==='show'){
			$(modalId).dialog('show');
		}
		else if(action==='hide'||action==='cancel'||action==='ok'){
			$(modalId).dialog(action);
		}
		else{
			console.log("dialog属性值错误");
		}
	});

	$('body').on('touchstart','.dialog-action',function(e){
		$(e.target).addClass('touching')
	});

	$('body').on('touchend','.dialog-action',function(e){
		$(e.target).removeClass('touching')
	});
})(Zepto,vera);
;(function( $ , vera ) {
	var swticherTemplate = {
            "defaultUi"       :   '<div class="onoffswitch" {{id}}>'
									  +'<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" {{status}}>'
									  +'<label class="onoffswitch-label" for="myonoffswitch">'
									      +'<span class="onoffswitch-inner"></span>'
									      +'<span class="onoffswitch-switch"></span>'
									  +'</label>'
								  +'</div>'
        };

    function getRandomId(){
    	var timeStamp = new Date().getTime();
    	return 'switcher_' + timeStamp;
    }

    function Switcher( opt ){
		if( opt == "" || opt == null || opt == undefined ){
			opt = {};
		}
		var defaults  = { id : getRandomId() , status : '' , parent : 'body' };
		this.opt      = $.extend( true , defaults ,  opt );
		this.template = swticherTemplate.defaultUi;
	}

    Switcher.fn = Switcher.prototype = {
    	'constructor' : Switcher,
    	'init' : function(){
            this.template = this.template.replace( '{{id}}' , 'id="' + this.opt.id + '"' )
            							 .replace( '{{status}}' , this.opt.status=='on' ? 'checked' : '' );
            this.self = $( this.template );
			$( this.opt.parent).append( this.self );
            return this;
    	},
    	'on' : function(){
            if( !this.self ){
                this.init();
            }
            this.self.find('input[type=checkbox]').prop( 'checked' , true );
            this.self.trigger( 'switcher:on' );
    	},
    	'off' : function(){
            if( !this.self ){
                this.init();
            }
            this.self.find('input[type=checkbox]').prop( 'checked' , false );
            this.self.trigger( 'switcher:off' );
    	},
    	'switcher' : function( opt , callback ){
			if( opt != "on" && opt != "off" ){
				return;
			}

			if( opt == "on" ){
				this.on();
			}
			if( opt == "off" ){
				this.off();
			}
			if(callback){
				callback();
			}
    	},
    	'bindSwitcherEvts' : function(){
    		if( this.opt.events ){
    			if( this.opt.events.on ){
    				this.self.on( 'switcher:on' , function(){
    					this.opt.events.on();
    				}.bind(this));
    			}
    			
    			if(this.opt.events.off){
					this.self.on("switcher:off", function(){
						this.opt.events.off();
					}.bind(this));
				}
    		}
    	}
    };

	vera.Switcher = function( data ){
		var switcher = new Switcher( data );
		switcher.init();
		switcher.bindSwitcherEvts();
		return switcher;
	}; 

	$.fn.switcher = function( opt , callback ){
		var $this = this;
		if( opt != "on" && opt != "off" ){
			console.log("switcher operation error");
			return;
		}

		if( opt == "on" ){
			$this.find('input[type=checkbox]').prop( 'checked' , true );
			$this.trigger( 'switcher:on' );
		}
		if( opt == "off" ){
			$this.find('input[type=checkbox]').prop( 'checked' , false );
			$this.trigger( 'switcher:off' );
		}
		if(callback){
			callback();
		}
	}

	$('body').on( 'tap' , '.onoffswitch' , function(){
		var $status = $(this).find('input[type=checkbox]');
		if( $status.is( ':checked' ) ){
			$status.prop( 'checked' , false );
			$(this).trigger( 'switcher:off' ); 
		}else{
			$status.prop( 'checked' , true );
			$(this).trigger( 'switcher:on' );
		}
	});

})( Zepto , vera )