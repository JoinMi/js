/**
 * Created by sks on 2017/6/23.
 */
var goodsDom = document.getElementById("goods");
var zhanghao = document.getElementById("zhanghao");
console.log(zhanghao);
var goods_id = $.getQueryString('goods_id');
console.log(goods_id);

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
