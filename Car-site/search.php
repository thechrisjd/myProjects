<?php require_once 'top.php'; ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Search for your Luxury Car</title>
    <meta name="description" content="This is a car rental site. Users can hire vehicles for a time period of their choice.">
    <link rel="stylesheet" href="./css/styles.css">
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
    </header>

      <div class='card'>

        <div class='card_right'>
          <form id="frmSearch" action="./apis/api-information" method="post">
            <h1>Start resivation</h1>
            <div class="search_tab">
              <h2>Pick-up location</h2>
              <input id="sPickupSearch" type="text"  name="txtPickupAirport" ><br>
              <div id="display"></div>
              <div class="checkbox ">
                <input type="checkbox" id="inpCheckBox" onclick="myFunction()">
                <p> Return to different location</p>
              </div>
              <input id="inpReturnAirport" style="display:none" type="text" name="txtReturnAirpot">
              <div id="ReturnDisplay"></div>
            </div>
            <div class="time_grid">
              <div class="pickup_gird">
                <h2>Pick-up date & time</h2>
                <input  type="date" name="intPickupDate" >
                <input  type="time" name="intPickupTime" >
              </div>
              <div class="return_grid">
                <h2>Return date & time</h2>
                <input type="date" name="intReturnDate" >
                <input type="time" name="intReturnTime" >
              </div>
              <div class="">
                <h2>Drivers age</h2>
                <input type="date" name="intDriversAge" min="1994-01-01" >
              </div>
            </div>
            <button class="btn">CONFIRM</button>
          </form>
        </div>
      </div>

<?php
$sLinkToScript = '<script src="./js/main.js"></script>';
require_once 'bottum.php'; ?>
