<?php
session_start();
$sUserID = $_SESSION['sUserId'] ?? '';
$sFriendID = $_GET['ref'] ?? '';
if (empty($sUserID) || empty($sFriendID)) {
  header('Location: ../login');
}

// TODO: make a something went wrong page

try {
  require_once '../CRUD/connect.php';
  $stmt = $db->prepare('UPDATE `user_relationships` SET `status`= "f" WHERE `user_fk_a`= :sFriendID AND `user_fk_b` = :sUserID ');
  $stmt->bindValue(':sFriendID', $sFriendID);
  $stmt->bindValue(':sUserID', $sUserID);
  if (!$stmt->execute()) {
    header('Location: ../maintenance.html');
  }
} catch (\Exception $e) {
  header('Location: ../maintenance.html');
}

try {
  require_once '../CRUD/connect.php';
  $stmt = $db->prepare('INSERT INTO `user_relationships`(`relationship_id`, `user_fk_a`, `user_fk_b`, `status`)
  VALUES (null, :sUserID, :sFriendID,"f")');
  $stmt->bindValue(':sUserID', $sUserID);
  $stmt->bindValue(':sFriendID', $sFriendID);
  if (!$stmt->execute()) {
    header('Location: ../maintenance.html');
  }
  header('Location: ../requests.php');
} catch (\Exception $e) {
  header('Location: ../maintenance.html');
}
