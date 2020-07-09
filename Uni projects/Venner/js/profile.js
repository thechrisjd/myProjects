console.log('hello')
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

//Getting value from "ajax.php".
/*function fill(Value) {
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
               url: "./apis/api-search-bar-results.php",
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
});*/
