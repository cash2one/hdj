//发送验证码
$("#captcha").on('blur', function () {
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0];
    var captcha = $("#captcha").val();
    $.ajax({
        url: "/verify_captcha/",
        dataType: "json",
        type: "post",
        async: false,
        data: {
            csrfmiddlewaretoken: csrf.value,
            captcha: captcha
        },
        success: function (data) {
            if (data.flag == 'false') {
                $("#captcha").attr({"data-captchaflag":false})
                $("#cap_img").click()
            }else{
                $("#captcha").attr({"data-captchaflag":true})
            }
        }
    });
})
//$("#captcha").blur(function () {
//    var captcha=$.trim($("#captcha").val());
//    var phone=$.trim($("#mobilphone").val());
//    var url="/verify_tel_captcha/";
//    $.post(url,{mobilphone:phone,captcha:captcha}, function (data) {
//        var flag=jQuery.parseJSON(data).flag;
//        if(flag==true){
//            $('#captcha').attr('data-captcha',true)
//        }else{
//            $("#captcha").css({border:"1px solid #ec7063"});
//            $('#captcha').attr('data-captcha',false)
//        }
//    })
//});

//提交
$("#sendMessage").on("click", function () {
    var name = $.trim($("#name").val());//姓名
    var mobilphone = $.trim($("#mobilphone").val());//手机号码
    var iphone = /^1[3-8]+\d{9}$/;
    var industry = $("#industry").val();//所属行业
    var resume = $("#textarea").val();//阅历
    var imgView =$("#file1").val();//图片
    var img = $("#imgView").attr("src");
    var captcha =$('#captcha').attr('data-captcha');//验证码
    if(name==0){
        swal("error","姓名不能为空哦！","error");
        $("#name").css({border:"1px solid #ec7063"});
        return false
    }
    else if(mobilphone==0){
        swal("error","手机号码不能为空哦！","error");
        $("#mobilphone").css({border:"1px solid #ec7063"});
        return false
    }
    else if(!iphone.test(mobilphone)){
        swal("error","手机号码有误哦！","error");
        $("#mobilphone").css({border:"1px solid #ec7063"});
        return false
    }
    else if(captcha=='false'){
        swal("error","验证码错误！","error");
        $("#captcha").css({border:"1px solid #ec7063"});
        return false
    }
    else if(img==''){
        swal("error","您还没有上传头像哦！","error");
        return false
    }
    else{
        $.ajaxFileUpload({
            url:"/guest/apply_guest_send/",
            secureuri: false, //一般设置为false
            dataType:"json",
            type:"post",
            fileElementId: 'file1',
            data:{
                name:name,
                mobilphone:mobilphone,
                industry:industry,//所属行业
                resume:resume,//阅历介绍
                captcha:captcha
            },
            success: function(data){
                $("#img1").attr("src", data);
                if(data.success==1){
                    $(".content .left input,.content .meeasge_form textarea").val("");
                    $("#imgView").attr("src",'');
                    $(".TestGetCode").text("获取验证码");
                    $(".TestGetCode").removeAttr("disabled");
                    swal("success","您的信息已提交成功，稍后我们将与您联系。","success")
                }
                else{
                    swal("error","您的信息已提交,不可重复提交","success")
                }
            },
            error:function(){
                swal("error","您的信息提交失败！请稍后再试","error")
            }
        })
    }
});
$("#name").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#mobilphone").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});
$("#captcha").focus(function(){
    $(this).css({border:"1px solid #ddd"})
});


function PreviewImage(obj, imgPreviewId, divPreviewId) {
    var allowExtention = ".jpg,.bmp,.gif,.png"; //,允许上传文件的后缀名
    var extention = obj.value.substring(obj.value.lastIndexOf(".") + 1).toLowerCase();
    var browserVersion = window.navigator.userAgent.toUpperCase();
    if (allowExtention.indexOf(extention) > -1) {
        if (browserVersion.indexOf("MSIE") > -1) {
            if (browserVersion.indexOf("MSIE 6.0") > -1) {//ie6
                document.getElementById(imgPreviewId).setAttribute("src", obj.value);
            } else {//ie[7-8]、ie9
                obj.select();
                var newPreview = document.getElementById(divPreviewId + "New");
                if (newPreview == null) {
                    newPreview = document.createElement("div");
                    newPreview.setAttribute("id", divPreviewId + "New");
                    newPreview.style.width = 160;
                    newPreview.style.height = 170;
                    newPreview.style.border = "solid 1px #d2e2e2";
                }
                newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                var tempDivPreview = document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                tempDivPreview.style.display = "none";
            }
        } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
            var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if (firefoxVersion < 7) {//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src", obj.files[0].getAsDataURL());
            } else {//firefox7.0+
                document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(obj.files[0]));
            }
        } else if (obj.files) {
            //兼容chrome、火狐等，HTML5获取路径
            if (typeof FileReader !== "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                };
                reader.readAsDataURL(obj.files[0]);
            } else if (browserVersion.indexOf("SAFARI") > -1) {
                alert("暂时不支持Safari浏览器!");
            }
        } else {
            document.getElementById(divPreviewId).setAttribute("src", obj.value);
        }
    } else {
        alert("仅支持" + allowSuffix + "为后缀名的文件!");
        obj.value = ""; //清空选中文件
        if (browserVersion.indexOf("MSIE") > -1) {
            obj.select();
            document.selection.clear();
        }
        obj.outerHTML = obj.outerHTML;
    }
}
