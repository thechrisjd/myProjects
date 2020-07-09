//Getting value from "ajax.php".
function fill(Value) {
   $('#sSearch').val(Value);
   $('#display').hide();
}

$(document).ready(function() {

   //On pressing a key on "Search box" in "search.php" file. This function will be called.
   $("#sSearch").keyup(function() {

       var sSearchQuery = $('#sSearch').val();
       if (sSearchQuery == "") {
           $("#display").html("");
       }
       else {
           //AJAX is called.
           $.ajax({
               type: "POST",
               url: "ajax.php",
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
