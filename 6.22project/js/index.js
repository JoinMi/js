if(localStorage.getItem("token") != null){
    var user = $("#user");
    user.html("<a href='#'>"+localStorage.getItem('username')+"</a>");
}
