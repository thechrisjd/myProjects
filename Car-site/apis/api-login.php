<?php
/////////////////////////////////////////////////////////////////////////////////////////


$sLoginEmail = $_POST['txtLoginEmail'] ?? '';
if (empty($sLoginEmail)) {
  fnSendResponce(0,__LINE__,"Email address is required.");
}
if (strlen($sLoginEmail) > 90 || strlen($sLoginEmail) < 6) {
  fnSendResponce(0,__LINE__,"Invalide email.");
}
if (!filter_var($sLoginEmail, FILTER_VALIDATE_EMAIL)) {
    fnSendResponce(0,__LINE__,"Invalide email.");
}


/////////////////////////////////////////////////////////////////////////////////////////


$sLoginPassword = $_POST['txtLoginPassword'] ?? '';
if (empty($sLoginPassword)) {
  fnSendResponce(0,__LINE__,"Password required.");
}
if (strlen($sLoginPassword) < 8) {
  fnSendResponce(0,__LINE__,"Password needs to be a minimum of 8 characters!");
}
if(preg_match("/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/", $sLoginPassword) === 0){
  fnSendResponce(0,__LINE__,"Password needs to be more complex, Upper case, lower case and numbers");
}


/////////////////////////////////////////////////////////////////////////////////////////


try {
  require_once '../CRUD/connect.php';
  $stmt = $db->prepare('SELECT `id`, `password`, `status` FROM `user_info` WHERE `email` = :sLoginEmail');
  $stmt->bindValue(':sLoginEmail', "$sLoginEmail");
  if (!$stmt->execute()) {
    fnSendResponce(0,__LINE__, "could not execute.");
  }
  $aUserinfo = $stmt->fetch();
  $sUsersPassword = $aUserinfo->password ?? '';
  $sUsersAccountStatus = $aUserinfo->status;
  $sUsersID = $aUserinfo->id;

  if (empty($sUsersPassword)) {
    fnSendResponce(0,__LINE__,"Invaldie email.");
  }
  /*if (!password_verify($sLoginPassword, $sUsersPassword)) {
    fnSendResponce(0,__LINE__,"Invaldie password.");
  }*/
  if ($sLoginPassword != $sUsersPassword) {
    fnSendResponce(0,__LINE__,"Invaldie password.");
  }
  if ($sUsersAccountStatus == 0) {
    fnSendResponce(0,__LINE__,"Please activate account.");
  }

  session_start();
  $_SESSION['sUserId'] = $sUsersID;
} catch (PDOException $e) {
  echo $e;
}












//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}

fnSendResponce(1,__LINE__,"You have signed in.");
