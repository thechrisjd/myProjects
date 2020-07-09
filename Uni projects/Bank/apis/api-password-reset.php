<?php
$sPhone = $_GET['phone'] ?? '';
$sActivationKey = $_GET['key'] ?? '';

if (empty($sPhone) && empty($sActivationKey)) {
  sendResponse(0,__LINE__,'Invalded activation link');
}
$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
if ($jData == null) {
  sendResponse(-1,__LINE__,'Site under maintenance');
}
$jInnerData = $jData->data;

if (!isset($jInnerData->$sPhone)) {
  sendResponse(0,__LINE__,'Phone not registered');
}
if ($jInnerData->$sPhone->activationKey != $sActivationKey) {
  sendResponse(0,__LINE__,'Not a valid key');
}

$sEmail = $jInnerData->$sPhone->email;
$sPassword = '123456';
$jInnerData->$sPhone->password = password_hash($sPassword, PASSWORD_DEFAULT);


$sSubject = 'Password reset';

$sMail_content = <<<EOF
Hi $sName $sLastName, your Lions Arch password has been reset.
Your new password is: $sPassword
http://www.thechrisjd.com/lionsarch/index
EOF;


if(!mail($sEmail,$sSubject, $sMail_content)){
  sendResponse(0,__LINE__,'Could not send email');
}


$sFinalData = json_encode($jData);
if ($sFinalData == null ) {
  sendResponse(-1,__LINE__,'Site under maintenance');
}
file_put_contents('../data/clients.json', $sFinalData);


//sendResponse(0,__LINE__,'Account now activated');
header('Location: ../login');

//********************************ALL FUNCTIONS BELOW**********************************************
function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
