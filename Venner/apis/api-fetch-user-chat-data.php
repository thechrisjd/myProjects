<?php
session_start();
$sUserID = $_SESSION['sUserId'];
$sFirendId = $_GET['firendId'];
if (!isset($sUserID) || !isset($sFirendId)) {
  header('Location: ../login');
}




require_once '../CRUD/connect.php';

$stmt = $db->prepare('UPDATE `chat` SET `status`= "0" WHERE `receiving_user_id` = :sUserID AND
  `sending_user_id`= :sFriendID AND `status`= "1"');
$stmt->bindValue(':sUserID', $sUserID);
$stmt->bindValue(':sFriendID', $sFirendId);
if (!$stmt->execute()) {
  header('Location: ../maintenance.html');
}


$stmt = $db->prepare('SELECT * FROM `chat` WHERE `sending_user_id` = :sUserID AND`receiving_user_id` = :sFriendID
OR `sending_user_id` = :sFriendID AND`receiving_user_id` = :sUserID ORDER BY `chat_id` DESC');
$stmt->bindValue(':sUserID', $sUserID);
$stmt->bindValue(':sFriendID', $sFirendId);
if (!$stmt->execute()) {
  header('Location: ../maintenance.html');
}
$aRows = $stmt->fetchAll();

foreach ($aRows as $jRow) {
  if ($jRow->sending_user_id  == $sUserID) {
    $sTimeStamp = $jRow->time_stamp;
    $sDateTime = date('m/d/Y H:i:s', $sTimeStamp);
    $sContent = <<<EOF
    <div class = "yourMessages">
      <div class = 'message'><p>$jRow->chat_message</p></div>
      <div class = 'time'><p>$sDateTime</p></div>
    </div>
EOF;
    echo $sContent;
  }else {
    $stmt = $db->prepare('SELECT `name`, `last_name`, `profile_image` FROM `user_info` WHERE `user_id`= :sFriendid ');
    $stmt->bindValue(':sFriendid', $sFirendId);
    if (!$stmt->execute()) {
      header('Location: ../maintenance.html');
    }
    $aRows = $stmt->fetchAll();
    $sFriendName = $aRows[0]->name;
    $sLastName = $aRows[0]->last_name;
    $sTimeStamp = $jRow->time_stamp;
    $sDateTime = date('m/d/Y H:i:s', $sTimeStamp);
    $sProfilePic = $aRows[0]->profile_image;
    $sContent = <<<EOF
    <div class = "friendMessages">
      <img class= "profilePic" src="./uploads/$sProfilePic">
      <div class = 'message'>$jRow->chat_message</div>
      <div class = 'time'>$sDateTime</div>
    </div>
EOF;
    echo $sContent;
  }

}
