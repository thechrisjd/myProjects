<?php
session_start();
$sUserID = $_SESSION['sUserId'];
$sSendingMessageTo = $_GET['ref'];
if (empty($sUserID) || empty($sSendingMessageTo)) {
  header('Location: ../login');
}
$sMessage = $_POST['txtMessageForFriend'] ?? '';

if (!empty($sMessage)) {
  // code...
  try {
    require_once '../CRUD/connect.php';
    $stmt = $db->prepare(' INSERT INTO `messages`(`convosation_id`, `user_id_a`, `user_id_b`, `message`, `time`)
    VALUES (null, :sUserID, :sSendingMessageTo, :sMessage, :sTimeStamp) ');
    $stmt->bindValue(':sUserID', $sUserID);
    $stmt->bindValue(':sSendingMessageTo', $sSendingMessageTo);
    $stmt->bindValue(':sMessage', "$sMessage");
    $stmt->bindValue(':sTimeStamp', "333");
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
  } catch (\Exception $e) {
    header('Location: ../maintenance.html');
  }
}
