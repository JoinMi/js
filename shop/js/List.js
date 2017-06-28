$(function List() {
   var cat_id = $.getQueryString("cat_id");
   var page = 1;
   var maxPage;
   var goods = $("#goods ul");
   Ajax(page);
   function Ajax(page) {
       $.ajax({
           "url": 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id +"&page=" + page + "&pagesize=" + 20,
           "type":"GET",
           "dataType": "json",
           "success": function (response) {
               console.log(response);
               maxPage = response.page.page_count;
               $("#standard-img h1").html("分类商品");
               for(var i = 0; i < response.data.length; i++){
                   var obj = response.data[i];
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
    $("#upBut").click(function () {
        page--;
        if(page > maxPage){
            page = maxPage;
        }else if(page < 1){
            page = 1;
        }
        goods.html("");
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        Ajax(page);
    })
    $("#downBut").click(function () {
        page++;
        if(page > maxPage){
            page = maxPage;
        }else if(page < 1){
            page = 1;
        }
        goods.html("");
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        Ajax(page);
    })
});
