$(function ($) {
    (function (window) {
        Array.prototype.contain = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return true;
                }
            }
            return false;
        }
        window.newParaIdIndex = 1;
        $(".tagsinput").tagsInput();
        $(parent.document.getElementById("pageLoader")).hide();
        $(".form_datetime").datetimepicker();
        window.selectImgEvent = function () {
            var event = window.event || arguments.callee.caller.arguments[0];
            //var theEvent = window.event || arguments.callee.caller.arguments[0];
            var dataImgId = $(event.target).attr("data-img-id");
            if ($("#selectedMainImg").attr("value").length > 0) {
                var selectedImgIdArray = $("#selectedMainImg").attr("value").split(",");
                var flag = true;
                for (var i = 0; i < selectedImgIdArray.length; i++) {
                    if (selectedImgIdArray[i] == dataImgId) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    $("#selectedMainImg").attr("value", $("#selectedMainImg").attr("value") + "," + dataImgId);
                    $.get('/newevent/save_img/?img_id=' + dataImgId + '&order=1');
                    $("#carousel-example-generic").append("<div class='carousel-inner' data-img-id='"+dataImgId+"' role='listbox'><div class='item active'><img src='"+$(event.target).attr("data-img-url")+"' data-img-id='"+dataImgId+"'><span class='icon-remove removePic'></span><span>"+dataImgId+"</span></div></div>")
                } else {
                    var tmpArray = [];
                    for (var i = 0, j = 0; i < selectedImgIdArray.length; i++) {
                        if (selectedImgIdArray[i] != dataImgId) {
                            tmpArray[j++] = selectedImgIdArray[i];
                        }
                    }
                    $("#selectedMainImg").attr("value", tmpArray.join(","));
                    $("#carousel-example-generic").find(".carousel-inner[data-img-id="+dataImgId+"]").remove();
                    $.get('/newevent/save_img/?img_id=' + dataImgId + '&order=0');
                }
            } else {
                $("#selectedMainImg").attr("value", dataImgId);
            }

        };

        if ($("#eventStatus").val().length > 0) {
            var eventStatus = $("#eventStatus").val();
            if (eventStatus == 0) {
                $("#eventState").text('未处理');
            } else if (eventStatus == 1) {
                $("#eventState").text('已发布');
            } else if (eventStatus == 2) {
                $("#eventState").text('废弃');
            } else if (eventStatus == 3) {
                $("#eventState").text('待完善');
            } else if (eventStatus == 5) {
                $("#eventState").text('编辑中');
            } else if (eventStatus == 8) {
                $("#eventState").text('后备库');
            }
        }
        // $(".paraUl").on('click', function () {
        //     try {
        //         var event = window.event || arguments.callee.caller.arguments[0];
        //         if (!$(event.target).hasClass("sortTag") && !$(event.target).hasClass("editTag") && !$(event.target).hasClass('deleteTag') && !$(event.target).parents('li').hasClass('current')) {
        //             if ($(event.target).parents('li').find('.id').length > 0) {
        //                 $(".paraUl li").removeClass("current");
        //                 $(event.target).parents("li").addClass("current");
        //                 if ($(event.target).get(0).nodeName !== "LI") {
        //                     var paraId = $(event.target).parents("li").find(".id").text();
        //                 } else if ($(event.target).get(0).nodeName == "LI") {
        //                     var paraId = $(event.target).find(".id").text();
        //                 }
        //                 var nowParaStr = $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html();
        //                 var nowClass = $("#editEvent")[0].className;
        //                 if ($(".editEvent.editEvent_" + paraId).length > 0) {
        //                     var selectedParaStr = $(".editEvent_" + paraId).text();
        //                     $(".editEvent_" + paraId).text(nowParaStr).removeClass().addClass(nowClass);
        //                 } else {
        //                     var selectedParaStr = $(".editEvent_addNew" + paraId.substring(4)).text();
        //                     $(".editEvent_addNew" + paraId.substring(4)).text(nowParaStr).removeClass().addClass(nowClass);
        //                 }
        //                 if (paraId.indexOf('新增段落') != -1) {
        //                     $("#editEvent").text(selectedParaStr).removeClass().addClass('editEvent editEvent_addNew' + paraId.substring(4)).text(selectedParaStr);
        //                 } else {
        //                     $("#editEvent").text(selectedParaStr).removeClass().addClass('editEvent editEvent_' + paraId).text(selectedParaStr);
        //                 }
        //                 $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html(selectedParaStr);
        //             }
        //         }
        //         if ($(event.target).hasClass("sortTag")) {
        //             var currentLi = $(event.target).parents("li");
        //             var clone = currentLi.clone();
        //             if (currentLi.prev("li").length > 0) {
        //                 var prevLi = currentLi.prev("li");
        //                 currentLi.remove();
        //                 prevLi.before(clone);
        //             } else {
        //                 currentLi.remove();
        //                 $(".paraUl").append(clone);
        //             }
        //         }
        //         if ($(event.target).hasClass('deleteTag')) {
        //             var currentLi = $(event.target).parents('li');
        //             var currentId = currentLi.find(".id").text();
        //             if (currentId.indexOf('新增段落') != -1) {
        //                 var newIndex = currentId.substring(4);
        //                 $(".editEvent_addNew" + newIndex).remove();
        //                 $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html('');
        //             } else {
        //                 $(".editEvent_" + currentId).remove();
        //                 $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html('');
        //             }
        //             $(event.target).parents('li').remove();
        //             if ($(".paraUl li:first-child").length > 0) {
        //                 $(".paraUl li:first-child").addClass('current').siblings().removeClass("current");
        //                 var nowId = $(".paraUl li:first-child").find('.id').text();
        //                 if (nowId.indexOf('新增段落') != -1) {
        //                     var nowIndex = nowId.substring(4);
        //                     $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html($(".editEvent_addNew" + nowIndex).text());
        //                     $(".editEvent_addNew" + nowIndex).attr('id', 'editEvent');
        //                 } else {
        //                     $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html($(".editEvent_" + nowId).text());
        //                     $(".editEvent_" + nowId).attr('id', 'editEvent');
        //                 }
        //             }
        //         }
        //         if ($(event.target).hasClass("editTag") && !$(event.target).hasClass("visibleClass")) {
        //             $(event.target).parents("li").find("div").css("visibility", "hidden");
        //             var inputDom = $("<input type='text' value='" + $(event.target).parents("li").find(".title").text() + "' />").val($(event.target).parents("li").find(".title").text()).addClass("ct-search-input");
        //             $(event.target).parents("li").append(inputDom);
        //             $(event.target).addClass("visibleClass");
        //             /*inputDom.focus();
        //              inputDom.blur(function(){
        //              inputDom.parents('li').find('.editTag').click();
        //              });*/
        //         } else if ($(event.target).hasClass("editTag") && $(event.target).hasClass("visibleClass")) {
        //             var newValue = $(event.target).parents("li").find(".ct-search-input").val();
        //             if ($(event.target).parents("li").find(".title").length > 0) {
        //                 $(event.target).parents("li").find(".title").text(newValue).end().find("div").css("visibility", "visible").end().find(".ct-search-input").remove();
        //             } else {
        //                 if($(".paraUl li").eq($(".paraUl li").length-2).find('.id').text().indexOf("新增段落")!=-1){
        //                     var newParaIdIndex = parseInt(($(".paraUl li").eq($(".paraUl li").length-2).find('.id').text()).substring(4))+1;
        //                 }else{
        //                     newParaIdIndex=1;
        //                 }
        //                 var divDom = $(event.target).parents('li').find('div');
        //                 $("<span></span>").text(newValue).addClass('title').prependTo(divDom);
        //                 $("<span></span>").text('----').prependTo(divDom);
        //                 $("<span></span>").text('新增段落' + newParaIdIndex).addClass('id').prependTo(divDom);
        //                 divDom.appendTo($(event.target).parents('li'));
        //                 $(event.target).parents('li').find('.ct-search-input').remove();
        //                 var textareaDom = $("<textaret></textarea>");
        //                 if ($("#editEvent").length > 0) {
        //                     var nowClass = $("#editEvent")[0].className;
        //                 } else {
        //                     var nowClass = '';
        //                 }
        //                 if (nowClass != '') {
        //                     if (nowClass != 'editEvent_') {
        //                         var nowParaStr = $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html();
        //                         textareaDom.text(nowParaStr).addClass(nowClass).addClass('editEvent').appendTo($("#textArea"));
        //                         $($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html('');
        //                         $("#editEvent").removeClass().addClass('editEvent').addClass('editEvent_addNew' + newParaIdIndex).html('');
        //                     } else {
        //                         $("#editEvent").removeClass().addClass('editEvent').addClass('editEvent_addNew' + newParaIdIndex).text($($("#cke_editEvent").find("iframe").get(0).contentWindow.document.body).html());
        //                     }
        //                 } else {
        //                     $("<textarea></textarea>").attr('id', 'eventEdit').addClass('editEvent editEvent_addNew' + newParaIdIndex);
        //                 }
        //                 newParaIdIndex++

        //             }
        //             $(event.target).removeClass("visibleClass");
        //         }
        //     }

        //     catch (e) {
        //         alert(e.name  + " : " +  e.message);
        //     }
        // });




        // $("#addnewtodo").click(function () {
        //     $(".paraUl li").removeClass("current");
        //     $("<li></li>").addClass("current").append($("<input type='text' />").css("position", "relative").addClass("ct-search-input")).append($("<div></div>").append($("<span class='icon-trash  deleteTag'></span>")).append($("<span class='icon-double-angle-up sortTag'></span>")).append($("<span class='icon-edit editTag'><span>").addClass("visibleClass"))).appendTo($(".paraUl"));
        //     return false;
        // });
        $( 'textarea.ckeditor' ).ckeditor();
        $('.paraUl').sortable();
        $('.paraUl').on('click','.icon-remove',function(){
            if ( $(".paraUl li").length==1) {
                 $("#"+$(this).prevAll("a").attr("aria-controls")).hide();
            $(this).parents("li").remove();
                $("#editEvent_add").addClass('active')
            }else{
                if ($(this).parents("li").hasClass('active')) {
                if ($(this).parents("ul li").index()==0) {
                    $(this).parents("ul").find('li').eq(1).addClass('active');
                    $("#"+$(this).parents("ul").find('li').eq(1).find('a').attr("aria-controls")).addClass('active');
                }else{
                    $(this).parents("ul").find('li').eq(0).addClass('active');
                    $("#"+$(this).parents("ul").find('li').eq(0).find('a').attr("aria-controls")).addClass('active');
                }
            }
            $("#"+$(this).prevAll("a").attr("aria-controls")).hide();
            $(this).parents("li").remove();
            }
        })
        $('.paraUl').on('click','.editTag',function(){
            $(this).prevAll("a").hide();
            $(this).parent().find("span").hide();
            $(this).parents("li").append("<input type='text' value='"+$(this).prevAll("a").text()+"' /><span class='glyphicon glyphicon-ok editTag_ok'></span>");
        })
        $('.paraUl').on('click','.editTag_ok',function(){
            if($.trim($(this).parents("li").find('input').val()).length!=0){
                 $( 'textarea.ckeditor' ).ckeditor();
            $(this).prevAll("a").text($(this).parents("li").find('input').val()).show();
            $(this).parents("li").find('input').remove();
            $(this).parent().find("span").show();
             if($(this).parents("li").find('a[aria-controls*="editEvent_newadd"]')) {
                $(".paraUl li[class*='active']").removeClass('active');
                $(this).parents("li").addClass('active')
                 // $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="'+$(this).parents("li").find("a").attr("aria-controls")+'"><textarea class="ckeditor"></textarea></div>');
                // $( 'textarea.ckeditor' ).ckeditor();
                $(".tab-pane[class*='active']").removeClass('active');
                $("#"+$(this).parents("li").find("a").attr("aria-controls")).addClass(' active');
                $('.paraUl').sortable();
            }
            $(this).remove();
        }else{
            $("#"+$(this).parents("li").find("a").attr("aria-controls")).remove();
            $(this).parents("li").remove();
        }
        })
        $(".editAdd").on('click', function(event) {
            if ($(".paraUl li").length!=0) {
                $(".paraUl").append('<li role="presentation" class="active"><a href="#editEvent_newadd'+$(".tab-pane").length+'" aria-controls="editEvent_newadd'+$(".tab-pane").length+'" role="tab" data-toggle="tab" style="display:none;"></a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag" style="display:none;"></span><input type="text" /><span class="glyphicon glyphicon-ok editTag_ok"></span></li>');
                  $(".tab-content").append('<div role="tabpanel" class="tab-pane" id="editEvent_newadd'+$(".tab-pane").length+'"><textarea class="ckeditor"></textarea></div>');
            }else{
                $(".paraUl").append('<li role="presentation" class="active"><a href="#editEvent_add" aria-controls="editEvent_add" role="tab" data-toggle="tab" style="display:none;"></a><span class="icon-remove" style="display:none;"></span><span class="icon-edit editTag" style="display:none;"></span><input type="text" /><span class="glyphicon glyphicon-ok editTag_ok"></span></li>');
            }
        });
        function copyToClipboard() {
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var event = window.event || arguments.callee.caller.arguments[0];
            var client = new ZeroClipboard(theEvent.target);
            client.on('ready', function (event) {
                // console.log( 'movie is loaded' );

                client.on('copy', function (theEvent) {
                    theEvent.clipboardData.setData('text/plain', $(theEvent.target).data('data-clipboard-text'));
                });
                client.on('aftercopy', function (theEvent) {
                    $("#formArea").find('.dz-image-preview').css('border', 'none');
                    $(theEvent.target).parents('div.dz-image-preview').css('border', '1px solid #d9534f');
                })
            });

            client.on('error', function (event) {
                // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
                ZeroClipboard.destroy();
            });
        }

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone("div#formArea", {
            url: "/newevent/save_img/", paramName: "img", addRemoveLinks: true, success: function (data) {
                var responseObject = JSON.parse(data.xhr.responseText);
                if (responseObject.flag) {
                    $(data.previewElement).find(".dz-size").after($("<div></div>").html( "尺寸："+data.width+"*"+data.height).data("data-img-id", responseObject.id).addClass("dz-url").append($("<a></a>").data('data-clipboard-text', responseObject.url).addClass('icon-copy').addClass('clip_button').bind('click', copyToClipboard)));
                    $(data.previewElement).find(".dz-upload").css("backgroundImage", "none");
                    $(data.previewElement).find(".dz-details").append($("<input onclick='selectImgEvent(this)' type='checkbox'>").attr("data-img-url", responseObject.url).attr("data-img-id", responseObject.id).css({
                        position: "absolute",
                        right: "-3px",
                        bottom: "-16px"
                    }));
                } else {
                    $(data.previewElement).find(".dz-size").text('上传图片识别!请重试');
                }
            }
        });
        myDropzone.on('error', function (file) {
            var errorMsg = errorMessage;
        });
        if ($("#s_id_Type").length > 0) {
            $("#s_id_Type").change(clickSelectPrice);
            $("#s_id_Type").change();
        }
        if ($("#sendEmail").length > 0) {
            $('#sendEmail').click(function () {
                var eventName = $("#id_name").val();
                var emailContent = $("#remark").val();
                var content = "请问该活动的费用是多少，如何报名，有官方网站或相关资料吗？谢谢";
                if (eventName != '' && emailContent != '') {
                    $.post('/newevent/send_email/', {
                        'email': emailContent,
                        'content': content,
                        'subject': eventName
                    }, function (data) {
                        if (data.flag) {
                            alert('发送成功');
                        }
                    });
                }
            });
        }
        function clickSelectPrice() {
            var selectType = $(this).val();
            $(".priceModal").hide();
            if (selectType == 1 || selectType == 3 || selectType == 6) {
                $(".priceModal" + selectType).show();
                $(".priceModal6").show();
            }
            if (selectType == 2) {
                $(".priceModal6").show();
            }
        }

        function clickCat() {
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var selectedCatId = $(theEvent.target).attr("value");
            var selectedCatName = $(theEvent.target).html();
            if (!$('.tagsinput').tagExist(selectedCatName)) {
                $(".tagsinput").addTag(selectedCatName, selectedCatId);
                //$(theEvent.target).attr('data_value',selectedCatId);
                $("#selectedTags").attr("value", $("#selectedTags").attr('value') + selectedCatId + "|" + selectedCatName + ",");
            }
            return false;
        }

        function clickRemoveTag() {
            var theEvent = window.event || arguments.callee.caller.arguments[0];
            var deleteTagUrl = '/newevent/del_tag/?tag_id=' + $(theEvent.target).siblings('a').attr('value');
            var tmp = $(theEvent.target).parent('li');
            swal({
                title: "Are you sure?", text: "您确定删除该标签吗?",
                type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "是的,我要删除!",
                closeOnConfirm: false
            }, function () {
                $.get(deleteTagUrl, function (data) {
                    if (data.flag) {
                        swal("已删除!", "删除成功.", "success");
                        tmp.remove();
                    } else {
                        swal("失败", "标签删除失败!请重试", "error");
                    }
                });
            });
        }

        window.clickRemoveTag = clickRemoveTag;
        window.clickCat = clickCat;
        if ($("#districtPid-edit").length > 0) {
            $.get('/newevent/show_city_json/', {type: 'json'}, function (data) {
                var defaultCityId = $("#selectedCityId").val().split(",")[0];
                var flag = false;
                var optionParentHtml = "";
                var optionChildHtml = "";
                var attrHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var cityParentObj = data[i];
                    var cityChildObj = cityParentObj.child;
                    for (var j = 0; j < cityChildObj.length; j++) {
                        var childObj = cityChildObj[j];
                        attrHtml += childObj.id + "|" + childObj.district_name + ",";
                        if (childObj.id == defaultCityId) {
                            flag = true;
                        }
                    }
                    attrHtml = attrHtml.substring(0, attrHtml.length - 1);
                    if (flag) {
                        optionParentHtml += "<option selected='selected' data-city=" + attrHtml + " value='" + cityParentObj.district_id + "'>" + cityParentObj.district_name + "</option>";
                    } else {
                        optionParentHtml += "<option data-city=" + attrHtml + " value='" + cityParentObj.district_id + "'>" + cityParentObj.district_name + "</option>";
                    }
                    attrHtml = "";
                    flag = false;
                }
                $("#districtPid-edit").html(optionParentHtml);
                $("#districtPid-edit").change();
            });
            $("#districtPid-edit").change(function () {
                var defaultCityId = $("#selectedCityId").val().split(",")[0];
                var selectedCityArray = $(this).find("option:selected").attr("data-city").split(",");
                var selectChildHtml = "";
                for (var i = 0; i < selectedCityArray.length; i++) {
                    var cityChild = selectedCityArray[i];
                    if (cityChild.split('|')[0] == defaultCityId) {
                        selectChildHtml += '<option selected="selected" value="' + cityChild.split("|")[0] + '">' + cityChild.split("|")[1] + "</option>";
                    } else {
                        selectChildHtml += '<option value="' + cityChild.split("|")[0] + '">' + cityChild.split("|")[1] + "</option>";
                    }
                }
                $("#districtId-edit").html(selectChildHtml);
            })
        }


        if ($(".tagsinput-add-container").length > 0) {
            $(".tagsinput-add-container input").on('blur', function () {
                var tagName = $.trim($(".tagsinput-add-container").parent().find("span:last").text());
                if ($("#lastEditTag").val() != tagName) {
                    $("#lastEditTag").attr('value', tagName);
                    var parentCatId = $("#eventCat").find('option:selected').val();

                    $.post('/newevent/save_tag/', {tag: tagName, cat: parentCatId}, function (data) {
                        var selectedTagsStr = $("#selectedTags").val();
                        if (data.flag) {
                            tag_id = ''
                            for (var i = 0; i < data.tag.length; i++) {
                                var tagNew = data.tag[i];

                                if (tagNew.flag) {
                                    selectedTagsStr += tagNew.id + "|" + tagNew.name + ',';
                                    if (tag_id != '')tag_id += ',';
                                    tag_id += tagNew.id;
                                }
                            }
                            $(".tagsinput-add-container").parent().find("span:last").attr('data_value', tag_id);
                            $("#selectedTags").attr('value', selectedTagsStr);

                        }
                    })
                }
            });
        }

        function searchAddress() {
            window.deleteAddress = function (event) {
                if ($(event).parent("td").length > 0) {
                    var addressId = $(event).attr('data-addr-id');
                } else {
                    var addressId = $(event.target).attr('data-addr-id');
                }
                var readyAdds = $("#selectedVenueId").attr("value");
                readyAdds = myReplaceStr(addressId, readyAdds, "");
                $("#selectedVenueId").attr("value", readyAdds).val(readyAdds);
                if ($(event).parents("tr").length > 0) {
                    $(event).parents("tr").remove();
                } else {
                    $(event.target).parents("tr").remove();
                }
                $("#address_table_body").find('tr[data-addr-id=' + addressId + ']').removeClass('selected');
                if ($("#source_address_table_body").find('tr').length == 0) {
                    $("#selectedAddress").hide();
                }
            };
            window.selectAddress = function (event) {
                var selectedAddressId = $(event).attr('data-addr-id');
                var selectedAddressTitle = $(event).find("td").eq(0).text();
                var selectedAddressName = $(event).find("td").eq(1).text();
                var addressCityName = $(event).find('td').eq(2).text();
                var htmlTemp = "<tr data-addr-id='" + selectedAddressId + "''>" + "<td><span class='icon-remove'" + "data-addr-id='" + selectedAddressId + "'" + " onclick='deleteAddress(this)'></span>" + selectedAddressTitle + "</td>" + "<td>" + selectedAddressName + "</td>" + "<td>" + addressCityName + "</td></tr>";
                var alreadyId = $("#selectedVenueId").attr("value");
                if (alreadyId.indexOf(selectedAddressId) == -1) {
                    $("#source_address_table_body").append($(htmlTemp));
                    if (alreadyId == '') {
                        $("#selectedVenueId").attr('value', selectedAddressId).val(selectedAddressId);
                    } else {
                        $("#selectedVenueId").attr('value', alreadyId + "," + selectedAddressId).val(alreadyId + "," + selectedAddressId);
                    }
                } else {
                    $("#source_address_table_body").find('tr[data-addr-id=' + selectedAddressId + ']').remove();
                    if ($("#source_address_table_body").find('tr').length == 0) {
                        $("#selectedAddress").hide();
                    }
                    var readyAdds = $("#selectedVenueId").attr("value");
                    readyAdds = myReplaceStr(selectedAddressId, readyAdds, '');
                    $("#selectedVenueId").attr("value", readyAdds).val(readyAdds);

                }
                if ($(event).hasClass('selected')) {
                    $(event).removeClass('selected');
                } else {
                    $(event).addClass('selected');
                }
            };
            $('#addressClose').click(function () {
                $('#searcAddressResult').hide();
                if ($('#selectedAddress tbody tr').length > 0) {
                    $('#selectedAddress').show();
                    $("#selectedAddress").css({'opacity': 1});
                }
                $('#addressOpen').show();
            });
            $('#addressOpen').click(function () {
                if ($("#address_table_body tr").length > 0) {
                    $("#searcAddressResult").show();
                    $("#selectedAddress").css({'opacity': 0});
                }
            });
            $("#search-address").change(function () {
                var address = $(this).val();
                var urlPath = "/newevent/get_json_addr_str/" + address + "/?_=1411610829905";
                $.get(urlPath, function (data) {
                    var alreadyAddressIdArray = $("#selectedVenueId").val().split(',');
                    var flag = false;
                    if (alreadyAddressIdArray.length > 0) {
                        flag = true;
                    }
                    var tbodyHtml = "";
                    for (var i = 0; i < data.length; i++) {
                        var addressObject = data[i];
                        if (flag) {
                            if (alreadyAddressIdArray.contain(data[i].id)) {
                                tbodyHtml += "<tr class='selected' onclick='selectAddress(this)'" + "data-addr-id='" + data[i].id + "'>"
                            } else {
                                tbodyHtml += "<tr onclick='selectAddress(this)'" + "data-addr-id='" + data[i].id + "'>"
                            }
                        }
                        tbodyHtml += "<td>" + addressObject.title + "</td>" + "<td>" + addressObject.address + "</td>" + "<td>" + addressObject.city + "</td></tr>";
                    }
                    $("#address_table_body").html(tbodyHtml);
                    $('#searcAddressResult').show();
                    $("#selectedAddress").css({'opacity': 0});
                });
            })
            $(".deleteAddress").on('click', deleteAddress);
        }

        function myReplaceStr(replaceValue, replaceStr, newValue) {
            var replaceStrAry = replaceStr.split(",");
            var clone = [];
            for (var i = 0, j = 0; i < replaceStrAry.length; i++) {
                if (replaceStrAry[i] == replaceValue) {
                    if (newValue != "") {
                        clone[j++] = newValue;
                    }
                } else {
                    if (replaceStrAry[i] != '') {
                        clone[j++] = replaceStrAry[i];
                    }
                }
            }
            return clone.join(",");
        }

        function iscontain(checkValue, containArray) {
            if (containArray.length == 0) {
                return false;
            }
            for (var i = 0; i < containArray.length; i++) {
                if (containArray[i] === checkValue) {
                    return true;
                }
            }
            return false;
        }

        function searchSeo() {
            window.deleteSeo = function (event) {
                $('#selected_seo_table_body').find('tr').remove();
                $('#selectedSeoId').attr('value', '');
                $('#addSeoBtn').text('新建seo');
            };
            window.selectSeo = function (event) {
                var selectedSeoId = $(event).attr("data-id");
                var selectedSeoName = $(event).find('td').eq(0).text();
                var selecteTitle = $(event).find("td").eq(1).text();
                var selecteDescription = $(event).find("td").eq(2).text();
                var selecteKeywords = $(event).find("td").eq(3).text();
                $("#selectedSeoId").attr("value", selectedSeoId).val(selectedSeoId);
                var seoTr = "<tr dataSeoId=\"" + selectedSeoId + "\"><td><span class='icon-remove' onclick='deleteSeo(this)'></span>" + selectedSeoName + "</td>" + "<td>" + selecteTitle + "</td>" + "<td>" + selecteDescription + "</td><td>" + selecteKeywords + "</td></tr>";
                $("#selected_seo_table_body").html('').append($(seoTr));
                if ($(event).hasClass('selected')) {
                    $(event).removeClass('selected');
                    $("#selected_seo_table_body").html('');
                    $("#selectedSeoId").attr("value", '').val('');
                    $('#addSeoBtn').text('新增seo');
                } else {
                    $(event).parent('tbody').find('tr').removeClass('selected');
                    $(event).addClass('selected');
                    $("#selectedSeoId").attr("value", selectedSeoId).val(selectedSeoId);
                    $('#addSeoBtn').text('修改seo');
                }
                $('#seoClose').click();
                $('#seoOpen').show();
            };
            $('#seoOpen').click(function () {
                if ($("#search_seo_table_body tr").length > 0) {
                    $("#searcSEOResult").show();
                    $("#selectedSeo").css({'opacity': 0});
                }
            });
            $('#seoClose').click(function () {
                $('#searcSEOResult').hide();
                if ($('#selectedSeo tbody tr').length > 0) {
                    $('#selectedSeo').show();
                    $("#selectedSeo").css({'opacity': 1});
                }
                $('#seoOpen').show();
            });
            if ($("#search-seo").length > 0) {
                $("#search-seo").change(function () {
                    var seo = $(this).val();
                    var urlPath = "/newevent/find_seo_json/10/" + seo + "/";
                    $.get(urlPath, function (data) {
                        var tbodyHtml = "";
                        for (var i = 0; i < data.length; i++) {
                            var seoObject = data[i];
                            tbodyHtml += "<tr onclick='selectSeo(this)' data-id='" + seoObject.id + "'>";
                            tbodyHtml += "<td>" + seoObject.title + "</td>" + "<td>" + seoObject.keywords + "</td>" + "<td>" + seoObject.description + "</td><td>" + seoObject.keywords + "</td></tr>";
                        }
                        $("#search_seo_table_body").html(tbodyHtml);
                        $("#searcSEOResult ").show();
                        $('#addSeoBtn').text('修改seo');
                    });
                });
            }
            $(".deleteSeo").on('click', deleteSeo);
        }

        searchSeo();
        searchAddress();
        $("#saveSeo").click(function () {
            if ($("#modal_id_keywords").val() == '') {
                $('#modal_id_keywords').parents('.form-group').addClass('has-error');
                $('#modal_id_keywords').parent('div').append('<span class="help-block">注意!表单提交时,Keywords不能为空</span>');
                return false;
            } else {
                var name = $('#modal_id_name').val();
                var title = $('#modal_id_title').val();
                var keywords = $('#modal_id_keywords').val();
                var description = $('#modal_id_description').val();
                $.post('/newevent/save_seo/', {
                    'name': name,
                    'title': title,
                    'keywords': keywords,
                    'description': description
                }, function (data) {
                    if (data.flag) {
                        $('#selectedSeoId').attr('value', data.id).val(data.id);
                        var seoTr = "<tr dataSeoId=\"" + data.id + "\"><td><span class='icon-remove' onclick='deleteSeo(this)'></span>" + data.name + "</td>" + "<td>" + data.title + "</td>" + "<td>" + data.description + "</td><td>" + data.keywords + "</td></tr>";
                        $('#selected_seo_table_body').html('').append($(seoTr));
                        $('#seoModal').modal('hide')
                        $('#selectedSeo').show();
                    }
                });
            }
            return false;
        });
        $('#seoModal').on('shown.bs.modal', function () {
            if ($('selectedSeoId').val() != '') {
                $('#modal_id_name').val($('#selected_seo_table_body').find('tr td').eq(0).text());
                $('#modal_id_title').val($('#selected_seo_table_body').find('tr td').eq(1).text());
                $('#modal_id_description').val($('#selected_seo_table_body').find('tr td').eq(2).text());
                $('#modal_id_keywords').val($('#selected_seo_table_body').find('tr td').eq(3).text());
            } else {
                $('#modal_id_name').val('');
                $('#modal_id_title').val('');
                $('#modal_id_description').val('');
                $('#modal_id_keywords').val('');
            }
        });






        if ($("#fromUl").length > 0) {
            var alreadyTypeIdArray = [];
            $("#fromUl li").each(function () {
                alreadyTypeIdArray[alreadyTypeIdArray.length] = $(this).find('.fromType').attr('data-type-id');
            });
            function fromUlClick() {
                var showFlag = {flag: false, currentId: ''};
                //showFlag.flag = false;
                //showFlag.currentId = '';
                $("#fromUl").click(function () {
                    var theEvent = window.event || arguments.callee.caller.arguments[0];
                    var relatedId = $(theEvent.target).parents('li').attr('data-id');
                    //if (theEvent.target.className == 'icon icon-remove') {
                    //    swal({
                    //        title: "Are you sure?",
                    //        text: "您确定删除该信息来源吗?",
                    //        type: "warning",
                    //        showCancelButton: true,
                    //        confirmButtonColor: "#DD6B55",
                    //        confirmButtonText: "是的,我要删除!",
                    //        closeOnConfirm: false
                    //    }, function () {
                    //        $("#fromUl").find('li[data-id=' + relatedId + ']').remove();
                    //        var selectedFromId = $("#from_id").attr('value');
                    //        selectedFromId = myReplaceStr(relatedId, selectedFromId, '');
                    //        $("#from_id").attr('value', selectedFromId);
                    //        swal("已删除!", "删除成功.", "success");
                    //    });
                    //}

                    //if (!showFlag.flag && theEvent.target.className == 'icon icon-edit') {
                    //    var theLi = $(theEvent.target).parents('li');
                    //    var url = theLi.find('a').attr('href');
                    //    /*var type_id = theLi.find('.fromType').attr('data-type-id');*/
                    //    var from_id = $(theEvent.target).parents('li').attr('data-id');
                    //    var remark = theLi.find('.right').text();
                    //    var class_id = theLi.find('.contactType').attr('data-type-id');
                    //    var theLiIndex = 0;
                    //    var fromUlLis = $("#fromUl").find('li');
                    //    for (theLiIndex; theLiIndex < fromUlLis.length; theLiIndex++) {
                    //        if (fromUlLis[theLiIndex] == theLi[0]) {
                    //            break;
                    //        }
                    //    }
                    //    var top = (1 + parseInt(theLiIndex)) * 73;
                    //    $('#editFromArea').find('.type_f_Class').find('option[value=' + class_id + ']').attr('selected', true);
                    //    $('#editFromArea').find('.Website').val(url);
                    //    $('#editFromArea').find('.remark').val(remark).attr('value', remark);
                    //    $('#editFromArea').find('.id').attr('value', from_id);
                    //    $('#editFromArea').css({'top': top}).slideDown();
                    //    showFlag.currentId = relatedId;
                    //    showFlag.flag = true;
                    //    return;
                    //}

                    //if (showFlag.flag && showFlag.currentId == relatedId && event.target.className == 'icon icon-edit') {
                    //    from_id = $("#editFromArea").find('.id').attr('value');
                    //    $.ajax({
                    //        type: 'post',
                    //        url: '/newevent/save_from/',
                    //        data: {
                    //            'id': from_id,
                    //            'f_class': $(theEvent.target).parents('li').find('.fromType').attr('data-type-id'),
                    //            'type': $('#editFromArea').find('.type_f_Class').find('option:selected').val(),
                    //            'Website': $('#editFromArea').find('.Website').val(),
                    //            'f_content': $('#editFromArea').find('.remark').val()
                    //        },
                    //        async: false,
                    //        success: function (data) {
                    //            if (data.flag) {
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('a').attr('href', data.Website);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('a').next('span').text(data.Website);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').text($('#editFromArea').find('.type_f_Class').find('option:selected').text());
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', data.type_id);
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').attr('data-id', data.id);
                    //                if (data.id !== from_id) {
                    //                    var tmpIdStr = $("#from_id").attr('value');
                    //                    tmpIdStr = myReplaceStr(from_id, tmpIdStr, data.id);
                    //                    $("#from_id").attr('value', tmpIdStr);
                    //                }
                    //                $("#fromUl").find('li[data-id=' + from_id + ']').find('.right').text(data.content);
                    //            }
                    //        }
                    //    });
                    //
                    //    $("#fromUl").find('li[data-id=' + from_id + ']').attr('updated', true);
                    //    $('#editFromArea').slideUp();
                    //    showFlag.currentId = '';
                    //    showFlag.flag = false;
                    //}

                    if (theEvent.target.className == 'icon icon-envelope-alt') {
                        var eventName = $("#id_name").val();
                        var from_id = $(theEvent.target).parents('li').attr('data-id');
                        var fromTypeId = $(theEvent.target).parents('li').find('.fromType').attr('data-type-id');
                        var contactTypeId = $(theEvent.target).parents('li').find('.contactType').attr('data-type-id');
                        if (contactTypeId == 1 || contactTypeId == 2) {
                            contactTypeId = 5;
                        }
                        var emailContent = $(theEvent.target).parents('li').find('.right').text();
                        var content = "请问该活动的费用是多少，如何报名，有官方网站或相关资料吗？谢谢";
                        var f_class = $(theEvent.target).parents('li').find('.fromType').text();
                        if (eventName != '' && emailContent != '') {
                            $.post('/newevent/send_email/', {
                                'email': emailContent,
                                'content': content,
                                'subject': eventName
                            }, function (data) {
                                if (data.flag) {
                                    swal("邮件已发送!", "发送成功", "success");
                                    //$.post('/newevent/save_from/', {
                                    //    'from_id': from_id,
                                    //    'type': contactTypeId,
                                    //    'f_class': fromTypeId
                                    //}, function (data) {
                                    //    if (data.flag) {
                                    //        $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                    //        $("#fromUl").find('li').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                    //
                                    //    }
                                    //});
                                    $("#fromUl").find('li[data-id=' + from_id + ']').find('.contactType').attr('data-type-id', 5).text('邮件已发送');
                                } else {
                                    swal("发送失败!", "请确认该条信息来源的备注中是否有合法的email地址", "error");
                                }
                            });
                        }
                    }
                });
            }

            fromUlClick();

            //添加信息
            $("#add-info").click(function () {
                var url = $("#Website").val();
                var remarktext = $("#remark").val();
                if (url == "" && remarktext == "") {
                    swal("请输入来源信息");
                    return false
                } else {
                    $("#fromUl").append("<li data-id=" + (-Math.round(Math.random() * 10000)) + ">" +
                    "<span class='left'>" +
                    "<a href='" + url + "' target='_blank' style='padding-right:10px;'><i class=' icon-globe'></i></a>" +
                    "<span class='website_url'>" + url + "</span>" +
                    "<span class='label label-info contactType'  data-type-id='1'>未联系</span>" +
                    "<span class='label label-info fromType' data-type-id='1'>主办方</span>"+
                    "<span class='right'>" + remarktext + "</span>" +
                    "<i class='icon icon-remove' id='info_remove'></i>" +
                    "<i class='icon icon-edit' id='info_edit'></i>" +
                    "<i class='icon icon-envelope-alt' id='email_edit'></i>" +
                    "<span class='glyphicon glyphicon-remove-circle' id='close_info' style='position: absolute;cursor: pointer;top:1px;font-size: 16px;right: 74px;display: none'></span>"+
                    "<span class='glyphicon glyphicon-ok-circle price_gly' id='open_info' style='position: absolute;cursor:pointer;font-size: 16px;top: 1px;right: 96px;cursor:pointer;display:none'></span>"+
                    "</span></li>");
                    $("#Website").val("");
                    $("#remark").val("");

                }
            });

            //修改信息来源

            function editinfo(){
                var theLi = $(this).parents('li');
                var url = theLi.find('a').attr('href');
                var remark = theLi.find('.right').text();
                $('#editFromArea').find('.Website').val(url);
                $('#editFromArea').find('.remark').val(remark).attr('value', remark);
                $('#editFromArea').css({'top': top}).slideDown();
                $('#editFromArea').data('id', theLi.data('id'));
            }
            $("#fromUl").on("click", ".icon-edit", editinfo);
            function closeinfo(){
                $(this).parent().slideUp();
            }
            $("#editFromArea").on("click", ".glyphicon-remove-circle", closeinfo);
            function success_info(){
                $(this).parent().slideUp();
                var theLi = $('#fromUl li[data-id=' + $('#editFromArea').data('id') + ']')
                theLi.find(".contactType").text($('#editFromArea').find('.type_f_Class').find('option:selected').text());
                theLi.find(".contactType").attr("data-type-id",$('#editFromArea').find('.type_f_Class').find('option:selected').val());
                theLi.find('a').attr('href', $('#editFromArea').find('.Website').val());
                theLi.find('a').next('span').text($('#editFromArea').find('.Website').val());
                theLi.find('.right').text($('#editFromArea').find('.remark').val());
            }
            $("#editFromArea").on("click", ".glyphicon-ok-circle",success_info);

            //删除信息

            function iconremove(){
                var del_item = $(this).parent().parent();
                swal({
                        title: "Are you sure?",
                        text: "您确定删除该信息来源吗?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "是的,我要删除!",
                        closeOnConfirm: false
                    }, function() {
                        del_item.remove();
                        swal("ok!", "已删除", "success");
                        if($(".del_info_id").val().length==0){
                            $(".del_info_id").val(del_item.attr("data-id"))
                        }else{
                            $(".del_info_id").val($(".del_info_id").val()+","+del_item.attr("data-id"));
                        }
                    }
                );

            }

            $("#fromUl").on("click", ".icon-remove", iconremove);



        }
        if ($("#id_f_Class").length > 0) {
            $("#fromArea .type").eq(0).show();
        }
        if ($('.removePic').length > 0) {
            $(".removePic").click(function () {
                var dataImgId = $(this).parent('div').find('img').attr('data-img-id');
                $(this).parent('div.item').remove();
                var alreadyImgId = $("#selectedMainImg").val();
                if ($("#carousel-example-generic").find(".item:first-child").length > 0) {
                    $("#carousel-example-generic").find(".item:first-child").addClass('active');
                }
                var tmpArray = [];
                selectedImgIdArray = $("#selectedMainImg").attr('value').split(',');
                for (var i = 0, j = 0; i < selectedImgIdArray.length; i++) {
                    if (selectedImgIdArray[i] != dataImgId) {
                        if ($(this).find('fromType').attr('data-type-id')) {
                            tmpArray[j++] = selectedImgIdArray[i];
                        }
                    }
                }
                $("#selectedMainImg").attr("value", tmpArray.join(","));
            });
        }
        $(".saveEvent").click(function () {

            if ($(this).hasClass('savePublish')) {
                $("#eventStatus").val(1);
            }
            if ($(this).hasClass('saveTuijian')) {
                $("#eventStatus").val(1);
                var order = 1 + parseInt($("#tujianStatus").val());
                $("#tujianStatus").val(order);
            }
            if ($(this).hasClass('saveContinue')) {
                $("#eventStatus").val(3);
            }
            if ($(this).hasClass('saveReserve')) {
                $("#eventStatus").val(8);
            }
            if ($(this).hasClass('saveDiscard')) {
                $("#eventStatus").val(2);
            }
            var tg_id = ''
            try {
                $("#selectedCatArea").find(".tag>span").each(function (index) {
                    if (tg_id != '')tg_id += ',';
                    if ($(this).attr("data_value")) {
                        tg_id += $(this).attr("data_value");
                    } else {
                        //alert($.trim($(this).text()));
                        tag = $('#selectedTags').val().split(",")
                        for (var i = 0; i < tag.length; i++) {
                            t = tag[i].split('|');
                            if (t[1] == $.trim($(this).text())) {
                                tg_id += t[0];
                                break;
                            }
                        }
                    }

                })
            } catch (e) {

                alert(e.name + " :  " + e.message);
            }
            $("#formTags").attr("value", str_ck(tg_id));
            if (!confirm($("#formTags").attr("value") + " 调试信息标准格式: 1,2,3 否则请按取消")) {
                return
            }

            if ($("#officalUrl").val() != '' && $("#remark").val() == '') {
                $("#remark").attr('value', 'wait for edit');
            }
            //if ($("#addImg").val() != '') {
            //    var addImgIdArray = $("#addImg").val().split(',');
            //    if ($("#selectedMainImg").attr('value') != '') {
            //        var selectedImgIdArray = $("#selectedMainImg").attr('value').split(',');
            //        var isAgainFlag = false;
            //        for (var i = 0; i < addImgIdArray.length; i++) {
            //            for (var j = 0; j < selectedImgIdArray.length; j++) {
            //                if (addImgIdArray[i] == selectedImgIdArray[j++]) {
            //                    isAgainFlag = true;
            //                    break;
            //                }
            //            }
            //            if (!isAgainFlag) {
            //                selectedImgIdArray[selectedImgIdArray.length] = addImgIdArray[i];
            //                isAgainFlag = false;
            //            }
            //        }
            //        $("#selectedMainImg").attr('value', selectedImgIdArray.join(','));
            //    } else {
            //        $("#selectedMainImg").attr('value', $("#addImg").val());
            //    }
            //}
            //$("#formTags").attr("value",selectedCatIdStr)

            // 价格json
            var priceArray=[];
            for(var i=0;i<$(".price_tbody tr").length;i++){
                var priceObj={};
                priceObj.price_id=$(".price_tbody tr").eq(i).attr("data-price-name");
                priceObj.price=$(".price_tbody tr").eq(i).find("td").eq(0).text();
                priceObj.sale=$(".price_tbody tr").eq(i).find("td").eq(2).text();
                priceObj.discount=$(".price_tbody tr").eq(i).find("td").eq(3).text();
                priceObj.begin_time="";
                priceObj.end_time=$(".price_tbody tr").eq(i).find("td").eq(1).text();
                priceObj.status=$(".price_tbody tr").eq(i).find("td").eq(5).attr("data-value");
                priceObj.content=$(".price_tbody tr").eq(i).find("td").eq(6).text();
                priceObj.original_price=$(".price_tbody tr").eq(i).find("td").eq(4).text();
                priceArray.push(JSON.stringify(priceObj))
            }
            $("#priceArray").val("["+priceArray+"]");

            //信息来源json
            var infoArray=[];
            for(var i=0;i<$("#fromUl li").length;i++){
                var infoobj={};
                infoobj.f_class=$("#fromUl li").eq(i).find('.fromType').data('type-id');
                infoobj.type=$("#fromUl li").eq(i).find('.contactType').data('type-id');
                infoobj.website=$("#fromUl li").eq(i).find('a').attr('href');
                infoobj.content=$("#fromUl li").eq(i).find('.right').text();
                infoobj.id=$("#fromUl li").eq(i).data('id');
                infoArray.push(JSON.stringify(infoobj))
            }
            $("#infoarray").val("["+infoArray+"]");

            //场馆地址json
            var addressArray=[];
            for(var i=0;i<$("#source_address_table_body tr").length;i++){
                var addressObj={};
                addressObj.id=$("#source_address_table_body tr").eq(i).data("addr-id");
                addressObj.venue_name=$("#source_address_table_body tr").eq(i).find("td").eq(0).text();
                addressObj.venue_addr=$("#source_address_table_body tr").eq(i).find("td").eq(1).text();
                var point=$("#source_address_table_body tr").eq(i).find("td").eq(3).text();
                if(point.indexOf("lat")!=-1){
                    point=point.split(",")
                    var lat=point[0].split(":")[1];
                    var lng=point[1].split(":")[1];
                    point=lat+"-"+lng;
                }
                addressObj.venue_point=point;
                addressArray.push(JSON.stringify(addressObj))
            }
            $(".add_address").val("["+addressArray+"]");

            //主办方json

            var addsponsorArray=[];
            for(var i=0;i<$("#source_sponsor_table_body tr").length;i++){
                var addsponsorObj={};
                addsponsorObj.id=$("#source_sponsor_table_body tr").eq(i).data("sponsor-id");
                addsponsorObj.sponsor_name=$("#source_sponsor_table_body tr").eq(i).find("td").eq(0).text();
                addsponsorObj.intro=$("#source_sponsor_table_body tr").eq(i).find("td").eq(1).text();
                addsponsorObj.verify=$("#source_sponsor_table_body tr").eq(i).find("td").eq(2).text();
                addsponsorObj.event_count=$("#source_sponsor_table_body tr").eq(i).find("td").eq(3).text();
                addsponsorObj.pic=$("#source_sponsor_table_body tr").eq(i).find("td").eq(4).attr("data-imgId");
                addsponsorArray.push(JSON.stringify(addsponsorObj))
            }
            $(".add_sponsor").val("["+addsponsorArray+"]");



            var data = $('#neweventtable_form').serializeArray();
            var paraJson = {};
            var paraArray = [];
            paraJson.txtlist = paraArray;
            $(".paraUl li").each(function (index) {
               var paraLength = $(".paraUl li").length;
                var id = $(this).find("a").attr("data-textId");
                var name = $(this).find("a").text();
                var paraph=$($("#"+$(this).find('a').attr("aria-controls")).find('iframe').get(0).contentWindow.document.body).html()
                    var para = {};
                    if (id) {
                        para.id = id;
                    }
                    if (paraph != '') {
                        para.tabname = name;
                        para.txt = paraph;
                        para.order = paraLength - index;
                        paraArray[index] = JSON.stringify(para);
                    }
            });
            paraJson.event_id = $("#eventId").text();
            var url = '/newevent/save_txt/';
            var selectedAddrStr = $("#selectedVenueId").attr('value');
            if (selectedAddrStr) {
                var lastChar = selectedAddrStr.charAt(selectedAddrStr.length - 1);
                if (lastChar == ',') {
                    selectedAddrStr = selectedAddrStr.substring(0, selectedAddrStr.length - 1);
                }
            }
            $("#selectedVenueId").attr('value', selectedAddrStr).val(selectedAddrStr);
            var that = $(this);
            var fromIdStr = $('#from_id').attr('value');
            if ($('#id_f_Class').length > 0) {
                var fromArray = [];
                $("#fromArea").find('.type').each(function () {
                    var content = $(this).find('#remark').val();
                    var index = content.indexOf('@):');
                    if (index < content.length - 3 || $(this).find('#Website').val() != '') {
                        var content = $(this).find('#remark').val();
                        var index = content.indexOf('@):');
                        var tmp = {};
                        tmp.f_class = this.className.substring(this.className.length - 1);
                        tmp.type = $(this).find('#type_f_Class').find('option:selected').attr('value');
                        tmp.Website = $(this).find('#Website').val();
                        tmp.f_content = content.substring(3 + index);
                        fromArray[fromArray.length] = tmp;
                    }

                });
                if (fromArray.length > 0) {
                    for (var j = 0; j < fromArray.length; j++) {
                        var tmp = fromArray[j];
                        $.ajax({
                            type: 'post',
                            url: '/newevent/save_from/',
                            data: {
                                'f_class': tmp.f_class,
                                'type': tmp.type,
                                'Website': tmp.Website,
                                'f_content': tmp.f_content
                            },
                            async: false,
                            success: function (data) {
                                if (data.flag) {
                                    if (fromIdStr.length > 0) {
                                        if (fromIdStr[fromIdStr.length - 1] != ',') {
                                            fromIdStr += ',';
                                        }
                                    }

                                    fromIdStr += data.id;
                                } else {
                                    sweetAlert("注意!", "由于网络原因来源信息没保存成功!", "error");
                                    return false;
                                }
                            }
                        });

                    }
                }
                /*$.post('/newevent/save_from/',queryString,function(data);*/
            }


            $("#from_id").attr('value', str_ck(fromIdStr));
            //alert($("#from_id").attr('value'))
            if ($(".paraUl li").length > 0) {
                $.ajax({
                    url: url, type: 'post', data: paraJson, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        sweetAlert("注意!", "由于网络原因段落没保存成功!", "error");
                        return false;
                    }, success: function (data) {
                        var paraphId = '';
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].flag) {
                                paraphId += data[i].id + ',';
                            }
                        }
                        $("#paragraph").attr('value', paraphId.substring(0, paraphId.length - 1));
                        if ($("#select_begin_time").val() != '') {
                            var selectBeginTime = $("#select_begin_time").val();
                            if (selectBeginTime.split(' ').length > 1) {
                                $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                                $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                            }
                        } else {
                            $("#begin_time_1").attr('value', '');
                        }
                        if ($("#select_end_time").val() != '') {
                            var selectedEndTime = $("#select_end_time").val();
                            if (selectedEndTime.split(' ').length > 1) {
                                $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                                $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                            }
                            ;
                        } else {
                            $("#end_time_1").attr('value', '');
                        }
                        if ($("#ename").val() == 'None') {
                            $("#ename").attr('value', '');
                        }
                        $("#actionType").attr('value', that.attr('data-action-type'));
                        $("#actionType").attr('name', that.attr('data-form-name'));
                        //alert($("#from_id").attr('value'))
                        $("#neweventtable_form").submit();
                    }
                });
            } else if ($(".paraUl li").length == 0 && $($("#editEvent_add").find("iframe").get(0).contentWindow.document.body).html() != '') {
                var para = {};
                para.tabname = '活动介绍';
                para.txt = $($("#editEvent_add").find("iframe").get(0).contentWindow.document.body).html();
                para.order = 1;
                paraArray[paraArray.length] = JSON.stringify(para);
                paraJson.txtlist = paraArray;
                $.ajax({
                    url: url, type: 'post', data: paraJson, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        sweetAlert("注意!", "由于网络原因段落没保存成功!", "error");
                        return false;
                    }, success: function (data) {
                        var paraphId = '';
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].flag) {
                                paraphId += data[i].id + ',';
                            }
                        }

                        $("#paragraph").attr('value', paraphId.substring(0, paraphId.length - 1));
                        if ($("#select_begin_time").val() != '') {
                            var selectBeginTime = $("#select_begin_time").val();
                            if (selectBeginTime.split(' ').length > 1) {
                                $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                                $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                            }
                        } else {
                            $("#begin_time_1").attr('value', '');
                        }
                        if ($("#select_end_time").val() != '') {
                            var selectedEndTime = $("#select_end_time").val();
                            if (selectedEndTime.split(' ').length > 1) {
                                $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                                $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                            }
                            ;
                        } else {
                            $("#end_time_1").attr('value', '');
                        }
                        if ($("#ename").val() == 'None') {
                            $("#ename").attr('value', '');
                        }
                        $("#actionType").attr('value', that.attr('data-action-type'));
                        $("#actionType").attr('name', that.attr('data-form-name'));
                        //alert($("#from_id").attr('value'))
                        $("#neweventtable_form").submit();
                    }
                });
            } else {
                if ($("#select_begin_time").val() != '') {
                    var selectBeginTime = $("#select_begin_time").val();
                    if (selectBeginTime.split(' ').length > 1) {
                        $("#select_begin_time").attr('value', selectBeginTime.split(' ')[0]);
                        $("#begin_time_1").attr('value', selectBeginTime.split(' ')[1]);
                    }
                } else {
                    $("#begin_time_1").attr('value', '');
                }
                if ($("#select_end_time").val() != '') {
                    var selectedEndTime = $("#select_end_time").val();
                    if (selectedEndTime.split(' ').length > 1) {
                        $("#select_end_time").attr('value', selectedEndTime.split(' ')[0]);
                        $("#end_time_1").attr('value', selectedEndTime.split(' ')[1]);
                    }
                    ;
                } else {
                    $("#end_time_1").attr('value', '');
                }
                if ($("#ename").val() == 'None') {
                    $("#ename").attr('value', '');
                }
                $("#actionType").attr('value', that.attr('data-action-type'));
                $("#actionType").attr('name', that.attr('data-form-name'));
                $("#neweventtable_form").submit();
            }
            return false;
        });
