$('#frmLogin').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-login",
    data: $('#frmLogin').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      location.href = './profile.php'
    }
    else{
      swal({title: jData.message,icon: "warning", })
    }

  }).fail(function(){})

  return false;
})


/*console.log(jData)*/
/*if(jData.status == 1){
  /*location.href = './profile.php'
}
else{
  swal({title: jData.message,
        icon: "warning", });
}*/


/*swal({title: "System under maintenance code:1",
      icon: "warning", })*/


/*
$.ajax({
  method: "POST",
  url: "./apis/api-login.php",
  data: $('frmLogin').serialize(),
  dataType: "JSON"
}).done(function(jData){

}).fail(function(){})
return false




*/
