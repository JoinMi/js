/**
 * Created by 22896 on 2017/6/27.
 */
$(function () {
    var Name;
    var Pass;
    $("#register").click(function () {
        Name = $("#username").val();
        Pass = $("#password").val();
        console.log([Name,Pass]);
            console.log(123);
            $.ajax({
                "url":"http://h6.duchengjiu.top/shop/api_user.php",
                "type":"POST",
                "dataType":"json",
                "data":{
                    "status":"login",
                    "username":Name,
                    "password":Pass
                },
                "success":function (response) {
                    console.log(response);
                    if(response.code === 0){
                        var data = response.data;
                        for(var prop in data){
                            if(data.hasOwnProperty(prop)){
                                localStorage.setItem(prop,data[prop]);
                            }
                        }
                        location.assign("index.html");
                    }else{
                        alert('用户不存在');
                    }
                }
            })
    })
});