$('#frmPasswordReset').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-request-password-reset",
    data: $('#frmPasswordReset').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      swal({title:"CONGRATS", text:jData.message,   icon: "success", })
    }
    else{
      swal({title: jData.message,icon: "warning", })
    }

  }).fail(function(){})

  return false
})
