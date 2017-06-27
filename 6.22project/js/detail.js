/**
 * Created by sks on 2017/6/23.
 */
var goodsDom = document.getElementById("goods");
var zhanghao = document.getElementById("zhanghao");
console.log(zhanghao);
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);
var search = document.getElementById("search");
var searchBut = document.getElementById("search-but");
searchBut.addEventListener("click", function () {
    location.href = "search.html?search_text=" + search.value;
    console.log(search.value);
});
window.addEventListener("keydown", function (event) {
    event = event || window.evevt;
    if (event.keyCode == 13) {
        location.href = "search.html?search_text=" + search.value;
    }
});
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_cat.php',
    "type": "GET",
    "dataType": "json",
    "success": function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            // var oLi = document.createElement("li");
            // var oA = document.createElement("a");
            // oA.innerText = obj.cat_name;
            // oA.href = 'list.html?cat_id=' + obj.cat_id;
            // oLi.appendChild(oA);
            // oUl.appendChild(oLi);
            $("#oUl").append("<li><a href='list.html?cat_id=" + obj.cat_id + "'> "+ obj.cat_name + "</a></li>")
        }
    },
    "error": function (message) {
        console.log(message);
    }
});

$.ajax({
   "url": "http://lc.shudong.wang/api_goods.php?goods_id=" + goods_id,
    "type": "GET",
    "dataType": "json",
    "success": function (response) {
        console.log(response);
        var templateStr = zhanghao.innerText;
        var dictionObj = response.data[0];
        console.log(templateStr);
        console.log(dictionObj);

        var goods =  $.compile(templateStr, dictionObj);
        console.log(zhanghao.innerText);
        goodsDom.innerHTML = goods;
    }
});
