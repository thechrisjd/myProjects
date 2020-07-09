<?php
session_start();
$sUserId = $_SESSION['sUserId'];
if (!isset($sUserId)) {
  header('Location: ../login');
}

$sNewPhoneNumber = $_POST['txtNewNumber'] ?? '';

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse(-1,__LINE__,'System under maintenance');
}

$jInnerData = $jData->data;

if (empty($sNewPhoneNumber)) {
  sendResponse(0,__LINE__,'Phone number required');
}
if( isset( $jInnerData->$sNewPhoneNumber ) ){
   sendResponse(0,__LINE__,'Phone number is already registered');
}
if (strlen($sNewPhoneNumber) != 8) {
  sendResponse(0,__LINE__,'Phone number needs to be 8 digits');
}
if (intval($sNewPhoneNumber) < 10000000) {
  sendResponse(0,__LINE__,'Not a valid number');
}

$jInnerData->$sUserId = $sNewPhoneNumber;

$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);

$_SESSION['sUserId'] = $sNewPhoneNumber;





sendResponse(1,__LINE__,'Phone number has been updated');
//******************************************************************************
function sendResponse($iStatus, $iLineNumber, $sMessage){
  echo '{"status":'.$iStatus.', "code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
