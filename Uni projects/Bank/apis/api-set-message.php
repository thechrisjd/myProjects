<?php
session_start();
$sUserId = $_SESSION['sUserId'];
if (!isset($sUserId)) {
  header('Location: ../login');
}

$sMessage = $_POST['txtSendingMessage'];

$sUserId = $sUserId == 'Admin' ? 'user' : 'admin';

if ($sUserId == 'user') {
  $sAdminMessage = 'Admin: '.$sMessage;
  file_put_contents( "../data/to-$sUserId.txt", $sAdminMessage );
  exit;
}else {

  $sData = file_get_contents('../data/clients.json');
  $jData = json_decode($sData);
  if ($jData == null) {
    echo '{"":-1,"code":12,"message":"System under maintenance"}';
    exit;
  }

  $sPhone = $_SESSION['sUserId'];
  $jInnerData = $jData->data->$sPhone;
  $sName = $jInnerData->name;
  $sLastName = $jInnerData->lastName;

  $sUserMessage = $sName.''.$sLastName.'-'."$sPhone: ".$sMessage;
  file_put_contents( "../data/to-$sUserId.txt", $sUserMessage );
  exit;
}
