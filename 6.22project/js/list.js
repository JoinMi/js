/**
 * Created by sks on 2017/6/23.
 */
// var goodsDom = document.getElementById("goods");
// var cat_id = $.getQueryString('cat_id');
// $.ajax({
//     "url": 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id,
//     "type":"GET",
//     "dataType": "json",
//     "success": function (response) {
//         console.log(response);
//         if(response.data.length === 0){
//             var H1 = document.createElement("h1");
//             H1.innerText = "商品列表不存在";
//             goodsDom.appendChild(H1);
//             return;
//         }
//         for(var k in response.data){
//             var obj = response.data[k];
//             var dom = document.createElement("div");
//             var Img = document.createElement("img");
//             Img.src = obj.goods_thumb;
//             var H4 = document.createElement("h4");
//             H4.innerText = obj.goods_name;
//             var Span = document.createElement("span");
//             Span.innerText = "价格" +obj.price;
//             var oA = document.createElement("a");
//             oA.innerText = obj.goods_desc;
//             oA.href ="/detail.html?goods_id=" + obj.goods_id;
//             dom.appendChild(H4);
//             dom.appendChild(Img);
//             dom.appendChild(Span);
//             dom.appendChild(oA);
//             goodsDom.appendChild(dom);
//         }
//     }
// });