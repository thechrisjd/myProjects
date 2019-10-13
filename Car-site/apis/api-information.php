<?php

$sPickupAirport = $_POST['txtPickupAirport'];
$sReturnAirpot = $_POST['txtReturnAirpot'] ?? '';
$intPickupDate = $_POST['intPickupDate'];
$intPickupTime = $_POST['intPickupTime'];
$intReturnDate = $_POST['intReturnDate'];
$intReturnTime = $_POST['intReturnTime'];
$intDriversAge = $_POST['intDriversAge'];


$date1 = strtotime("$intPickupDate  $intPickupTime");
$date2 = strtotime("$intReturnDate $intReturnTime");

$diff = abs($date2 - $date1);
$years = floor($diff / (365*60*60*24));
$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
$days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));



if (!empty($sReturnAirpot)) {
  // code...
  include '../CRUD/connect.php';
  $stmt = $db->prepare('SELECT * FROM `airports` WHERE `airport_name` = :ReturnName');
  $stmt->bindValue(':ReturnName', "$sReturnAirpot");
  if (!$stmt->execute()) {
    fnSendResponce(0,__LINE__,"Something went wrong.");
  }
  $stmt2 = $db->prepare('SELECT * FROM `airports` WHERE `airport_name` = :PickupName');
  $stmt2->bindValue(':PickupName', "$sPickupAirport");
  if (!$stmt2->execute()) {
    fnSendResponce(0,__LINE__,"Something went wrong.");
  }
  $aRows = $stmt->fetchAll();
  $aRows2 = $stmt2->fetchAll();
  if ($aRows[0]->country != $aRows2[0]->country ) {
    fnSendResponce(0,__LINE__,"Return airport needs to be in the same country.");
  }

}



session_start();
$_SESSION['sPickupAirport'] = $sPickupAirport;
$_SESSION['intPickupDate'] = $intPickupDate;
$_SESSION['intPickupTime'] = $intPickupTime;
$_SESSION['intReturnDate'] = $intReturnDate;
$_SESSION['intReturnTime'] = $intReturnTime;
$_SESSION['intDriversAge'] = $intDriversAge;
$_SESSION['Days'] = $days;
if (!empty($sReturnAirpot)) {
  $_SESSION['sReturnAirpot'] = $sReturnAirpot;
}


function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}

fnSendResponce(1,__LINE__,"You have signed in.");
