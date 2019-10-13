<?php require_once 'top.php'; ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="This is a car rental site. Users can hire vehicles for a time period of their choice.">
    <title>Luxury Cars | conformation</title>
    <link rel="stylesheet" href="./css/transaction.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster&display=swap" rel="stylesheet">
  </head>
  <body>
    <header>
      <nav>
        <div class="Logo">LuxuryCars.com</div>
        <a href="#">Bookings</a>
        <a href="#">Account</a>
        <a href="#">Help</a>
        <a class="right" href="./apis/api-logout.php">Logout</a>
      </nav>
      <div class="progress_bar">
        <div class="progress_icons">
          <img src="images\input.svg">
          <div class="anchor">
              <a href="./search">Rental time & date</a>
          </div>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons">
          <img src="images/select.svg">
          <div class="anchor" style="margin-left:10px;">
              <a href="./search">Select vechile</a>
          </div>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons">
          <img src="images\confirm.svg">
          <div class="anchor" style="">
              <a href="./search">Confirm information</a>
          </div>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons active">
          <img src="images\conformation.svg" >
          <h3>Email conformation</h3>
        </div>
      </div>
    </header>
    <div class='card'>
      <div class='card_right'>
        <h1>Your reservation is complete. A conformation email containing your booking details has been sent.</h1>
      </div>
    </div>
<?php require_once 'bottum.php'; ?>
