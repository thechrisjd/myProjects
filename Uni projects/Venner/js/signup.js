$('#frmSignup').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-signup",
    data: $('#frmSignup').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      swal({title:"CONGRATS", text:"You have signed up",   icon: "success", });
    }else{
      swal({title: jData.message,
            icon: "warning", });
    }
  }).fail(function(){
    swal({title: "System under maintenance",
          icon: "warning", });
  })
  return false
})
