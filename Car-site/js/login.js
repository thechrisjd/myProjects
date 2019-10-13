$('#frmLogin').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-login.php",
    data: $('#frmLogin').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      location.href = './search'
    }
    else{
      swal({title: jData.message,
            icon: "warning", });
    }
  }).fail(function(){

    swal({title: "System under maintenance",
          icon: "warning", });
          location.href = './search'
  })
  return false
})
