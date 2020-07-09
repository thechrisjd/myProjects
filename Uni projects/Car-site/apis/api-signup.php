<?php
//////////////////////////////////////////////////////////////////////////////////////////


$sCompanyName = $_POST['txtCompanyName'];
if (empty($sCompanyName)) {
  fnSendResponce(0,__LINE__,"Company name required.");
}
if (strlen($sCompanyName) < 2) {
  fnSendResponce(0,__LINE__,"Company name to be a minium of two characters.");
}
if (strlen($sCompanyName) > 50) {
  fnSendResponce(0,__LINE__,"Company name to be less than fifty characters.");
}


//////////////////////////////////////////////////////////////////////////////////////////


$sPosition = $_POST['txtPosition'];
if (empty($sPosition)) {
  fnSendResponce(0,__LINE__,"Position required.");
}
if (strlen($sPosition) < 2) {
  fnSendResponce(0,__LINE__,"Position name needs to be a minium of two characters.");
}
if (strlen($sPosition) > 50) {
  fnSendResponce(0,__LINE__,"Position name needs to be less than fifty characters.");
}




//////////////////////////////////////////////////////////////////////////////////////////


$sSignupEmail = $_POST['txtEmail'];
if (empty($sSignupEmail)) {
  fnSendResponce(0,__LINE__,"Email address is required.");
}
if (strlen($sSignupEmail) > 90 || strlen($sSignupEmail) < 6) {
  fnSendResponce(0,__LINE__,"Invalide email.");
}
if (!filter_var($sSignupEmail, FILTER_VALIDATE_EMAIL)) {
    fnSendResponce(0,__LINE__,"Invalide email.");
}


//////////////////////////////////////////////////////////////////////////////////////////


$sSignupPassword = $_POST['txtPassword'];
if (empty($sSignupPassword)) {
  fnSendResponce(0,__LINE__,"Password required.");
}
if (strlen($sSignupPassword) < 8) {
  fnSendResponce(0,__LINE__,"Password needs to be a minimum of 8 characters!");
}
if(preg_match("/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/", $sSignupPassword) === 0){
  fnSendResponce(0,__LINE__,"Password needs to be more complex, Upper case, lower case and numbers");
}

//////////////////////////////////////////////////////////////////////////////////////////


$sConfirmSignupPassword = $_POST['txtConfirmPassword'];
if (empty($sConfirmSignupPassword)) {
  fnSendResponce(0,__LINE__,"Please confirm your password.");
}
if ($sSignupPassword !== $sConfirmSignupPassword) {
  fnSendResponce(0,__LINE__,"Passwords do not match.");
}

//////////////////////////////////////////////////////////////////////////////////////////


$sHasedSignupPassword = password_hash($sSignupPassword, PASSWORD_DEFAULT);


//////////////////////////////////////////////////////////////////////////////////////////


$sActivationKey = uniqid().'-'.uniqid().'-'.uniqid();

try {

  require_once '../CRUD/connect.php';
  $stmt = $db->prepare('INSERT INTO `user_info`(`id`, `email`, `company_name`, `position`, `password`, `activation_key`, `status`)
  VALUES (null, :sEmail, :sCompanyName, :sPosition, :sHashedPassword, :sActivationKey, "0")');
  $stmt->bindValue(':sEmail', "$sSignupEmail");
  $stmt->bindValue(':sCompanyName', "$sCompanyName");
  $stmt->bindValue(':sPosition', "$sPosition");
  $stmt->bindValue(':sHashedPassword', "$sHasedSignupPassword");
    $stmt->bindValue(':sActivationKey', "$sActivationKey");
  if (!$stmt->execute()) {
    fnSendResponce(0,__LINE__, "Email is already signed up.");
  }

} catch (PDOException $e) {
  echo $e;
}






//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}

fnSendResponce(1,__LINE__,"You have signup! Please active your account.");
