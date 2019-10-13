<?php

//First thing I will do this to check for the email and validate it.

$sSignupEmail = $_POST['txtSignupEmail'];
if (empty($sSignupEmail)) {
  fnSendResponce(0,__LINE__,"Email address is required.");
}
if (strlen($sSignupEmail) > 90 || strlen($sSignupEmail) < 6) {
  fnSendResponce(0,__LINE__,"Invalide email.");
}
if (!filter_var($sSignupEmail, FILTER_VALIDATE_EMAIL)) {
    fnSendResponce(0,__LINE__,"Invalide email.");
}

//confirming that emails match
$sConfirmSignupEmail = $_POST['txtSignupConfirmEmail'];
if (empty($sConfirmSignupEmail)) {
  fnSendResponce(0,__LINE__,"Need to confirm email address.");
}
if ($sSignupEmail !== $sConfirmSignupEmail) {
  fnSendResponce(0,__LINE__,"Emails do not match.");
}

//validate password
$sSignupPassword = $_POST['txtSignupPassword'];
if (empty($sSignupPassword)) {
  fnSendResponce(0,__LINE__,"Password required.");
}
if (strlen($sSignupPassword) < 8) {
  fnSendResponce(0,__LINE__,"Password needs to be a minimum of 8 characters!");
}
if(preg_match("/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/", $sSignupPassword) === 0){
  fnSendResponce(0,__LINE__,"Password needs to be more complex, Upper case, lower case and numbers");
}

//validate confirmed password
$sConfirmSignupPassword = $_POST['txtSignupConfirmPassword'];
if (empty($sConfirmSignupPassword)) {
  fnSendResponce(0,__LINE__,"Please confirm your password.");
}
if ($sSignupPassword !== $sConfirmSignupPassword) {
  fnSendResponce(0,__LINE__,"Passwords do not match.");
}

//Now password has passed validation we hash it for later.
$sHasedSignupPassword = password_hash($sSignupPassword, PASSWORD_DEFAULT);

//First and last name validation
$sSignupFirstName = $_POST['txtSignupFirstName'];

if (empty($sSignupFirstName)) {
  fnSendResponce(0,__LINE__,"Name required.");
}
if (strlen($sSignupFirstName) < 2) {
  fnSendResponce(0,__LINE__,"Name needs to be a minium of two characters.");
}
if (strlen($sSignupFirstName) > 50) {
  fnSendResponce(0,__LINE__,"Name needs to be less than fifty characters.");
}

$sChars_to_remove = array('?','!','/','\\','<','>','{','}','[',']','=','+','#','$','*','@','&','(',')');
if ($sSignupFirstName !== str_replace($sChars_to_remove, '', $sSignupFirstName)) {
  fnSendResponce(0,__LINE__,"Invaled specical characters in first name.");
}


$sSignupLastName = $_POST['txtSignupLastName'];

if (empty($sSignupLastName)) {
  fnSendResponce(0,__LINE__,"Surname required.");
}
if (strlen($sSignupLastName) < 2) {
  fnSendResponce(0,__LINE__,"Surname needs to be a minium of two characters.");
}
if (strlen($sSignupLastName) > 50) {
  fnSendResponce(0,__LINE__,"Surname needs to be less than fifty characters.");
}

$sChars_to_remove = array('?','!','/','\\','<','>','{','}','[',']','=','+','#','$','*','@','&','(',')');
if ($sSignupLastName !== str_replace($sChars_to_remove, '', $sSignupLastName)) {
  fnSendResponce(0,__LINE__,"Invaled specical characters in surname.");
}

// TODO: signup phone validation
$sActivationKey = uniqid().'-'.uniqid().'-'.uniqid();
$sUserID = uniqid();
require_once '../CRUD/connect.php';

/*$sSignupFirstName
$sSignupLastName
$sSignupEmail
$sHasedSignupPassword */

//key used to activate account
$sActivationKey = uniqid().'-'.uniqid().'-'.uniqid();
$sUserID = hexdec(uniqid()) + rand(0,99999999999);
$sBannerImagePath = 'banner-image.jpg';
$sProfileimagePath = 'profile-image.png';
try {
  /*INSERT INTO `user_info`(`user_id`, `email`, `name`, `last_name`, `phone`, `password`, `activation_key`, `active`) VALUES ('2498928492', 'a@a.com', 'a', 'aa', null, 'wiijifsij', '48058938833', '0')*/
  $stmt = $db->prepare('INSERT INTO `user_info`(`user_id`, `email`, `name`, `last_name`, `phone`, `password`, `activation_key`, `active`, `profile_image`, `banner_image`)
  VALUES (:sUserID, :sSignupEmail, :sSignupFirstName, :sSignupLastName, null, :sHasedSignupPassword, :sActivationKey, "0", :sProfileimagePath, :sBannerImagePath)');
  $stmt->bindValue(':sUserID', "$sUserID");
  $stmt->bindValue(':sSignupEmail', "$sSignupEmail");
  $stmt->bindValue(':sSignupFirstName', "$sSignupFirstName");
  $stmt->bindValue(':sSignupLastName', "$sSignupLastName");
  $stmt->bindValue(':sHasedSignupPassword', "$sHasedSignupPassword");
  $stmt->bindValue(':sActivationKey', "$sActivationKey");
  $stmt->bindValue(':sProfileimagePath', "$sProfileimagePath");
  $stmt->bindValue(':sBannerImagePath', "$sBannerImagePath");
  if (!$stmt->execute()) {
    fnSendResponce(0,__LINE__, "Email is already signed up.");
  }

} catch (PDOException $e) {
  echo $e;
}



$sSubject = 'Thank you for registering to ' . 'Venner.';

$sMail_content = <<<EOF
Thank you $sSignupFirstName $sSignupLastName, for signing up to Venner.
Please click the link below to activate your account.
http://www.thechrisjd.com/lionsarch/index?key=$sActivationKey
EOF;


if(!mail($sEmail,$sSubject, $sMail_content)){
  sendResponse(0,__LINE__,'Could not send email');
}










//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}

fnSendResponce(1,__LINE__,"You have signup! Please active your account.");
