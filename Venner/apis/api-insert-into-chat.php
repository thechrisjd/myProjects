<?php
session_start();
$sUserID = $_SESSION['sUserId'];
$PostingToUser = $_GET['postingToId'];
if (!isset($sUserID) || !isset($PostingToUser)) {
  header('Location: ../login');
}
$ChatMessage = $_POST['txtChatMessage'] ?? '';
$timeStamp = time();
require_once '../CRUD/connect.php';

if (!empty($ChatMessage)) {
  try {
    $stmt = $db->prepare('INSERT INTO `chat`(`chat_id`, `receiving_user_id`, `sending_user_id`, `chat_message`, `time_stamp`, `status`)
    VALUES (null, :toUserId, :fromUserId, :message, :stimeStamp, "1")');
    $stmt->bindValue(':toUserId', $PostingToUser);
    $stmt->bindValue(':fromUserId', $sUserID);
    $stmt->bindValue(':message', $ChatMessage);
    $stmt->bindValue(':stimeStamp', $timeStamp );
    if(!$stmt->execute()){
      header('Location: ../maintenance.html');
    }
    echo "ok";
  } catch (PDOException $e) {
    header('Location: ../maintenance.html');
  }

}
