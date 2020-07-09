$(function(){
    $('.text_fade p:gt(0)').hide();
    setInterval(function(){
      $('.text_fade :first-child').fadeOut(1000)
         .next('p').fadeIn(1000)
         .end().appendTo('.text_fade');},
      4000);
});
