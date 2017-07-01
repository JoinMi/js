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
                        var Class = "<i class='Hot'></i>";
                    }else {
                        var Class = "";
                    }
                    goods.append("<li>" +Class+ "<img src='" + obj.goods_thumb + "' alt=''><h1>" + obj.goods_name + "</h1><span>￥:" + obj.price + "</span><p>"+ obj.goods_desc +"</p><a href='details.html?goods_id=" + obj.goods_id + "'></a></li>")
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
    var carousel = $("#carousel");
    var carouselUl = $("#carousel ul");
    var carouselLi = $("#carousel ul li");
    var carouselContainer = $(".carouselContainer");
    console.log(carousel);
    console.log(carouselUl);
    console.log(carouselLi);
    carouselUl.append(carouselLi.eq(0).clone());
    var index = 0;
    var timer = setInterval(Left,5000);
    carousel.mouseenter(function () {
        clearInterval(timer);
    });
    carousel.mouseleave(function () {
        clearInterval(timer);
        timer = setInterval(Left,2000);
    });
    function Left() {
        index++;
        var Color = carouselContainer.css("backgroundColor");
        if(Color == "rgb(158, 211, 193)"){
            carouselContainer.css("backgroundColor","rgb(148, 213, 245)");
        }else if(Color == "rgb(148, 213, 245)"){
            carouselContainer.css("backgroundColor","rgb(158, 211, 193)");
        }
        carouselUl.animate({"left" : -750*index},300,function () {
            if(index > 1){
                index = 0;
                carouselUl.css("left",0);
            }
        });
    }
});