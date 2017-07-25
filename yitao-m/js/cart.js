window.onload = function () {
    function Cart() {
        this.userToken = "";
        this.dom = null;
        this.compileBut = null;
        this.plusBut = null;
        this.minusBut = null;
        this.subtotal = 0;
        this.extendedPrice = 0;
        Cart.prototype.init = function () {
            this.userToken = localStorage.getItem("token");
            this.compileBut = document.querySelector("#compileBut");
            this.dom = document.querySelector("#cartGoods ul");
        };
        Cart.prototype.countSubtotal = function () {

        };
        Cart.prototype.countExtendedPrice = function () {

        };

        Cart.prototype.requestAjax = function () {
            var self = this;
            var html = '';
          Ajax("GET","api_cart.php?token="+self.userToken,"",function (response) {
              console.log(response);

              for(var i = 0; i < response.data.length; i++){
                  var obj = response.data[i];
                  html += "<li><div class='check'><input type=checkbox></div><img src="+obj.goods_thumb+" alt=''><div class='cart-right'><p>"+obj.goods_name+"</p><span>"+ obj.goods_price*obj.goods_number+"元</span><div class='cart-but'><button id=goods_price>+</button><input type='tel' value="+ obj.goods_number+"><button id=minusBut>-</button></div></div><input type='hidden' value="+ obj.goods_id+"></li>";
              }
              self.dom.innerHTML = html;
          })
        };
        this.init();
        this.requestAjax();
    }
    new Cart();
};