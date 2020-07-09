<?php

/*$sPhone = $_POST['txtLoginPhone'] ?? '';
if (empty($sPhone)) {
  sendResponse(0,__LINE__,'Phone number required');
}
if (strlen($sPhone) != 8) {
  sendResponse(0,__LINE__,'Phone number needs to be 8 digits');
}
if (intval($sPhone) < 10000000) {
  sendResponse(0,__LINE__,'Not a valid number');
}

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse(-1,__LINE__,'System under maintenance');
}
$jInnerData = $jData->data;

if ($jInnerData->$sPhone->status == 0) {
  sendResponse(0,__LINE__,'Your account has been blocked.');
}

$sLoginPassword = $_POST['txtLoginPassword'] ?? '';
if (empty($sLoginPassword)) {
  sendResponse(0,__LINE__,'Password required');
}
if (strlen($sLoginPassword) < 6) {
  if(!($jInnerData->$sPhone->loginFailCount < 3)){
    sendResponse(0,__LINE__,'You have been locked out, please contact a member of staff.');
  }

  $jInnerData->$sPhone->loginFailCount += 1;
  $sFinalData = json_encode($jData);

  file_put_contents('../data/clients.json', $sFinalData);
  sendResponse(0,__LINE__,'Password needs to be longer than 6 digits');
}
if (strlen($sLoginPassword) > 64) {
  if(!($jInnerData->$sPhone->loginFailCount < 3)){
    sendResponse(0,__LINE__,'You have been locked out, please contact a member of staff.');
  }

  $jInnerData->$sPhone->loginFailCount += 1;
  $sFinalData = json_encode($jData);

  file_put_contents('../data/clients.json', $sFinalData);
  sendResponse(0,__LINE__,'Password needs to be less than 64 digits');
}


if( !isset( $jInnerData->$sPhone ) ){
   sendResponse(0,__LINE__,'Phone number is not registered');
}

if ($jInnerData->$sPhone->active == 0) {
  sendResponse(0, __LINE__, 'Sorry you have not activated your account, please check your emails to do so.');
}

if(!password_verify ($sLoginPassword , $jInnerData->$sPhone->password)){

  if(!($jInnerData->$sPhone->loginFailCount < 3)){
    sendResponse(0,__LINE__,'You have been locked out, please contact a member of staff.');
  }

  $jInnerData->$sPhone->loginFailCount += 1;
  $sFinalData = json_encode($jData);
  file_put_contents('../data/clients.json', $sFinalData);
  sendResponse(0, __LINE__, 'Incorrect password');
}

if(!($jInnerData->$sPhone->loginFailCount < 3)){
  sendResponse(0,__LINE__,'You have been locked out, please contact a member of staff.');
}

$jInnerData->$sPhone->loginFailCount = 0;
$sFinalData = json_encode($jData);
//echo $sFinalData;
file_put_contents('../data/clients.json', $sFinalData);
session_start();
$_SESSION['sUserId'] = $sPhone;

*/
sendResponse(1,__LINE__,'Login successful');
//*********************** FUNCATIONS BELOW **************************************

function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
