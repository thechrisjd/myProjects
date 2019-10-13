<?php

$sAdminId = $_POST['txtUsername'] ?? '';

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse(-1,__LINE__,'System under maintenance');
}



$sLoginPassword = $_POST['txtLoginPassword'] ?? '';
if (empty($sLoginPassword)) {
  sendResponse(0,__LINE__,'Password required');
}
if (strlen($sLoginPassword) < 6) {
  sendResponse(0,__LINE__,'Password needs to be longer than 6 digits');
}
if (strlen($sLoginPassword) > 64) {
  sendResponse(0,__LINE__,'Password needs to be less than 64 digits');
}


if(!password_verify ($sLoginPassword , $jData->$sAdminId->password)){
  sendResponse(0, __LINE__, 'Incorrect password');
}


session_start();
$_SESSION['sUserId'] = $sAdminId;


sendResponse(1,__LINE__,'Login successful');
//*********************** FUNCATIONS BELOW **************************************

function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
