<?php

$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);

if ($jData == null) {
  sendResponse(-1,__LINE__,'Not valide json');
}
$jInnerData = $jData->data;

$sPhone = $_POST['txtPhoneForPasswordRest'] ?? '';

if (empty($sPhone)) {
  sendResponse(0,__LINE__,'Phone number required');
}
if( !isset( $jInnerData->$sPhone ) ){
   sendResponse(0,__LINE__,'Phone number is not registered');
}


//Validating Email
$sEmail = $_POST['txtEmailForPasswordRest'] ?? '';
if (empty($sEmail)) {
  sendResponse(0,__LINE__,'Email required');
}
if ( $jInnerData->$sPhone->email != $sEmail) {
  sendResponse(0,__LINE__,'emails do not match');
}

$sActivationKey = uniqid().'-'.uniqid().'-'.uniqid();
$jInnerData->$sPhone->activationKey = $sActivationKey;


$sSubject = 'Reset your Lions Arch password';

$sMail_content = <<<EOF
Hi $sName $sLastName, sorry to hear that you forgot your Lions Arch password.
But don't worry just click the link below to reset your password.
http://www.thechrisjd.com/lionsarch/apis/api-password-reset.php?phone=$sPhone&key=$sActivationKey
EOF;


if(!mail($sEmail,$sSubject, $sMail_content)){
  sendResponse(0,__LINE__,'Could not send email');
}


$sFinalData = json_encode($jData);
if ( $sFinalData == null) {
  sendResponse(0, __LINE__,'Site under maintenance');
}

file_put_contents('../data/clients.json', $sFinalData);

sendResponse(1,__LINE__,'An email has been sent to reset your password');



function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
