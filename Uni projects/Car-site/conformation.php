<?php require_once 'top.php';?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="This is a car rental site. Users can hire vehicles for a time period of their choice.">
    <title>Luxury Cars | Details</title>
    <link rel="stylesheet" href="./css/conform.css">
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
          <a style="font-size:18px; margin-left:-100px; margin-top: -300px; text-decoration:none;" href="./search"><h3>Rental time & date</h3></a>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons">
          <img src="images/select.svg">
          <a style="font-size:18px; margin-left:-100px; margin-top: -300px; text-decoration:none;" href="./vechicle-info"><h3 style="margin-left:20px;">Select vechile</h3></a>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons active">
          <img src="images\confirm.svg">
          <h3>Confirm information</h3>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons">
          <img src="images\conformation.svg" >
          <h3>Email conformation</h3>
        </div>
      </div>
    </header>
<?php
include './CRUD/connect.php';

$CarRef = $_GET['ref'];
$sPickupAirport = $_SESSION['sPickupAirport'];
$intPickupDate = $_SESSION['intPickupDate'];
$intPickupTime = $_SESSION['intPickupTime'];
$intReturnDate = $_SESSION['intReturnDate'];
$intReturnTime = $_SESSION['intReturnTime'];
$intDriversAge = $_SESSION['intDriversAge'];


$stmt = $db->prepare('SELECT * FROM `car_info` WHERE `car_id`= :CarRef');
$stmt->bindValue(':CarRef', "$CarRef");
if (!$stmt->execute()) {
  // code...
}
$aRows = $stmt->fetchAll();
$sType = $aRows[0]->type;
$intPrice = $aRows[0]->price;
$Picture = $aRows[0]->picture;
if ($aRows[0]->gear_box == 1) {
  // code...
  $sGearbox = "manuel";
}else {
  // code...
  $sGearbox = "auto";
}
try {
  $stmt = $db->prepare('SELECT * FROM `user_info` WHERE `id` = :sUserId');
  $stmt->bindValue(':sUserId', "$sUserID");
  if (!$stmt->execute()) {
    // code...
    echo 'x';
  }
  $aRows3 = $stmt->fetchAll();
  $sUersEmail = $aRows3[0]->email;
  $sCompanyName = $aRows3[0]->company_name;
} catch (\Exception $e) {

}

/*$stmt5 = $db->prepare('SELECT * FROM `user_info` WHERE `id` = :sUserId');
$stmt5->bindValue(':sUserId', "$sUserID");
if ($stmt5->execute()) {
  // code...
  echo 'x';
}
$aRows3 = $stmt5->fetchAll();
var_dump($aRows3);*/
//$sUersEmail = $aRows2->email;
//$sCompanyName = $aRows2[0]->company_name;
//var_dump($aRows2);
$intTotal =   $_GET['total'];
$str = <<<EOD
<div class='card'>
  <div class='card_right'>
    <div class="car_details">
      <h2>Price $intPrice DKK per day</h2>
      <img src="./images/$Picture" alt="">
      <p>Vechicle type $sType</p>
      <p>$sGearbox</p>
      <div class="date" style="display: grid; grid-template-columns: 1fr 1fr; margin-top: 5px;">
        <p>Pick-up on $intPickupDate</p>
        <p>Return on $intReturnDate</p>
      </div>
      <h2 style="margin-left: 17px;">Total price: $intTotal DKK</h2>
    </div>
  </div>
</div>
<div class='card_2'>
  <div class='card_right_2'>
    <div class="driver_details">
      <h2>Company details</h2>
      <div>
        <p>Your email: $sUersEmail<p>
        <p>Company name: $sCompanyName </p>
      </div>
      <h2>Drive details</h2>
      <div class="p_names">
        <p>Frist name</p>
        <p>Last name</p>
      </div>

        <input class="name_input" type="text" name="" value="">
        <input class="name_input" type="text" name="" value=""> <br>
        <p>Phone number</p>
        <input class="phone_input" type="text" name="" value="">
        <p>Upload diving lisence now?</p>
        <input class="file_input" type="file" name="" value=""><br>

      <button><a href="./apis/api-send-conformation.php?email=$sUersEmail&name=$sCompanyName&type=$sType&price=$intPrice&pickup=$intPickupDate&return=$intReturnDate">Confirm</a></button>
    </div>
  </div>
</div>

EOD;

echo $str;
?>


<?php require_once 'bottum.php'; ?>
