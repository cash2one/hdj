/* =========================================================
 * bootstrap-validation.js 
 * Original Idea: http:/www.newkou.org (Copyright 2012 Stefan Petre)
 * Updated by 不会飞的羊 (https://github.com/FateSheep/Validation-for-Bootstrap)
 * =========================================================
 *
 * Licensed under the  (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= 
 * 2013-4-12 ，由云海飞舞 （yunhaifeiwu修改，为了区别原作品，该组件更名为
 * bt-validate
 *
 * ========================================================= */
!function($) {
    var obj;
    var isSubmit = false;
    $.fn.validation = function(options) {
        return this.each(function() {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            obj=this;
            reg(obj);
            validationForm(obj);
        });
    };
    
    $.fn.validation.defaults = {
        validRules : [
            {name: 'required', validate: function(value) {return ($.trim(value) == '');}, defaultMsg: '请输入内容。'},
            {name: 'number', validate: function(value) {return (!/^[0-9]\d*$/.test(value));}, defaultMsg: '请输入数字。'},
            {name: 'mail', validate: function(value) {return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));}, defaultMsg: '请输入邮箱地址。'},
            {name: 'char', validate: function(value) {return (!/^[a-z\_\-A-Z]*$/.test(value));}, defaultMsg: '请输入英文字符。'},
            {name: 'chinese', validate: function(value) {return (!/^[\u4e00-\u9fff]$/.test(value));}, defaultMsg: '请输入汉字。'}
        ]
    };

    
    
    var formState = false, fieldState = false, wFocus = true, globalOptions = {};

    var validateField = function(field, valid) { // 验证字段
        var el = $(field), error = false, errorMsg = '',
        crule=(el.attr('btvd-el')==undefined)?null:el.attr('btvd-el').split(' '),
        msg = (el.attr('btvd-err')==undefined)?null:el.attr('btvd-err').split(' ');
        if(isSubmit) {
            if(crule){
                if(crule[0] == "errorValidateCode") {
                    error = true;
                    errorMsg = "验证码错误";
                }
                else {
                  if( (crule[0].substr(0,1) == "!") && eval(crule[0].substring(1)).test(el.val()) ) {
                    error = true;
                    errorMsg =msg;
                  }
                  if((crule[0].substr(0,1) !== "!") && !eval(crule[0]).test(el.val()) ) {
                    error = true;
                    errorMsg =msg;
                  }
                }            
            } else {
                var isRequired = false;
                for(var j=0;j<valid.length;j++) {
                    if(valid[j] == "required") {
                        isRequired = true;
                        break;
                    }
                }
                if(!isRequired && $.trim(el.val()) =="") {
                  ;
                } else {
                    for (i = 0; (i < valid.length) ; i++) {
                    var x = true, flag = valid[i];
                    if (flag.substr(0, 1) == '!') {
                        x = false;
                        flag = flag.substr(1, flag.length - 1);
                    }



                    var rules = globalOptions.validRules;
                    for (j = 0; j < rules.length; j++) {
                        var rule = rules[j];
                        if (flag == rule.name) {
                            if (rule.validate.call(field, $.trim(el.val()) ) == x) {
                                error = true;
                                errorMsg = (msg == null)?rule.defaultMsg:msg;
                                break;
                            }
                        }
                    }

                    if (error) {break;}
                  }
                }
            }
            
        }
        var controls = el.parent().find('a');
        var len=controls.length;
        
        if (error) {              
                //el.after('  <a  style=" visibility:hidden;" data-placement="bottom"  data-content="'+errorMsg+ '"  data-toggle="popover" href="#" >aa</a> ');
                var d = dialog({
                    content:errorMsg,
                    quickClose:true
                });
                d.show(el[0]);
                setTimeout(function () {
				    d.close().remove();
				}, 2000);;
            // $(controls[0]).attr("data-content",errorMsg);
             //el.next().popover("show");  
             //var pop=el.parent().find(".popover"),pos=pop.offset();
            // pos.top=pos.top-el.next().height();
             //pop.offset(pos);             
             
             //if ( cls  ) pop.addClass("btvdclass");
          
        } 
        return !error;
    };

    var reg=function(obj){
        $('input, textarea').each(function() {
            var el = $(this), valid = (el.attr('btvd-type')==undefined)?null:el.attr('btvd-type').split(' ');
            valid1 = (el.attr('btvd-el')==undefined)?null:el.attr('btvd-el').split(' ');
            if (valid != null && valid.length > 0   || valid1 != null && valid1.length > 0 ) {                       

                el.blur(function() { // 失去焦点时
                    validateField(this, valid);
                });
            }
        });
    }

    var validationForm = function(obj) { // 表单验证方法
        $(obj).submit(function() { // 提交时验证
            if (formState) { // 重复提交则返回
                return false;
            }
            if($(obj).attr('id') =='publishForm') {
               if($(obj).find('#url').val() == '' && $(obj).find('#fileUpload').val() == '') {
                sweetAlert("亲!活动url和文档必须上传一样", '亲,请选择一样上传以方便我们了解您需要发布的活动', "error");
                return false;
               }
            }
            isSubmit = true;
            formState = true;
            var validationError = false;
            $('input, textarea', this).each(function () {
                var el = $(this), valid = (el.attr('btvd-type')==undefined)?null:el.attr('btvd-type').split(' ');
                if (valid != null && valid.length > 0) {
                    if (!validateField(this, valid)) {
                        if (wFocus == false) {
                            scrollTo(0, el[0].offsetTop - 50);
                            wFocus = true;
                        }

                        validationError = true;
                    }
                }
            });

           
            fieldState = true;

            if (validationError) {
                formState = false; 
                return false;
            }

            return true;
        });


    };

}(window.jQuery);