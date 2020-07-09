<?php
session_start();
if (!isset($_SESSION['sUserId'])) {
  header('Location: ../login');
}
include "../CRUD/connect.php";

$sLoggedInUserID = $_POST['loggedInUserID'];
$sOtherUserID = $_POST['otherUserID'];

try {
  $stmt = $db->prepare('SELECT status FROM `user_relationships` WHERE `user_fk_a`= :sUserid AND `user_fk_b`= :skey');
  $stmt->bindValue(':sUserid', "$sLoggedInUserID");
  $stmt->bindValue(':skey', "$sOtherUserID");
  if (!$stmt->execute()) {
    fnSendResponce(0,__LINE__, "Could not execute.");
  }
  $aRows = $stmt->fetchAll();

  if (empty($aRows)) {
    $stmt = $db->prepare('INSERT INTO `user_relationships`(`user_fk_a`, `user_fk_b`, `status`) VALUES (:sUserid, :skey, "p")');
    $stmt->bindValue(':sUserid', "$sLoggedInUserID");
    $stmt->bindValue(':skey', "$sOtherUserID");
    if (!$stmt->execute()) {
      fnSendResponce("request sent",__LINE__, "Could not send request.");
    }
    fnSendResponce("request sent",__LINE__, "Friend request sent.");
  }
  if ($aRows[0]->status == 'p' or $aRows[0]->status == 'f') {
    $stmt = $db->prepare('DELETE FROM `user_relationships` WHERE `user_fk_a` = :sUserid AND `user_fk_b`= :skey OR `user_fk_a` = :skey AND `user_fk_b`= :sUserid');
    $stmt->bindValue(':sUserid', "$sLoggedInUserID");
    $stmt->bindValue(':skey', "$sOtherUserID");
    if (!$stmt->execute()) {
      fnSendResponce("add friend",__LINE__, "Could not unfriend.");
    }
    fnSendResponce("add friend",__LINE__, "Unfriended.");
  }

} catch (\Exception $e) {
  header('Location: ../maintenance.html');
}

function fnSendResponce($iStatus, $iCode, $sMessage)
{
  echo '{"status":"'.$iStatus.'", "code":'.$iCode.', "message":"'.$sMessage.'"}';
  exit;
}
