function myFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("inpCheckBox");
  // Get the output text
  var text = document.getElementById("inpReturnAirport");
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}
function fill(t) {
   $('#sPickupSearch').val(t);
   $('#display').hide();
}
function fillSecond(t) {
   $('#inpReturnAirport').val(t);
   $('#ReturnDisplay').hide();
}
$(document).ready(function() {
   //On pressing a key on "Search box" in "search.php" file. This function will be called.
   $("#sPickupSearch").keyup(function() {
       var sSearchQuery = $('#sPickupSearch').val();
       if (sSearchQuery == "") {
           $("#display").html("");
       }
       else {
           //AJAX is called.
           $.ajax({
               type: "POST",
               url: "./apis/api-search-locations.php",
               data: {
                   databaseQuery: sSearchQuery
               },
               //If result found, this function will be called.
               success: function(html) {
                   $("#display").html(html).show();
               }
           });
       }
   });
});
$(document).ready(function() {
   //On pressing a key on "Search box" in "search.php" file. This function will be called.
   $("#inpReturnAirport").keyup(function() {
       var sSecondSearchQuery = $('#inpReturnAirport').val();
       if (sSecondSearchQuery == "") {
           $("#ReturnDisplay").html("");
       }
       else {
           //AJAX is called.
           $.ajax({
               type: "POST",
               url: "./apis/api-search-locations.php",
               data: {
                   SecondDatabaseQuery: sSecondSearchQuery
               },
               //If result found, this function will be called.
               success: function(html) {
                   $("#ReturnDisplay").html(html).show();
               }

           });
       }
   });
});
$('#frmSearch').submit(function(){
  $.ajax({
    method: "POST",
    url: "./apis/api-information",
    data: $('#frmSearch').serialize(),
    dataType: "JSON"
  }).done(function(jData){
    console.log(jData)
    if(jData.status == 1){
      location.href = "./vechicle-info.php"
    }else{
      swal({title: jData.message,
            icon: "warning", });
    }
  }).fail(function(jData){
    console.log(jData.message);
    swal({title: "System under maintenance",
          icon: "warning", });
  })
  return false
})
