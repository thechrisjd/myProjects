// var img = document.getElementById('img');
// var images = ['./Images/Box_images/america.jpg', './Images/Box_images/bike.jpg', './Images/Box_images/church.JPG', './Images/Box_images/yellow.jpg'];
// var x = 0;
// var img1 = document.getElementById('img1');
// var images1 = ['./Images/Interests/chess.JPG', './Images/main/woods.JPG', './Images/portfolio/plug.JPG', './Images/portfolio/linux.PNG'];
// var y = 0;
// var img2 = document.getElementById('img2');
// var images2 = ['a.jpg', 'b.jpg', 'c.JPG', 'c.JPG', 'e.JPG'];
// var z = 0;
//
// function slide() {
//     if (x<images.length) {
//
//         x = x + 1;
//
//       }else{
//         x = 1;
//       }
//       img.innerHTML = "<img src="+images[x-1]+">";
//   }
//
// setInterval(slide, 3000);
//
// function slide1() {
//     if (y<images1.length) {
//
//         y = y + 1;
//
//       }else{
//         y = 1;
//       }
//       img1.innerHTML = "<img src="+images1[y-1]+">";
//   }
//
// setInterval(slide1, 4000);
//
// function slide2() {
//     if (z<images2.length) {
//         z = z + 1;
//
//       }else{
//         z = 1;
//       }
//       img2.innerHTML = "<img src="+images2[z-1]+">";
//   }
//
// setInterval(slide2, 1000);
// $("#slideshow > div:gt(0)").hide();
//
// setInterval(function() {
//   $('#slideshow > div:first')
//     .fadeOut(1000)
//     .next()
//     .fadeIn(1000)
//     .end()
//     .appendTo('#slideshow');
// }, 3000);
$(function(){
    $('.text_fade h1:gt(0)').hide();
    setInterval(function(){
      $('.text_fade :first-child').fadeOut(1000)
         .next('h1').fadeIn(1000)
         .end().appendTo('.text_fade');},
      5000);
});
$(function(){
    $('.fadein img:gt(0)').hide();
    setInterval(function(){
      $('.fadein :first-child').fadeOut(1500)
         .next('img').fadeIn(1500)
         .end().appendTo('.fadein');},
      3000);
});
$(function(){
    $('.fadein1 img:gt(0)').hide();
    setInterval(function(){
      $('.fadein1 :first-child').fadeOut(1500)
         .next('img').fadeIn(1500)
         .end().appendTo('.fadein1');},
      3000);
});
$(function(){
    $('.fadein2 img:gt(0)').hide();
    setInterval(function(){
      $('.fadein2 :first-child').fadeOut(1500)
         .next('img').fadeIn(1500)
         .end().appendTo('.fadein2');},
      3000);
});
