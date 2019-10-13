<?php
session_start();
$sUserId = $_SESSION['sUserId'];
if (!isset($sUserId)) {
  header('Location: ../login');
}

$sOldUserPassword = $_POST['txtOldPassword'] ?? '';
$sPassword = $_POST['txtNewPassword'] ?? '';
$sConfirmPassword = $_POST['txtConfirmNewPassword'] ?? '';


$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse( -1, __LINE__ , 'System under maintenance');
}
$jUser = $jData->data->$sUserId;


if (empty($sOldUserPassword)) {
  echo sendResponse(0, __LINE__, 'No old password has been entered');
}
if (strlen($sOldUserPassword) < 6) {
  echo sendResponse(0, __LINE__, 'Old password needs to be more than 6 digits');
}
if (strlen($sOldUserPassword) > 64) {
  echo sendResponse(0, __LINE__, 'Old password needs to be less than 64 digits');
}
if (!password_verify ($sOldUserPassword , $jUser->password ) ) {
  sendResponse( 0, __LINE__ , 'Incorrect old password.');
}



if (empty($sPassword)) {
  echo sendResponse(0, __LINE__, 'No new password has been entered');
}
if (strlen($sPassword) < 6) {
  echo sendResponse(0, __LINE__, 'New password needs to be more than 6 digits');
}
if (strlen($sPassword) > 64) {
  echo sendResponse(0, __LINE__, 'New password needs to be less than 64 digits');
}




if (empty($sConfirmPassword)) {
  echo sendResponse(0, __LINE__, 'No confirmed password entered');
}
if ($sPassword !== $sConfirmPassword) {
  echo sendResponse(0, __LINE__, 'passwords do not match');
}



$sHasedPassword = password_hash($sConfirmPassword, PASSWORD_DEFAULT);
$jUser->password = $sHasedPassword;


$sData = json_encode($jData);
file_put_contents('../data/clients.json', $sData);


sendResponse( 1, __LINE__ , 'Password changed');
//******************************************************************************************
function sendResponse($iStatus, $iLineNumber, $sMessage){
  echo '{"status":'.$iStatus.', "code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
