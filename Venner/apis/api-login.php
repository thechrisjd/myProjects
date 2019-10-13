<?php

//validating emial
$sLoginEmail = $_POST['txtLoginEmail'];
if (empty($sLoginEmail)) {
  fnSendResponce(0,__LINE__,"Email address is required.");
}
if (strlen($sLoginEmail) > 90 || strlen($sLoginEmail) < 6) {
  fnSendResponce(0,__LINE__,"Invalide email.");
}
if (!filter_var($sLoginEmail, FILTER_VALIDATE_EMAIL)) {
    fnSendResponce(0,__LINE__,"Invalide email.");
}


//validate password
$sLoginPassword = $_POST['txtLoginPassword'];
if (empty($sLoginPassword)) {
  fnSendResponce(0,__LINE__,"Password required.");
}
if (strlen($sLoginPassword) < 8) {
  fnSendResponce(0,__LINE__,"Password needs to be a minimum of 8 characters!");
}
if(preg_match("/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/", $sLoginPassword) === 0){
  fnSendResponce(0,__LINE__,"Password needs to be more complex, Upper case, lower case and numbers");
}

//connecting to the database
require_once '../CRUD/connect.php';

try {
  $stmt = $db->prepare('SELECT `user_id`, `password`, `active` FROM `user_info` WHERE email = :sLoginEmail');
  $stmt->bindValue(':sLoginEmail', $sLoginEmail);
  $stmt->execute();
  $aUserinfo = $stmt->fetch();
  $sUsersPassword = $aUserinfo->password ?? '';
  $sUsersAccountStatus = $aUserinfo->active;
  $sUsersID = $aUserinfo->user_id;

  if (empty($sUsersPassword)) {
    fnSendResponce(0,__LINE__,"Invaldie email.");
  }
  if (!password_verify($sLoginPassword, $sUsersPassword)) {
    fnSendResponce(0,__LINE__,"Invaldie password.");
  }
  if ($sUsersAccountStatus == 0) {
    fnSendResponce(0,__LINE__,"Please activate account.");
  }

  session_start();
  $_SESSION['sUserId'] = $sUsersID;




} catch (PDOException $e) {
  header('Location: ../maintenance.html');
}

//**************************************Functions below***************************************\\

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":'.$iStatus.', "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}

fnSendResponce(1,__LINE__,"You have signed in.");
