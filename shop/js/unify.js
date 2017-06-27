$(function () {
    $.ajax({
       "url":"http://h6.duchengjiu.top/shop/api_cat.php",
        "type":"GET",
        "dataType":"json",
        "success":function (reaponse) {
            console.log(reaponse);
            var goods = $("#goods ul");
            for(var i = 0; i < reaponse.data.length; i++){
                var obj = reaponse.data[i];
                goods.append("<li><a href='#'>" + obj.cat_name + "</a></li>")
            }
        }
    });
    $("#goods ul li").click(function () {
        $(this).css("background-color", "red").siblings().css("background-color", "");
    });
    document.onscroll = function () {
        var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrTop > 150){
            $("#goods").addClass("goods");
            $("header").css("padding-bottom",40);
        }else if(scrTop < 150){
            $("#goods").removeClass("goods");
            $("header").css("padding-bottom",0);
        }
    }
});
