$(function () {
    function addReceiving() {
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.getItem("token"),
            "type":"POST",
            "dataType":"json",
            "success":function (response) {
                console.log(response);
                var html = "";
                $("#Receiving div").remove();
                for(var i = 0; i < response.data.length; i++) {
                    var obj = response.data[i];
                    html += "<div class='address-item' data-id='"+obj.address_id+"'><span>收件人:" + obj.consignee + "</span>" +
                        "<span>" + obj.province + "</span>" +
                        "<span>" + obj.city + "</span>" +
                        "<span>" + obj.district + "</span>" +
                        "<span>详细收货地址:" + obj.address + "</span>"+
                        "<span>手机号码" + obj.mobile + "</span><button class='delress-item'>删除地址</button></div>"
                }
                $("#Receiving").append(html);
                $(".delress-item").click(function (){
                    console.log(123);
                    var addid = $(this.parentNode).data("id");
                    console.log(addid);
                    var self = this;
                    $.ajax({
                        "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id="+addid,
                        "type":"POST",
                        "dataType":"json",
                        "success":function (response) {
                            console.log(response);
                            $(self.parentNode).remove();
                        }
                    });
                })
            }
        })
    }
    addReceiving();
    function Button(width,height,content,This,ID) {
		this.width = width;
		this.height = height;
		this.content = content;
		this.id = ID || "";
		this.dom = null;
		this.This = This;
		this.className = "Button";
		this.init();
    }
    Button.prototype.init = function () {
		this.dom = document.createElement("button");
		this.dom.style.height = this.height+"px";
		this.dom.style.width = this.width+"px";
		this.dom.innerText = this.content;
		this.dom.style.lineHeight = this.height+"px";
		this.dom.className = this.className;
		this.dom.id = this.id;
		this.This.appendChild(this.dom);
    };
    new Button(100,30,"货到付款",$("#payment")[0]);
    new Button(100,30,"在线支付",$("#payment")[0]);
    new Button(100,30,"订单详情",$("#Inventory")[0]);
    new Button(150,30,"添加收货地址",$("#Receiving")[0],"addNewReceiving");
    new Button(100,30,"提交订单",$("#submit")[0]);
    new Button(100,30,"保存新的地址",$("#addReceiving")[0],"submitBtn");
    $("#addNewReceiving").click(function () {
		$("#shadeTwo").show();
    });
	$("#Del").click(function () {
		$("#shadeTwo").hide();
    });
	$("#submitBtn").click(function () {
		var data = $("form").serialize();
        console.log(data);
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.getItem("token")+"&status=add&",
			"type":"POST",
			"dataType":"json",
			"data":data,
			"success":function (response) {
				console.log(response);
				addReceiving();
            }
		});
        $(this).parent().parent().hide();
    });
	$("#addReceiving").click(function (event) {
	    evevt = event||window.event;
	    var target = event.target || event.srcElement;
        if(target.id == 'consignee'){
            var consignee = $(evevt.target);
            consignee.blur(function () {
                if(consignee.val() == ""){
                    consignee.next().text("收货人不能为空!");
                    return;
                }else{
                    consignee.next().text("");
                }
            })
        }
        if(target.id == "address"){
            var address = $(evevt.target);
            address.blur(function () {
                if(address.val() == ""){
                    address.next().text("详细收货地址不能为空!");
                    return;
                }else{
                    address.next().text("");
                }
            })
        }
        if(target.id == 'tel'){
            var tel = $(evevt.target);
            tel.blur(function () {
                if(tel.val() == ""){
                    tel.next().text("电话不能为空!");
                    return;
                }else if(/[\d]{7}/.test(tel.val())){
                    tel.next().text("");
                }else{
                    tel.next().text("请输入七位电话号码");
                }
            })
        }
        if(target.id == "mobile"){
            var mobile = $(evevt.target);
            mobile.blur(function () {
                if(mobile.val() == ""){
                    mobile.next().text("手机号不能为空!");
                    return;
                }else if(/1[3,5,9,7]\d{9}/.test(mobile.val())){
                    mobile.next().text("");
                }else{
                    moblie.next().text("请输入十一位手机号码");
                }
            })
        }
    })
});
