jQuery.getQueryString = function (name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
jQuery.compile = function(templateStr, dictionObj){
    return templateStr.replace(/\{([0-9a-zA-Z_]+)\}/g,function (match, $1) {
        return dictionObj[$1];
    })
};
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
    var goodsDom = document.getElementById("goods");
    var Paging = document.getElementById("paging");
    var cat_id = $.getQueryString('cat_id') || "";
    var UP = document.getElementById("UP");
    var DOWN = document.getElementById("DOWN");
    var sum = 1;
    var Max;
    page(sum);
    UP.addEventListener("click", function () {
        Paging.innerHTML = null;
        sum--;
        if (sum < 1) sum = 1;
        paging.style.left = -(45 * sum - 600) + "px";
        goodsDom.innerHTML = null;
        page(sum);
    });
    DOWN.addEventListener("click", function () {
        Paging.innerHTML = null;
        sum++;
        if(sum > Max) sum = Max;
        Paging.style.left = -(45 * sum - 600) + "px";
        goodsDom.innerHTML = null;
        page(sum);
    });
    Paging.addEventListener("click", function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName == "BUTTON") {
            sum = target.innerText;
            goodsDom.innerHTML = null;
            Paging.innerHTML = null;
            Paging.style.left = -(45 * sum - 600) + "px";
            page(sum);
        }
    });
    function page(page) {
        $.ajax({
            "url": 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id + "&page=" + page + "&pagesize=" + 10,
            "type": "GET",
            "dataType": "json",
            "success": function (response) {
                console.log(response);
                console.log(response.page.count);
                Max = response.page.page_count;
                console.log(response.page.page_count);
                if (response.data.length === 0) {
                    // var H1 = document.createElement("h1");
                    // H1.innerText = "商品列表不存在";
                    // goodsDom.appendChild(H1);
                    $("#goods").append("<h1>商品列表不存在</h1>");
                    return;
                }
                for (var j = 1; j < response.page.page_count + 1; j++) {
                    $("#paging").append("<button>" + j + "</button>")
                }
                for (var k in response.data) {
                    var obj = response.data[k];
                    // var dom = document.createElement("div");
                    // var Img = document.createElement("img");
                    // Img.src = obj.goods_thumb;
                    // var H4 = document.createElement("h4");
                    // H4.innerText = obj.goods_name;
                    // var Span = document.createElement("span");
                    // Span.innerText = "价格" + obj.price;
                    // var oA = document.createElement("a");
                    // oA.href = "detail.html?goods_id=" + obj.goods_id;
                    // oA.innerText = obj.goods_desc;
                    // dom.appendChild(H4);
                    // dom.appendChild(Img);
                    // dom.appendChild(Span);
                    // dom.appendChild(oA);
                    // goodsDom.appendChild(dom);
                    $("#goods").append("<div><h4>" + obj.goods_name + "</h4>" +
                        "<img src='" +obj.goods_thumb+ "'/>" +
                        "<span>" + '价格' + obj.price + "</span>" +
                        "<a href='detail.html?goods_id=" + obj.goods_id +"'"+">"  + obj.goods_desc + "</a></div>");
                }
            }
        });
    }

