$('#frmAdminLogin').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-admin-login.php",
    data: $('#frmAdminLogin').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      location.href = './admin-profile.php'
    }
    else{
      swal({title: jData.message,
            icon: "warning", });
    }
  }).fail(function(){
    swal({title: "System under maintenance",
          icon: "warning", });
  })
  return false
})
