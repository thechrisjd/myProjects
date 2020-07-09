<?php
$sPageTitle = 'Venner';
$sLinkToCSSScript = './css/styles.css';
require_once './outer-top.php';
?>
<div class="background-image">
  <section class="Opening_page">
    <div class="text_fade gone">
      <p></p>
      <p>Welcome to Venner</p> <!--need to place the text on top of each other-->
      <p></p>
      <p>This is a test website to display my full stack skills.</p>
      <p></p>
      <p>The website is based on php 7 and mysql.</p>
      <p></p>
      <p>I have implemented both TLS encrytion and user input sanitization.</p>
      <p></p>
      <p>To ensure a secure website.</p>
      <p></p>
      <p>Why don't you test out the site by signing-up.</p>
    </div>
  </section>
</div>
<nav>
  <a href="./signup">signup</a>
  <a href="./login">login</a>
</nav>

<footer>
  <p>nsjnfankadn</p>
  <p>sakjsakafja</p>
  <div class="social-media-links">
    <a href="#" class="fa fa-facebook"></a>
    <a href="#" class="fa fa-twitter"></a>
    <a href="#" class="fa fa-google"></a>
    <a href="#" class="fa fa-linkedin"></a>
    <a href="#" class="fa fa-instagram"></a>
  </div>
  <div class="Copyright">
    <p>  Venner Aps | © Copyright Venner 2019. All rights reserved</p>
  </div>
</footer>

<?php
$LinkToScript = '<script src="./js/test.js"></script>';
require_once './outer-bottom.php';
?>
