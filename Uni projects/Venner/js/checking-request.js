setInterval(function(){
  update_last_activity()
}, 5000)

function update_last_activity(){
$.ajax({
url:"./apis/api-checking-requests.php",
method:"post",
dataType: "JSON",
success:function(jData){
  $.each(jData,function(key, value) {
    var dic = JSON.parse(value)
    //console.log("status = " + ' ' + dic.status + '|' + "id = " + ' ' + dic.id);
    if (dic.status == 1) {
      $("#alert1").addClass('alert-user-to-message')
    }
});
}
})
}
