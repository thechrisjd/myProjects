<?php
session_start();
$sUserId = $_SESSION['sUserId'];
if (!isset($sUserId)) {
  header('Location: ../login');
}

$sAccountType = $_POST['txtAccounttype'] ?? '';
$sAccountBalance = $_POST['txtAccountBalance'] ?? '';
$sPassword = $_POST['txtPassword'] ?? '';

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse(-1,__LINE__,'System under maintenance');
}
$jInnerData = $jData->data;

if (empty($sPassword)) {
  sendResponse(0,__LINE__,'Password required');
}
if(!password_verify ($sPassword , $jInnerData->$sUserId->password)){
  sendResponse(0,__LINE__,'Incorrect password');
}

if (empty($sAccountType)) {
  sendResponse(0,__LINE__,'Account type required');
}
if (empty($sAccountBalance)) {
  sendResponse(0,__LINE__,'Account type required');
}
if( !ctype_digit($sAccountBalance)  ){
  sendResponse(-1, __LINE__, 'Balance can only contain number');
}



$jAccount = new stdClass();
$jAccount->accountType = $sAccountType;
$jAccount->balance = $sAccountBalance;
$sAccountId = uniqid();
$jInnerData->$sUserId->accounts->$sAccountId = $jAccount;

$sFinalData = json_encode($jData);
if ( $sFinalData == null) {
  sendResponse(0, __LINE__,'Site under maintenance');
}

file_put_contents('../data/clients.json', $sFinalData);

sendResponse(1,__LINE__,'Your new account has been made');














function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
