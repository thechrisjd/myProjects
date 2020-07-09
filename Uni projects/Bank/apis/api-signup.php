<?php
$sData = file_get_contents('../data/clients.json');
$jData = json_decode($sData);
// TODO: maintenance page
if ($jData == null) {
  sendResponse(-1,__LINE__,'Not valide json');
}
$jInnerData = $jData->data;

//Validating phone number
$sPhone = $_POST['txtSignupPhone'] ?? '';
if (empty($sPhone)) {
  sendResponse(0,__LINE__,'Phone number requires');
}
if( isset( $jInnerData->$sPhone ) ){
   sendResponse(0,__LINE__,'Phone number is already registered');
}
if (strlen($sPhone) != 8) {
  sendResponse(0,__LINE__,'Phone number needs to be 8 digits');
}
if (intval($sPhone) < 10000000) {
  sendResponse(0,__LINE__,'Not a valid number');
}

//Validating Email
$sEmail = $_POST['txtSignupEmail'] ?? '';
if (empty($sEmail)) {
  sendResponse(0,__LINE__,'Email required');
}
if (!filter_var($sEmail, FILTER_VALIDATE_EMAIL)) {
  sendResponse(0,__LINE__,'Not a valide email');
}

$sConfirmEmail = $_POST['txtSignupConfirmEmail'] ?? '';
if (empty($sConfirmEmail)) {
  sendResponse(0,__LINE__,'Email needs to be confirmed');
}
if ($sEmail != $sConfirmEmail) {
  sendResponse(0,__LINE__,'Emails do not match');
}

//Validating password
$sPassword = $_POST['txtSignupPassword'] ?? '';
if (empty($sPassword)) {
  sendResponse(0,__LINE__,'Password required');
}
if (strlen($sPassword) < 6) {
  sendResponse(0,__LINE__,'Password needs to be longer than 6 digits');
}
if (strlen($sPassword) > 64) {
  sendResponse(0,__LINE__,'Password needs to be less than 64 digits');
}


$sConfirmPassword = $_POST['txtSignupConfirmPassword'] ?? '';
if (empty($sConfirmPassword)) {
  sendResponse(0,__LINE__,'Please confirm password');
}
if ($sPassword != $sConfirmPassword) {
  sendResponse(0,__LINE__,'Passwords do not match');
}

//Validating cpr
$sCpr = $_POST['txtSignupCpr'] ?? '';

$regex = "/[0-9]{6}-[0-9]{4}/";
if (!preg_match($regex, $sCpr)) {
    sendResponse(0,__LINE__,'Not a valide cpr');
}

//Validating names
$sName = $_POST['txtSignupName'] ?? '';
if (empty($sName)) {
  sendResponse(0,__LINE__,'Name required');
}
if (strlen($sName) < 2) {
  sendResponse(0,__LINE__,'Name needs to be more than 2 characters');
}
if (strlen($sName) > 20) {
  sendResponse(0,__LINE__,'Name needs to be less than 20 characters');
}

$sLastName = $_POST['txtSignupLastName'] ?? '';
if (empty($sLastName)) {
  sendResponse(0,__LINE__,'Surname required');
}
if (strlen($sLastName) < 2) {
  sendResponse(0,__LINE__,'Surname needs to be more than 2 characters');
}
if (strlen($sLastName) > 20) {
  sendResponse(0,__LINE__,'Surname needs to be less than 20 characters');
}



$sActivationKey = uniqid().'-'.uniqid().'-'.uniqid();

$jClient = new stdClass();
$jClient->signupDate = time();
$jClient->name = $sName;
$jClient->lastName = $sLastName;
$jClient->cpr = $sCpr;
$jClient->email = $sEmail;
$jClient->password = password_hash($sPassword, PASSWORD_DEFAULT);
$jClient->balance = 0;
$jClient->status = 1;
$jClient->loginFailCount = 0;
$jClient->active = 0;
$jClient->activationKey = $sActivationKey;

$jClient->accounts = new stdClass();
$jAccount = new stdClass();
$jAccount->balance = 0;
$sAccountId = uniqid();
$jClient->accounts->$sAccountId = $jAccount;


$jClient->transactionNotRead = new stdClass();
$jClient->transactions = new stdClass();
$jInnerData->$sPhone = $jClient;


$sSubject = 'Thank you for registering to ' . 'Lions Arch';

$sMail_content = <<<EOF
Thank you $sName $sLastName, for signing up to Lions Arch.
Please click the link below to activate your account.
http://www.thechrisjd.com/lionsarch/apis/api-activate-account?phone=$sPhone&key=$sActivationKey
EOF;


if(!mail($sEmail,$sSubject, $sMail_content)){
  sendResponse(0,__LINE__,'Could not send email');
}



$sFinalData = json_encode($jData);
if ( $sFinalData == null) {
  sendResponse(0, __LINE__,'Site under maintenance');
}

file_put_contents('../data/clients.json', $sFinalData);


sendResponse(1,__LINE__,'You have successful signed up with Lions Arch, please check your emails to activate your account.');


//********************************ALL FUNCTIONS BELOW**********************************************
function sendResponse($iStatus,$iLineNumber,$sMessage){
  echo '{"status":'.$iStatus.',"code":'.$iLineNumber.',"message":"'.$sMessage.'"}';
  exit;
}
