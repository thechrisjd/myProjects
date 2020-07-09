
function previewImage() {
        let preview = document.querySelector('#thumbNailImage')
        let file = document.querySelector('input[type=file]').files[0]
        let reader = new FileReader()
        reader.onloadend = function(){
          preview.src = reader.result
        }
        reader.readAsDataURL(file)
        $('img').removeClass("removeFromDisplay");

}

/*$('#frmUserPost').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-user-upload.php",
    data: $('#frmUserPost').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      swal({title:"CONGRATS", text:"You uploaded",   icon: "success", });
    }else{
      swal({title: jData.message,
            icon: "warning", });
    }
  }).fail(function(){
    swal({title: "System under maintenance",
          icon: "warning", });
  })
  return false
})*/
