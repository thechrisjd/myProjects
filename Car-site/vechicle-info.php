<?php require_once 'top.php'; ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="This is a car rental site. Users can hire vehicles for a time period of their choice.">
    <title>Select vechicle</title>
    <link rel="stylesheet" href="./css/vechile-styles.css">
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
        <div class="progress_icons active">
          <img src="images/select.svg">
          <h3 style="margin-left:35px;">Select vechile</h3>
        </div>
        <div class="progress_icons">
          <img src="images/right-arrow.svg">
        </div>
        <div class="progress_icons">
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
$sDays = $_SESSION['Days'];
try {
  $stmt = $db->prepare('SELECT * FROM `car_info` ');
  if (!$stmt->execute()) {
    echo "string";
  }
  $aRows = $stmt->fetchAll();
  foreach ($aRows as $jRow) {
    $CarRef = $jRow->car_id;

    if ($jRow->gear_box == 1) {
      $sGearBox = 'manual';
    }else {
      $sGearBox = 'automatic';
    }
    $intDays = $jRow->price * $sDays;
    $str = <<<EOD
    <div class='card_1'>
      <div class='card_1_main'>
        <div class="car_img">
          <img src="./images/$jRow->picture">
        </div>
        <div class="car_details">
          <h2>$jRow->type</h2>
          <p>Similar car</p>
          <div class="car_details-inner">
            <p>$sGearBox</p>
            <p>$jRow->size people</p>
            <p>$jRow->bags bags</p>
          </div>
        </div>
        <div class="car_details_price">
          <p class="pay_at">Pay at pick-up</p>
            <div class="price">
              <p>$jRow->price DKK</p>
              <p>price per day</p>
            </div>
            <p style="position: absolute; margin-left: 120px; margin-top: -34px;">$intDays DKK</p>
            <p style="position: absolute; margin-left: 120px; margin-top: -16px;">total price</p>

          <button><a href="./conformation.php?ref=$CarRef&total=$intDays">Select</a></button>
        </div>
      </div>
    </div>

EOD;
       echo $str;
  }

} catch (PDOException $e) {
  echo $e;
}


?>



<?php require_once 'bottum.php';


/*<form class="" action="./conformation.php?ref=1" method="get">
  <button>select</button>
</form>*/

?>
