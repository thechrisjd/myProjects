<?php
session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: login');
}

$sUserId = $_SESSION['sUserId'];
$iAmount = $_POST['txtLoanAmount'] ?? '';
$sPassword = $_POST['txtPassword'] ?? '';


if( !ctype_digit($iAmount)  ){
  sendResponse(-1, __LINE__, 'Amount can only contain numbers');
}

if (empty($sPassword)) {
  sendResponse(0,__LINE__,'Password required');
}
if (strlen($sPassword) < 6) {
  sendResponse(0,__LINE__,'Password needs to be longer than 6 digits');
}
if (strlen($sPassword) > 64) {
  sendResponse(0,__LINE__,'Password needs to be less than 64 digits');
}

$sData = file_get_contents('../data/clients.json');
$jData = json_decode( $sData );

if( $jData == null){
  sendResponse(-1, __LINE__, 'Cannot convert data to JSON');
}

$jClient = $jData->data->$sUserId;

if(!password_verify ($sPassword , $jClient->password)){
  sendResponse(0, __LINE__, 'Incorrect password');
}

$jClient->pendingLoans += $iAmount;
$sFinalData = json_encode($jData);
file_put_contents('../data/clients.json', $sFinalData);
sendResponse( 1, __LINE__ , 'Loan applied for. Please wait for approval.'  );
















function sendResponse($iStatus, $iLineNumber, $sMessage){
  echo '{"status":'.$iStatus.', "code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