//事件绑定
        $("#source_sponsor_table_body").on('click',".deleteNewSponsor",deleteNewSponsor);
        $("#source_sponsor_table_body").on('click',".deleteSponsor",deleteSponsor);
        $("#source_sponsor_table_body").on('click',".edit_sponsor",edit_sponsor)
        $("#source_sponsor_table_body").on('click',"#ok_sponsor",ok_sponsor)
        $("#source_address_table_body").on('click','.edit_map',address_map)
        $("#selected_address_table").on('click','.deleteAddress',deleteAddress)
        $("#selected_address_table").on('click','.address_map',address_map)
        //主办发搜索
         var lo=window.location.pathname.split("/")
        var eventId=lo[lo.length-2]
        if(eventId!="add"){
        var event_id_url="/newevent/get_json_event_sponsor/";
        $.get(event_id_url,{id:eventId},function(data){
            console.log(data)
            if(data.length==0){
                $("#selectedSponsor").hide()
            }else{
                    for(var x=0;x<data.length;x++){
                        var sponsorId= $(".sponsor_list").val();
                        if (sponsorId == '') {
                            $(".sponsor_list").val(data[x].id);
                        } else {
                            $(".sponsor_list").val(sponsorId + "," + data[x].id);
                        }
                        if(data[x].pic_id==null){
                            $("<tr></tr>").attr("data-sponsor-id",data[x].id).append("<td><span class='icon-remove deleteSponsor'></span>"+data[x].name+"</td><td>"+data[x].intro+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td><td data-imgId='"+data[x].pic_id+"'></td>").appendTo("#source_sponsor_table_body")
                        }else{
                            $("<tr></tr>").attr("data-sponsor-id",data[x].id).append("<td><span class='icon-remove deleteSponsor'></span>"+data[x].name+"</td><td>"+data[x].intro+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td><td data-imgId='"+data[x].pic_id+"'><img width='50px' height='50px' src='"+data[x].pic+"'/><p style='margin: 0px;'>图片ID:"+data[x].pic_id+"</p></td>").appendTo("#source_sponsor_table_body")
                        }
                    }
            }
        })
        }else{
            $("#selectedSponsor").hide()
        }
        $(".zbf_text").keydown(function(event){
            var e = event ? event :(window.event ? window.event : null);
            var currKey=0;
            currKey=e.keyCode||e.which||e.charCode;
                if(currKey==13){
                    $(".ss_zbf").click()
                }
            })
        $(".addSponsorText").keydown(function(event){
            var e = event ? event :(window.event ? window.event : null);
            var currKey=0;
            currKey=e.keyCode||e.which||e.charCode;
            if(currKey==13){
                $(".addSponsorBtn").click()
            }
        });
        $(".ss_zbf").click(function(){
            var tx=$(".zbf_text").val();
            var urls="/newevent/get_json_sponsor_str/"+tx+"/"
            $("#sponsor_table_body tr").remove();
            var alreadyId = $(".sponsor_list").attr("value");
            $.get(urls,function(data){
                $("#searcSponsorResult").show();
                $("#selectedSponsor").hide()
                for(var x=0;x<data.length;x++){
                    if(alreadyId.indexOf(data[x].id)!=-1){
                        $("<tr></tr>").attr("data-sponsor-id",data[x].id).addClass("selected").append("<td><span class='icon-remove deleteSponsor'></span>"+data[x].name+"</td><td>"+data[x].intro+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td><td data-imgId='"+data[x].pic_id+"'><img width='50px' height='50px' src='"+data[x].pic+"'/><p style='margin: 0px;'>图片ID:"+data[x].pic_id+"</p></td>").appendTo("#sponsor_table_body")
                    }else{
                        $("<tr></tr>").attr("data-sponsor-id",data[x].id).append("<td><span class='icon-remove deleteSponsor'></span>"+data[x].name+"</td><td>"+data[x].intro+"</td><td>"+data[x].is_verify+"</td><td>"+data[x].event_count+"</td><td data-imgId='"+data[x].pic_id+"'><img width='50px' height='50px' src='"+data[x].pic+"'/><p style='margin: 0px;'>图片ID:"+data[x].pic_id+"</p></td>").appendTo("#sponsor_table_body")
                    }
                }
            })
        });

        //场馆添加
        $("#add_address").click(function(){
            var fillVenue=$.trim($("#fillVenue").val());
            var house_address=$.trim($("#house_address").val());
            var discity =$("#districtId-edit").find("option:selected").text();
            $('#selectedAddress').show();
            if(house_address==""){
                swal("请输入场馆地址");
                return false
            }else{
                $("#selected_address_table").append("<tr data-addr-id>" +
                "<td><span class='icon-remove deleteAddress' data-addr-id></span>"+fillVenue+"</td>" +
                "<td >"+house_address+"</td>" +
                "<td>"+discity+"</td>" +
                "<td><i class='glyphicon glyphicon-map-marker address_map'></i></td></tr>");
                $("#fillVenue").val("");
                $("#house_address").val("");
            }
        });
        //地图
             var marker;
        $(".edit_map").click(address_map)
        var x=0;
        function address_map(){
            var _this=$(this);
            // 百度地图API功能
            $("#baidu_map").show();
            $("#clearMap").show()
            if(!map){
                var map = new BMap.Map("baidu_map");    // 创建Map实例
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                var geoc = new BMap.Geocoder();
            }
            map.clearOverlays()
            if(_this.parent().text().length!=0) {
                var c=_this.parent().text();
                var discity=eval("({"+c+"})")
                var points=new BMap.Point(discity.lng,discity.lat);
                map.centerAndZoom(points,25);
                marker = new BMap.Marker(points);  // 创建标注
                map.addOverlay(marker);
                marker.enableDragging();
                console.log(points)
            }else if(_this.parent().parent().find("td").eq(1).text()!=0){
                var discity =$("#districtId-edit").find("option:selected").text();
                geoc.getPoint(_this.parent().parent().find("td").eq(1).text(), function(point){
                    if (point) {
                        map.centerAndZoom(point, 25);
                        marker=new BMap.Marker(point);
                        map.addOverlay(marker);
                        marker.enableDragging();
                    }
                },discity);
            }else{
                var discity =$("#districtId-edit").find("option:selected").text();
                map.centerAndZoom(discity, 25);
            }
                map.addEventListener("click", function(e){
                    var pt = e.point;
                    geoc.getLocation(pt, function(rs){
                        _this.parent().html("lat:"+rs.point.lat+",lng:"+rs.point.lng+"<span class='glyphicon glyphicon-edit edit_map'></span>")
                        $("#baidu_map").hide();
                    });
                    x++;
                });
        }
        $("#clearMap i").click(function(){
            $("#clearMap").hide();
            $("#baidu_map").hide();
        })
        //场馆删除
        function deleteAddress(){
            //if($(".del_address_id").val().length==0){
            //    $(".del_address_id").val($(this).parent().parent().attr("data-addr-id"))
            //}else{
            //    $(".del_address_id").val($(".del_address_id").val()+','+$(this).parent().parent().attr("data-addr-id"));
            //}
            $(this).parent().parent().remove();
        }



        $("#sponsor_table_body").click(function(){
            var event = window.event || arguments.callee.caller.arguments[0];
            var $this=$(event.target).parent();
            var selectedsponsorId=$this.attr("data-sponsor-id")
            var alreadyId = $(".sponsor_list").attr("value");
            if(selectedsponsorId!=undefined){
            $("#source_sponsor_table_body").append("<tr data-sponsor-id='"+selectedsponsorId+"'><td><span class='icon-remove deleteSponsor'></span>"+$this.find("td").eq(0).text()+"</td><td>"+$this.find("td").eq(1).text()+"</td><td>"+$this.find("td").eq(2).text()+"</td><td>"+$this.find("td").eq(3).text()+"</td><td>"+$this.find("td").eq(4).text()+"</td></tr>")
            if (alreadyId.indexOf(selectedsponsorId) == -1) {
                if (alreadyId == '') {
                    $(".sponsor_list").attr('value', selectedsponsorId).val(selectedsponsorId);
                } else {
                    $(".sponsor_list").attr('value', alreadyId + "," + selectedsponsorId).val(alreadyId + "," + selectedsponsorId);
                }
            } else {
                $("#source_sponsor_table_body").find('tr[data-sponsor-id=' + selectedsponsorId + ']').remove();
                if ($("#source_sponsor_table_body").find('tr').length == 0) {
                    $("#selectedSponsor").hide();
                }
                var readyAdds = $(".sponsor_list").attr("value");
                readyAdds = myReplaceStr(selectedsponsorId, readyAdds, '');
                $(".sponsor_list").attr("value", readyAdds).val(readyAdds);
            }
            }
            if($this.hasClass("selected")){
                $this.removeClass("selected")
            }else{
                $this.addClass("selected")
            }
        })
        $('#sponsorClose').click(function () {
            $('#searcSponsorResult').hide();
            if ($('#source_sponsor_table_body tr').length > 0) {
                $('#selectedSponsor').show();
                $("#selectedSponsor").css({'opacity': 1});
            }
        });
        function deleteSponsor(){
           var _thisId=$(this).parent().parent().attr("data-sponsor-id");
           var sponsor_list=$(".sponsor_list").val();
            sponsor_list = myReplaceStr(_thisId, sponsor_list, "");
            $(".sponsor_list").val(sponsor_list);
            $(this).parent().parent().remove();
        }
        //主办方添加
        $(".addSponsorShwo").click(function(){
            $("#addSponsors").slideDown()
        })
        $(".addSponsorHidden").click(function(){
            $("#addSponsors").slideUp()
        })
        $(".addSponsorBtn").click(function(){
            var sponsorName=$("#sponsor_name").val();
            var sponsor_img=$("#sponsor_img").val();
            var sponsor_text=$("#sponsor_text").val();
            if(sponsorName==""){
                swal("请输入主办方名称");
                return false
            }else{
                $("#source_sponsor_table_body").append("<tr data-sponsor-name='"+sponsorName+"'><td><span class='icon-remove deleteNewSponsor'></span>"+sponsorName+"</td><td>"+sponsor_text+"</td><td>false</td><td>0</td><td data-imgId='"+sponsor_img+"'>"+sponsor_img+"<span class='glyphicon glyphicon-edit edit_sponsor'></span></td></tr>")
                $('#addSponsors').slideUp();
                $('#selectedSponsor').show();
            }
            $("#sponsor_name").val("")
            $("#sponsor_img").val("")
            $("#sponsor_text").val("")
            return false;
        });
        function edit_sponsor(){
            var _this=$(this).parent().parent().find("td");
            _this.eq(0).html("<input type='text' value='"+_this.eq(0).text()+"' style='width: 100%;' /></span>");
            _this.eq(3).html("<input type='text' value='"+_this.eq(3).text()+"' style='width: 80%;' /><span class='glyphicon glyphicon-ok-circle price_gly' id='ok_sponsor'></span>");
        }
        function ok_sponsor(){
            var _this=$(this).parent().parent().find("td");
            _this.eq(0).html("<span class='icon-remove deleteNewSponsor'></span>"+_this.eq(0).find("input").val());
            _this.eq(3).html(_this.eq(3).find("input").val()+"<span class='glyphicon glyphicon-edit edit_sponsor'></span>");
        }
        function deleteNewSponsor(){
            $(this).parent().parent().remove();
            var _thisName=$(this).parent().parent().attr("data-sponsor-name");
            var sponsor_list=$(".addSponsor").val()
            sponsor_list = myReplaceStr(_thisName, sponsor_list, "");
            $(".addSponsor").val(sponsor_list)
        }
        function str_ck(fromIdStr) {
            //arr_from=fromIdStr.replace(/[ ]/g,"").split(",")
            arr_from = fromIdStr.split(",")
            new_arr = new Array();
            for (var i = 0; i < arr_from.length; i++) {
                try {
                    if (!isNaN(arr_from[i])) {
                        if (arr_from[i] > 0) {
                            new_arr.push(arr_from[i]);
                        }
                    }
                }
                catch (e) {

                    alert(e.name + " :  " + e.message);
                }
            }
            return new_arr.join(",")

        }
    })(window)
});
$(function(event){
    //事件绑定
        $(".price_table").on('click','.edit_price',edit_price);
        $(".price_table").on('click','.removePrice',removePrice);
        $(".price_table").on('click','.ok_gly',ok_price);
        $(".price_table").on('click','.no_gly',no_price);
    var lo=window.location.pathname.split("/");
    var eventId=lo[lo.length-2];
    if(eventId=="add"){
        eventId="";
    }
    var tagArray=[];
    var tagHtml="";
    $.get("/newevent/get_json_event_cat/",{id:eventId},function(data){
        tagArray=data
            for(var i=0;i<data.length;i++){
                var n=-1;
                for(var p=0;p<tagArray[i].children.length;p++){
                    if(tagArray[i].children[p].selected){
                        n=i;
                    }
                }
                if(n!=-1){
                    tagHtml+="<li data-click='true' data-index='"+i+"'><a class='bgcolor' data-tag-id='"+data[i].id+"'>"+data[i].name+"</a></li>"
                }else{
                    tagHtml+="<li data-click='false' data-index='"+i+"'><a data-tag-id='"+data[i].id+"'>"+data[i].name+"</a></li>"
                }
            }
        $(".slist_bg").append(tagHtml).find("li").on("click",one)
        if($(".slist_bg li[data-click=true]").length==0){
            $(".slist_bg li").eq(0).click();
        }else{
            $(".slist_bg li[data-click=true]").click()
        }
    })
    function one(){
        var data_id=$(this).find("a").attr("data-tag-id");
        var tag_index=$(this).attr("data-index")
        $(".slist_class").find("li").remove()
        $("#tagUl li").remove();
        var oneHtml="";
        oneHtml+="<li data-click='false' data-rdclick='false'></li>"
                var tag2=tagArray[tag_index].children;
                for(var x=0;x<tag2.length;x++){
                          var checkValue=false;
                    for (var i = $("input:hidden[name=cat]").length - 1; i >= 0; i--) {
                    if($("input:hidden[name=cat]").eq(i).val()==tag2[x].id){
                            checkValue=checkValue||true;
                    }else{
                            checkValue=checkValue||false;
                    }
                    };
                    if(tag2[x].selected||checkValue==true){
                        oneHtml+="<li data-click='flase' data-rdclick='true'><a data-tag-id='"+tag2[x].id+"'>"+tag2[x].name+"</a></li>"
                    }else{
                        oneHtml+="<li data-click='false' data-rdclick='false'><a data-tag-id='"+tag2[x].id+"'>"+tag2[x].name+"</a></li>"
                    }
                }
        $(".slist_class").append(oneHtml).find("li").on('click',two)
        $(this).attr("data-click","true").find("a").addClass("bgcolor").parent().siblings().attr("data-click",false).find("a").removeClass("bgcolor");
        if($(".slist_class li[data-rdclick=true]").length==0){
            //$(".slist_class li[data-rdclick=false]").eq(0).click();
        }else{
            for(var i in $(".slist_class li[data-rdclick=true]")){
                $(".slist_class li[data-rdclick=true]").eq(i).click();
            }
        }
    }

    $("#childCatArea").append('<ul class="list-inline" id="tagUl"></ul> ')
    function two(){
        var _this=$(this);
        var tag2_id=$(this).find("a").attr("data-tag-id");
        if(tag2_id!=undefined){
        var tag2_url="/newevent/get_json_cat/"+tag2_id+"/?_=1411541284292";
            if($(this).attr("data-click")=="true"){
                $(this).attr("data-click","false").find("a").removeClass("bgcolor")
                $("#tagUl li[data-tag-id="+_this.find('a').attr('data-tag-id')+"]").remove()
                $("#selectedCatArea input[type=hidden][value="+_this.find('a').attr('data-tag-id')+"]").remove()
                return false;
            }else{
                    var x=[],a=_this.find('a').attr('data-tag-id');
                    $("input:hidden[name=cat]").each(function(){
                        x.push($(this).val())
                    })
                    console.log(x)

                    if(x.indexOf(a)==(-1)){
                        $("#selectedCatArea").append("<input type='hidden' name='cat' value='"+_this.find('a').attr('data-tag-id')+"'>")
                    }
                    $(this).attr("data-click","true").find("a").addClass("bgcolor")

            }
        $.get(tag2_url,function(data){
            try {
                var tagHtml = "";
                var childTagArray = data[0].tag;
                for (var i = 0; i < childTagArray.length; i++) {
                    var childTag = childTagArray[i];
                    tagHtml += '<li data-tag-id="'+_this.find("a").attr("data-tag-id")+'"><a style="cursor:pointer;"  onclick="clickCat()" value="' + childTag.id + '">' + childTag.name + '</a><i class="icon-remove" onclick="clickRemoveTag()"></i></li>';
                }
                $("#tagUl").append(tagHtml);
            }
            catch (e) {
                alert(e.name + " :  " + e.message);
            }
        })
    }
    }





//价格管理
        $(".price_table").show();
        $.get(
            "/newevent/show_price/",
            {id:eventId}
            ,function(data){
                if(data.length==0){
                    $(".price_table").hide()
                }else{
                for(var i=0;i<data.length;i++){
                    $(".price_tbody").append("<tr data-price-name='"+data[i].price_id+"'>" +
                    "<td>"+data[i].price+"</td>" +
                    "<td style='width: 176px;height: 38px'>"+data[i].end_time+"</td>" +
                    "<td>"+data[i].sale+"</td>" +
                    "<td>"+data[i].discount+"</td>" +
                    "<td>"+data[i].original_price+"</td>" +
                    "<td data-value='"+data[i].status +"'>"+data[i].status +"</td>" +
                    "<td>"+data[i].content  +"</td>" +
                    "<td><span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span></td></tr>");

                    if(data[i].status == "1"){
                        $(".price_tbody").find("tr").eq(i).find("td").eq(5).text("有效")
                    }
                    else{
                        $(".price_tbody").find("tr").eq(i).find("td").eq(5).text("无效")
                    }
                }
                }
            });
    var newPariceId=0;
    $(".price_table").find("th").eq(1).css({
        width:"176px",
        height:"39px"
    });
    $(".price_but").css({
       backgroundColor:"#d9534f",
        color:"white"
    });

    $(".price_but").on('click',function(){
        var newPrice=$("#pr_str").val().split("/");
        var time= $("#select_begin_time").val();
        if($("#pr_str").val()==""){
            swal("请输入价格");
            return false
        }else{
            for(var i=0;i<newPrice.length;i++){
				if ( newPrice[i] ) {
                	$(".price_tbody").append("<tr data-price-name='' data-newParice='"+(newPariceId++)+"'>" +
                	"<td>"+newPrice[i]+"</td>" +
                	"<td>"+time+"</td>" +
                	"<td></td>" +
                	"<td></td>" +
                	"<td></td>" +
                	"<td data-value='1'>有效</td>" +
                	"<td></td>"+
                	"<td><span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span></td></tr>");
				};
            }
            $(".price_table").show();
            $("#pr_str").val("");
        }
    });
    function removePrice(){
        $(this).parent().parent().fadeOut(function(){$(this).remove()
            if($(".del_price_id").val().length==0){
                $(".del_price_id").val($(this).attr("data-price-name"))
            }else{
                $(".del_price_id").val($(".del_price_id").val()+","+$(this).attr("data-price-name"))
            }
        })
    }
    $("#price_close").click(function(){
        $(".price_table").css({display:"none"});
        $(".price_tbody").html("");
    });
        var pirce_temp =[];
        function edit_price(){
            var price_tr = $(this).parent().parent();
            for(var i=0;i<price_tr.find("td").length;i++){
                pirce_temp.push(price_tr.find("td").eq(i).text());
                if(i==1){
                    price_tr.find("td").eq(1).html("<input type='text' class='Wdate w221px_input end_time form-control'  id='select_end_time'  name='end_time'  onFocus='WdatePicker({dateFmt:\"yyyy-M-d H:mm\"})'  value='"+price_tr.find("td").eq(1).text()+"' style='height:30px !important'>");
                }else if(i==5){
                    if(price_tr.find("td").eq(5).attr("data-value")==1){
                        price_tr.find("td").eq(5).html("<select><option value='1' selected>有效</option><option value='0'>无效</option></select>")
                    }else{
                        price_tr.find("td").eq(5).html("<select><option value='1' >有效</option><option value='0' selected>无效</option></select>")
                    }

                }
                else if(i==price_tr.find("td").length-1){
                    price_tr.find("td").eq(7).html("<span class='glyphicon glyphicon-ok-circle price_gly ok_gly'></span>"+"<span class='glyphicon glyphicon-remove-circle price_gly no_gly'></span>");
                }else{
                    price_tr.find("td").eq(i).html("<input type='text' value='"+price_tr.find("td").eq(i).text()+"'>");
                }
            }
        }
    function ok_price(){
        var price_tr = $(this).parent().parent();
        for(var i=0;i<price_tr.find("td").length;i++){
            pirce_temp.push(price_tr.find("td").eq(i).text());
            if(i==1){
                price_tr.find("td").eq(1).html(price_tr.find("td").eq(1).find("input").val());
            }else if(i==5){
                price_tr.find("td").eq(5).attr("data-value",price_tr.find("td").eq(5).find("select").val()).html(price_tr.find("td").eq(5).find("option:selected").text());
            }
            else if(i==price_tr.find("td").length-1){
                price_tr.find("td").eq(7).html("<span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span>");
            }else{
                price_tr.find("td").eq(i).html(price_tr.find("td").eq(i).find("input").val());
            }
        }
    }
    function no_price(){
        var price_temp = $(this).parent().parent();
        for(var e=0;e<pirce_temp.length;e++){
            if(e==pirce_temp.length-1){
                price_temp.find("td").eq(7).html("<span class='glyphicon glyphicon-edit edit_price'></span><span class='glyphicon glyphicon-remove-circle removePrice'></span>")
            }
            else{
                price_temp.find("td").eq(e).html(pirce_temp[e]);
            }
        }
    }
    $(".imgSearch").click(function () {
        window.open("/admin/new_event/neweventimg/?_popup="+$(this).attr("data-name"),'newwindow','height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
        return false;
    })
    //表格修改
});


