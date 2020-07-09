var jApp = {
  "fnvHidePages" : function(){
    $('.page').hide()
  }
}
jApp.fnvHidePages()


///////////////////////////////////////////////////////////////////////////////////////////////////////////

setInterval(function(){
  update_last_activity()
}, 5000)


///////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_last_activity(){
$.ajax({
url:"./apis/api-update-last-chat-activity.php",
method:"post",
dataType: "JSON",
success:function(jData){
  $.each(jData,function(key, value) {
    var dic = JSON.parse(value)
    //console.log("status = " + ' ' + dic.status + '|' + "id = " + ' ' + dic.id);
    if (dic.status == 1) {
      $("#styling"+dic.id).addClass('alert-user')
    }else {
      $("#styling"+dic.id).removeClass('alert-user')
    }
});
}
})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetch_user(argument){
  $.ajax({
    url:"./apis/api-fetch-user-chat-data.php?firendId="+argument,
    method:"POST",
    success:function(data){
      $('#user_details'+argument).html(data);
    }
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('.navLink').click(function(){
  jApp.fnvHidePages()
  let sPageToShow = $(this).attr('data-showPage')
  $('#'+sPageToShow).show()
  fetch_user(sPageToShow)
  setInterval(function(){
    fetch_user(sPageToShow)
  }, 5000);
})



$('.form').one( "click" ,function(){
  let formId = $(this).attr('id')
  $('#'+formId).submit(function(event){
    event.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
           type: "POST",
           url: url,
           cache: false,
           data: form.serialize(), // serializes the form's elements.
           success: function(data){
             //console.log(formId+' this is id')
             //document.getElementById(GoogleSearch).text="";
             $('#submintID'+formId).val("");
             }

         });
  })
})
