console.log('x');

function fill(Value) {
   $('#sPickupSearch').val(Value);
   $('#display').hide();
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
               url: "./apis/test.php",
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
