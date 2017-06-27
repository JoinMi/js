var goods = document.getElementById("goods");
var section = document.getElementsByTagName("section")[0];
var searchValue = $.getQueryString("search_text");
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
console.log(searchValue);
search.value = searchValue;
var oUl = document.getElementById("oUl");
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_cat.php',
    "type": "GET",
    "dataType": "json",
    "success": function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            var oLi = document.createElement("li");
            var oA = document.createElement("a");
            oA.innerText = obj.cat_name;
            oA.href = 'list.html?cat_id=' + obj.cat_id;
            oLi.appendChild(oA);
            oUl.appendChild(oLi);
        }
    },
    "error": function (message) {
        console.log(message);
    }
});
var UP = document.getElementById("UP");
var DOWN = document.getElementById("DOWN");
var goodsDom = document.getElementById("goods");
var Paging = document.getElementById("paging");
var sum = 1;
var Max;
searchGoods(sum);
UP.addEventListener("click", function () {
    Paging.innerHTML = null;
    sum--;
    if (sum < 1) sum = 1;
    paging.style.left = -(45 * sum - 600) + "px";
    goodsDom.innerHTML = null;
    searchGoods(sum);
});
DOWN.addEventListener("click", function () {
    Paging.innerHTML = null;
    sum++;
    if(sum > Max) sum = Max;
    Paging.style.left = -(45 * sum - 600) + "px";
    goodsDom.innerHTML = null;
    searchGoods(sum);
});
Paging.addEventListener("click", function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.nodeName == "BUTTON") {
        sum = target.innerText;
        goodsDom.innerHTML = null;
        Paging.innerHTML = null;
        Paging.style.left = -(45 * sum - 600) + "px";
        searchGoods(sum);
    }
});
function searchGoods() {
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php?search_text=" + search.value + "&page=" + sum + "&pagesize=" + 5,
        "type": "GET",
        "dataType": "json",
        "success": function (response) {
            console.log(response);
            console.log(response.page.count);
            Max = response.page.page_count;
            console.log(response.page.page_count);
            if(response.data.length === 0){
                var oH1 = document.createElement("h1");
                oH1.innerText = response.message;
                goods.appendChild(oH1);
            }else{
                goods.style.height = 1200 + "px";
                // var num = Math.ceil((response.data.length)/5);
                // for(var t = 1; t < num+1; t++){
                //     var But = document.createElement("button");
                //     But.innerText = t;
                //     Button.appendChild(But);
                // }
                // var paging = Button.getElementsByTagName("button");
            }
            // var sum = 0;
            create();
            // if(paging.length !== 0 ) {
            //     for (var j = 0; j < paging.length; j++) {
            //         paging[j].index = j;
            //         paging[j].addEventListener("click", function () {
            //             sum = 5 * (this.index);
            //             console.log(sum);
            //             goods.innerHTML = null;
            //             create(sum);
            //         })
            //     }
            // }
            function create() {
                for (var j = 1; j < response.page.page_count + 1; j++) {
                    $("#paging").append("<button>" + j + "</button>")
                }
                for (var i = 0; i < response.data.length; i++) {
                    var obj = response.data[i];

                    // if (i >= sum && i < sum + 5) {
                    //     var oDiv = document.createElement("div");
                    //     oDiv.className = "oDiv";
                    //     var oA = document.createElement("a");
                    //     var oImg = document.createElement("img");
                    //     oA.href = "detail.html?goods_id=" + obj.goods_id;
                    //     oA.appendChild(oImg);
                    //     oImg.src = obj.goods_thumb;
                    //     var oH3 = document.createElement("h3");
                    //     oH3.innerText = obj.goods_name;
                    //     var oP = document.createElement("p");
                    //     oP.innerText = obj.goods_desc;
                    //     var oSpan = document.createElement("span");
                    //     oSpan.innerText = "￥" + obj.price;
                    //     var shop = document.createElement("a");
                    //     shop.innerText = "立即购买";
                    //     shop.className = "shop";
                    //     shop.href = "#";
                    //     var shoppingCart = document.createElement("a");
                    //     shoppingCart.innerText = "加入购物车";
                    //     shoppingCart.className = "shoppingCart";
                    //     shoppingCart.href = "#";
                    //     oDiv.appendChild(oA);
                    //     oDiv.appendChild(oH3);
                    //     oDiv.appendChild(oP);
                    //     oDiv.appendChild(oSpan);
                    //     oDiv.appendChild(shop);
                    //     oDiv.appendChild(shoppingCart);
                    //     goods.appendChild(oDiv);
                        $("#goods").append("<div class='oDiv'><a href='detail.html?goods_id='" + obj.goods_id + "'><img src='" + obj.goods_thumb + "' /></a><h3>" + obj.goods_name + "</h3><p>"+ obj.goods_desc +"</p><span>￥　"+ obj.price +"</span><a class='shop' href='#'>立即购买</a><a class='shoppingCart' href='#'>加入购物车</a></div>")
                    }
                }
            // }
        }
    });

}