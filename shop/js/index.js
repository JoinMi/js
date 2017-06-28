$(function () {
    var page = 1;
    var pagesize = 10;
    Ajax(page);
    function Ajax(page) {
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_goods.php?" + "page=" + page +  "&pagesize=" + pagesize,
            "type":"GET",
            "dataType":"json",
            "success":function (reapense) {
                console.log(reapense);
                $("#goods").append("<ul></ul>");
                var goods = $("#goods ul");
                for(var i = 0 ; i < reapense.data.length; i++){
                    var obj = reapense.data[i];
                    if(i < 1){
                        var Class = "class = goodsfirst";
                    }else {
                        var Class = "";
                    }
                    goods.append("<li " + Class + "><img src='" + obj.goods_thumb + "' alt=''><h1>" + obj.goods_name + "</h1><span>￥:" + obj.price + "</span><p>"+ obj.goods_desc +"</p><a href='details.html?goods_id=" + obj.goods_id + "'></a></li>")
                }
            }
        })
    }
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight >= scrollHeight){
            page++;
            if(page > 10){
                page = 10;
                return;
            }
            Ajax(page);
        }
    });
});